import puppeteer from "puppeteer";

describe("Steam UI Tests Ukrainian language", () => {
    let browser;
    let page;
    
    beforeAll(async () => {
        browser = await puppeteer.launch({
        headless: false,
        slowMo: 50,
        });
        page = await browser.newPage();
        await page.goto("https://store.steampowered.com/");
    });
    
    afterAll(async () => {
        await browser.close();
    });
    
    test("should load the Steam homepage", async () => {
        const title = await page.title();
        expect(title).toBe("Вітаємо у Steam");
    });
    
    test("should search for a game", async () => {
        const searchInput = await page.$("#store_nav_search_term");
        await searchInput.press("Enter");
    
        await page.waitForNavigation();

        const resultsTitle = await page.title();
        expect(resultsTitle).toContain("Пошук Steam");
    });

    test("should open login page", async () => {

        await page.click("#responsive_menu_logo");
        await page.click(".mainmenu_contents_items .menuitem");

        const loginTitle = await page.title();
        expect(loginTitle).toContain("Увійти");
    });


    test("should open home page", async () => {
        await page.click(".responsive_header_logo");
        await page.waitForNavigation();

        const homeTitle = await page.title();
        expect(homeTitle).toContain("Вітаємо у Steam");
    });

    test("should display user reviews", async () => {
        await page.goto("https://store.steampowered.com/app/70/Half_Life/");
        await page.waitForSelector(".user_reviews_summary_row");
        const reviewText = await page.$eval(".user_reviews_summary_row", (el) => el.innerText);
        expect(reviewText.length).toBeGreaterThan(0);
    });

});
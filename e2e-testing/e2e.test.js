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
    


    test("should search for a game and check if it appears in results", async () => {
        const gameName = "Half-Life";
    
        const searchInput = await page.waitForSelector("#store_nav_search_term");
        await searchInput.type(gameName);
        await searchInput.press("Enter");
    
        await page.waitForNavigation();
    
        await page.waitForSelector(".search_result_row");

        const gameExists = await page.evaluate((gameName) => {
            const items = Array.from(document.querySelectorAll(".search_result_row"));
            return items.some((item) => item.innerText.includes(gameName));
        }, gameName);
    
        expect(gameExists).toBe(true);
    });
    
    test("should add a game to the cart", async () => {
        const gameName = "Half-Life";
    
        const searchInput = await page.waitForSelector("#store_nav_search_term");
        await searchInput.type(gameName);
        await searchInput.press("Enter");
    
        await page.waitForNavigation();
        await page.waitForSelector(".search_result_row");

        const firstGame = await page.$(".search_result_row");
        await firstGame.click();
    
        await page.waitForNavigation();
        await page.waitForSelector(".btn_addtocart");

        await page.click(".btn_addtocart");

        await page.waitForSelector(".DialogButton._DialogLayout.Primary.Focusable");    
        await page.click(".DialogButton._DialogLayout.Primary.Focusable")
        await page.waitForNavigation();
    

        const cartContent = await page.$eval(".Panel.Focusable", (el) => el.innerText);
        expect(cartContent).toContain(gameName);
    },15000);

    test("sould change language to English", async () => {
        await page.goto("https://store.steampowered.com/");
        
        await page.click("#responsive_menu_logo");
        
        const languageSelector = await page.waitForSelector(".menuitem.change_language_action");
        await languageSelector.click();

        
        const englishOption = await page.waitForSelector(".responsive_change_language_select");
        await englishOption.select("english");
    
        await page.waitForNavigation();

        const title = await page.title();
        expect(title).toBe("Welcome to Steam");
    },15000);



});
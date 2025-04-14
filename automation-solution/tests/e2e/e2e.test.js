import puppeteer from "puppeteer";
import { goToHomePage } from "../../helper/helper";


describe("Steam UI Tests Ukrainian language", () => {
    let browser;
    let page;
    
    beforeAll(async () => {
        browser = await puppeteer.launch({
        headless: false,
        slowMo: 50,
        });
        page = await browser.newPage();
        await goToHomePage(page);
    });
    
    afterAll(async () => {
        await browser.close();
    });
    


    test("should search for a game and check if it appears in results", async () => {
        const gameName = "S.T.A.L.K.E.R. 2: Heart of Chornobyl";
    
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
    }, 15000);
    
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


    test("should navigate to the Steam Support page", async () => {
        await page.click("#responsive_menu_logo");
   
        const supportSelection = await page.waitForSelector("a.menuitem[href*='help.steampowered.com']");
        await supportSelection.click();

        await page.waitForNavigation();

        const title = await page.title();
        expect(title).toContain("Служба підтримки Steam");
    }, 10000);



    test("should navigate to the About page and verify the Install Steam button", async () => {
        await page.click("#responsive_menu_logo");
    

        const aboutSelection = await page.waitForSelector("a.menuitem[href*='store.steampowered.com/about/']");
        await aboutSelection.click();
    
        await page.waitForNavigation();
        
     
        const title = await page.title();
        expect(title).toContain("Steam — найкраща мережева ігрова платформа");
    

        const installButtonSelector = "a.about_install_steam_link";
        await page.waitForSelector(installButtonSelector);
        
        const buttonExists = await page.$(installButtonSelector) !== null;
        expect(buttonExists).toBe(true);
    

        const installLink = await page.$eval(installButtonSelector, (el) => el.href);
        expect(installLink).toBe("https://cdn.fastly.steamstatic.com/client/installer/SteamSetup.exe");
    }, 10000);
    

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
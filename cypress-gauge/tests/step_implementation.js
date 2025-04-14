const { openBrowser, goto, write, press, click, text, into, near, title, button, closeBrowser, $, currentURL, textBox, waitFor ,scrollDown } = require('taiko');
const assert = require('assert');

beforeSuite(async () => await openBrowser({ headless: false }));
afterSuite(async () => await closeBrowser());

step("Navigate to <url>", async function (url) {
    await goto(url);
});

step("Title should contain <text>", async function (textToCheck) {
    const pageTitle = await title();
    assert.ok(pageTitle.includes(textToCheck));
});

step("Write <text> into the field near <fieldId>", async function (textToWrite, fieldId) {
    await write(textToWrite, into(textBox({ id: fieldId })));

});

step("Press Enter", async function () {
    await press("Enter");
});

step("There should be some results", async function () {
    assert.ok(await $(".search_result_row").exists());
});

step("Click the first result", async function () {
        await click($(".search_result_row"), { waitForNavigation: false });
});

step("Scroll down", async function () {
    await scrollDown(500);
    await waitFor(1000);
});

step('Check if button exists (optional, depends on availability)', async function () {
    try {
        waitFor(1000);
        await scrollDown(300);
        assert.ok(await $(".btn_addtocart").exists());
    } catch (e) {
        console.log(`❗ Button not found (may not be available for this game).`);
    }
});
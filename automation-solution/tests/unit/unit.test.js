const {
    isValidSteamURL,
    formatPrice,
    parseReviewScore,
    isEnglishInLanguages,
    getAppIdFromUrl
  } = require("../../utils/utils.js");
  
  describe("Steam Utility Functions", () => {
    test("valid Steam URL", () => {
      expect(isValidSteamURL("https://store.steampowered.com/app/220/HalfLife/")).toBe(true);
    });
  
    test("invalid Steam URL", () => {
      expect(isValidSteamURL("https://example.com")).toBe(false);
    });
  
    test("formats price correctly", () => {
      expect(formatPrice(9.5)).toBe("$9.50");
    });
  
    test("parses review percentage", () => {
      expect(parseReviewScore("Very Positive (90%)")).toBe(90);
    });
  
    test("extracts App ID from URL", () => {
      expect(getAppIdFromUrl("https://store.steampowered.com/app/220/HalfLife/")).toBe("220");
    });
  
    test("detects English language", () => {
      expect(isEnglishInLanguages("English, Ukrainian")).toBe(true);
    });
  });
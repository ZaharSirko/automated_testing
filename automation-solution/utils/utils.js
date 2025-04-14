function isValidSteamURL(url) {
    return /^https:\/\/store\.steampowered\.com\/app\/\d+/.test(url);
  }
  
  function formatPrice(price) {
    return `$${price.toFixed(2)}`;
  }
  
  function parseReviewScore(text) {
    const match = text.match(/(\d+)%/);
    return match ? parseInt(match[1], 10) : null;
  }
  
  function isEnglishInLanguages(languagesString) {
    return languagesString.includes("English");
  }
  
  function getAppIdFromUrl(url) {
    const match = url.match(/\/app\/(\d+)/);
    return match ? match[1] : null;
  }
  
  module.exports = {
    isValidSteamURL,
    formatPrice,
    parseReviewScore,
    isEnglishInLanguages,
    getAppIdFromUrl
  };
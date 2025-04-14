
import axios from "axios";

describe("Steam Game API Tests", () => {
  const appId = 220;
  const apiUrl = `https://store.steampowered.com/api/appdetails?appids=${appId}`;

  test("API should return 200", async () => {
    const res = await axios.get(apiUrl);
    expect(res.status).toBe(200);
  });

  test("API should contain game data", async () => {
    const res = await axios.get(apiUrl);
    expect(res.data[appId].success).toBe(true);
  });

  test("Game title should be correct", async () => {
    const res = await axios.get(apiUrl);
    expect(res.data[appId].data.name).toBe("Half-Life 2");
  });

  test("Game should have release_date field", async () => {
    const res = await axios.get(apiUrl);
    expect(res.data[appId].data.release_date).toBeDefined();
  });

  test("Game should support English", async () => {
    const res = await axios.get(apiUrl);
    const languages = res.data[appId].data.supported_languages;
    expect(languages).toContain("English");
  });
});
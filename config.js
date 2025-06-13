// Tự động detect URL hiện tại
function getCurrentURL() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  // Fallback URLs cho các trường hợp phổ biến
  return "http://127.0.0.1:5500";
}

// Spotify API Configuration
const SPOTIFY_CONFIG = {
  // Client ID từ Spotify Developer Dashboard
  CLIENT_ID: "9e67530ec40745f8809d258507d3a3a9",
  // Client Secret - CHÚ Ý: Trong production không nên để Client Secret ở frontend
  // Đây chỉ là demo, trong thực tế nên sử dụng backend để xử lý
  CLIENT_SECRET: "dc2b795c0d494986a9d82d2bb04e38c2",

  // Redirect URI - Tự động detect URL hiện tại
  get REDIRECT_URI() {
    return getCurrentURL();
  },


};

// console.log(`
// 🎵 SPORTIFY WEB PLAYER
// 📝 Cấu hình:
// - Client ID: ${SPOTIFY_CONFIG.CLIENT_ID ? "✅" : "❌"}
// - Client Secret: ${SPOTIFY_CONFIG.CLIENT_SECRET ? "✅" : "❌"}
// - Redirect URI: ${SPOTIFY_CONFIG.REDIRECT_URI}
// `);
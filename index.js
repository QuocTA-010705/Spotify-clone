let token;
document.addEventListener("DOMContentLoaded", function () {
  initialApp();
  setupSearchListener();
});

 function setupSearchListener() {
  const inputSearch = document.getElementById("input-search");
  inputSearch.addEventListener("input", async(event) =>{
    // console.log(event.target.value);
    const query = event.target.value.trim();
    if(query){
      const response = await getPopularTrack(query);
      console.log(response);
      resetTrack();
      displayTrack(response.tracks.items);
    }
    
  });

}
function resetTrack(){
  const trackSection = document.getElementById("track-section");
  trackSection.innerHTML = "";
}
async function initialApp() {
  token = await getSpotifyToken();
  if (token) {
    const response = await getPopularTrack();
    displayTrack(response.tracks.items);
  }
}

async function displayTrack(data) {
  // console.log(data);
  data.forEach((item) => {
    // console.log(item);
    const imageURL = item.album.images[0].url;
    const name = item.name;
    const artistsName = item.artists.map((artist) => artist.name).join(", ");
    // console.log(artistsName);
    //Tạo ra thẻ div
    const element = document.createElement("div");

    // Gắn class cho thẻ div đó
    element.className = "track-card";

    // Gắn nội dung
    element.innerHTML = `
    <div class="track-card-container">
                <img src="${imageURL}" alt="" />
                <h3>${name}</h3>
                <p>${artistsName}</p>
              </div>
    `;
    // Gắn thẻ div vô track-section
    const trackSection = document.getElementById("track-section");
    element.addEventListener("click", () => {
      playTrack(item.id, name, artistsName);
    });
    trackSection.appendChild(element);
  });
}
async function playTrack(id, name, artisName) {
  const srcUrl = `https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`;
  const iframe = document.getElementById("iframe");
  iframe.src = srcUrl;
  const modalName = document.getElementById("modal-name");
  modalName.innerHTML = ` <i
            style="font-size: 25px; color: #7877c6"
            class="fa-solid fa-music"
          ></i> ${name}`;
  const modal = document.getElementById("modal");
  modal.style.display = "flex";

  console.log(iframe);
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

async function getPopularTrack(query ="Tate Mc Race") {
  try {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: query,
        type: "track",
        market: "US",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getSpotifyToken() {
  try {
    const credentials = btoa(
      `${SPOTIFY_CONFIG.CLIENT_ID}:${SPOTIFY_CONFIG.CLIENT_SECRET}`
    );

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
}

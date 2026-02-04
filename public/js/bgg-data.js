const BGG_USER = 'jujunior';
const BASE_URL = 'https://boardgamegeek.com/xmlapi2';

async function fetchBGGData() {
    try {
        // 1. Fetch Recently Played (Plays API)
        const playsRes = await fetch(`${BASE_URL}/plays?username=${BGG_USER}`);
        const playsXml = await playsRes.text();
        renderPlays(playsXml);

        // 2. Fetch Collection (Collection API) 
        // We filter for 'own=1' for favorites (we'll filter by rating in JS)
        // and 'wishlist=1' for the buy list.
        const collectionRes = await fetch(`${BASE_URL}/collection?username=${BGG_USER}&stats=1`);
        const collectionXml = await collectionRes.text();
        renderCollection(collectionXml);

    } catch (error) {
        console.error("Error fetching BGG data:", error);
    }
}

function renderPlays(xmlString) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, "text/xml");
    const plays = xml.getElementsByTagName("play");
    const container = document.getElementById('played-carousel');
    container.innerHTML = '';

    // Take top 6 unique recent games
    let displayed = 0;
    for (let play of plays) {
        if (displayed >= 6) break;
        const item = play.getElementsByTagName("item")[0];
        const name = item.getAttribute("name");
        const id = item.getAttribute("objectid");

        container.innerHTML += `
            <div class="col">
                <div class="card h-100 shadow-sm">
                    <div class="card-body text-center">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text text-muted small">Played on ${play.getAttribute("date")}</p>
                        <a href="https://boardgamegeek.com/boardgame/${id}" target="_blank" class="btn btn-outline-primary btn-sm">View on BGG</a>
                    </div>
                </div>
            </div>`;
        displayed++;
    }
}

function renderCollection(xmlString) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, "text/xml");
    const items = xml.getElementsByTagName("item");
    
    const favContainer = document.getElementById('favorites-carousel');
    const wishContainer = document.getElementById('wishlist-container');
    
    favContainer.innerHTML = '';
    wishContainer.innerHTML = '';

    for (let item of items) {
        const name = item.getElementsByTagName("name")[0].textContent;
        const thumbnail = item.getElementsByTagName("thumbnail")[0]?.textContent || '';
        const id = item.getAttribute("objectid");
        
        // Check for Favorites (Games you rated 9 or 10)
        const rating = item.getElementsByTagName("stats")[0]
                          .getElementsByTagName("rating")[0]
                          .getAttribute("value");
        
        if (rating >= 9) {
            favContainer.innerHTML += `
                <div class="col">
                    <div class="card h-100 border-0 shadow">
                        <img src="${thumbnail}" class="card-img-top p-3" alt="${name}" style="height: 200px; object-fit: contain;">
                        <div class="card-body text-center">
                            <h5 class="card-title">${name}</h5>
                            <span class="badge bg-warning text-dark">Rating: ${rating}</span>
                        </div>
                    </div>
                </div>`;
        }

        // Check for Wishlist (wanttobuy or wishlist status)
        const status = item.getElementsByTagName("status")[0];
        if (status.getAttribute("wishlist") === "1" || status.getAttribute("wanttobuy") === "1") {
            wishContainer.innerHTML += `
                <a href="https://boardgamegeek.com/boardgame/${id}" target="_blank" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                    ${name}
                    <i class="fas fa-external-link-alt small opacity-50"></i>
                </a>`;
        }
    }
}

// Start the process
fetchBGGData();
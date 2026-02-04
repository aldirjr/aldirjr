// public/js/personal.js

async function fetchBGGCollection() {
    try {
        // We call our new local API route instead of the BGG URL
        const response = await fetch('/api/get-games');
        
        if (response.status === 202) {
            console.log("Data is being prepared... retrying in 3s");
            setTimeout(fetchBGGCollection, 3000);
            return;
        }

        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const items = xmlDoc.getElementsByTagName("item");

        renderGames(items); // This function stays the same as before!
    } catch (error) {
        console.error("Error:", error);
    }
}

function renderGames(items) {
    const playedContent = document.getElementById('played-carousel-content');
    const favsContent = document.getElementById('favs-carousel-content');
    const wishlistGrid = document.getElementById('wishlistGrid');

    // Clear loaders
    playedContent.innerHTML = '';
    favsContent.innerHTML = '';
    wishlistGrid.innerHTML = '';

    let playedCount = 0;
    let favCount = 0;

    Array.from(items).forEach(item => {
        const name = item.getElementsByTagName("name")[0].textContent;
        const thumbnail = item.getElementsByTagName("thumbnail")[0]?.textContent || 'https://via.placeholder.com/200';
        const stats = item.getElementsByTagName("stats")[0];
        const rating = stats.getElementsByTagName("rating")[0].getAttribute("value");
        const numPlays = item.getElementsByTagName("numplays")[0].textContent;
        
        // Status checks
        const isWishlist = item.getElementsByTagName("status")[0].getAttribute("wishlist") === "1";
        const isFavorite = parseFloat(rating) >= 9; // Assuming 9-10 are favorites

        const gameUrl = `https://boardgamegeek.com/boardgame/${item.getAttribute("objectid")}`;

        // Template for Carousel Item
        const createCarouselItem = (isActive) => `
            <div class="carousel-item ${isActive ? 'active' : ''}">
                <div class="d-flex justify-content-center align-items-center bg-dark text-white p-5 rounded-4" style="height: 400px; background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${thumbnail}') center/cover;">
                    <div class="text-center">
                        <h2 class="fw-bold">${name}</h2>
                        <p><i class="fas fa-star text-warning"></i> Rating: ${rating}/10 | Plays: ${numPlays}</p>
                        <a href="${gameUrl}" target="_blank" class="btn btn-outline-light">View on BGG</a>
                    </div>
                </div>
            </div>`;

        // 1. Recently Played (Logic: Has been played at least once)
        if (parseInt(numPlays) > 0 && playedCount < 5) {
            playedContent.innerHTML += createCarouselItem(playedCount === 0);
            playedCount++;
        }

        // 2. Favorites (Logic: Rating >= 9)
        if (isFavorite && favCount < 5) {
            favsContent.innerHTML += createCarouselItem(favCount === 0);
            favCount++;
        }

        // 3. Wishlist Grid
        if (isWishlist) {
            wishlistGrid.innerHTML += `
                <div class="game-card">
                    <div class="game-image" style="background: url('${thumbnail}') center/cover;"></div>
                    <div class="game-content text-center">
                        <h3 class="game-title">${name}</h3>
                        <span class="game-status status-wishlist">Wishlist</span>
                        <div class="mt-3">
                            <a href="${gameUrl}" target="_blank" class="btn btn-sm btn-primary">View Details</a>
                        </div>
                    </div>
                </div>`;
        }
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', fetchBGGCollection);

// // Filter board games
// function filterGames(status) {
//     const games = document.querySelectorAll('#gamesGrid .game-card');
//     const buttons = document.querySelectorAll('.boardgames-section .tab-btn');
    
//     buttons.forEach(btn => btn.classList.remove('active'));
//     event.target.classList.add('active');
    
//     games.forEach(game => {
//         if (status === 'all' || game.dataset.status === status) {
//             game.style.display = 'block';
//         } else {
//             game.style.display = 'none';
//         }
//     });
// }

// Filter books
function filterBooks(status) {
    const books = document.querySelectorAll('#booksGrid .book-card');
    const buttons = document.querySelectorAll('.books-section .tab-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    books.forEach(book => {
        if (status === 'all' || book.dataset.status === status) {
            book.style.display = 'block';
        } else {
            book.style.display = 'none';
        }
    });
}
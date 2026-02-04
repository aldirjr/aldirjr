// public/js/personal.js

// Filter board games
function filterGames(status) {
    const games = document.querySelectorAll('#gamesGrid .game-card');
    const buttons = document.querySelectorAll('.boardgames-section .tab-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    games.forEach(game => {
        if (status === 'all' || game.dataset.status === status) {
            game.style.display = 'block';
        } else {
            game.style.display = 'none';
        }
    });
}

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
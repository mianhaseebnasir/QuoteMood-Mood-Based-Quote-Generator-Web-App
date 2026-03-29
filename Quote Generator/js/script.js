const quotes = [
    { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama", mood: "happy" },
    { text: "The most wasted of days is one without laughter.", author: "E.E. Cummings", mood: "happy" },
    { text: "Count your age by friends, not years. Count your life by smiles, not tears.", author: "John Lennon", mood: "happy" },
    { text: "For every minute you are angry you lose sixty seconds of happiness.", author: "Ralph Waldo Emerson", mood: "happy" },

    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", mood: "motivated" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", mood: "motivated" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", mood: "motivated" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", mood: "motivated" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", mood: "motivated" },

    { text: "Peace comes from within. Do not seek it without.", author: "Buddha", mood: "calm" },
    { text: "In the midst of movement and chaos, keep stillness inside of you.", author: "Deepak Chopra", mood: "calm" },
    { text: "The quieter you become, the more you can hear.", author: "Ram Dass", mood: "calm" },
    { text: "Calm mind brings inner strength and self-confidence.", author: "Dalai Lama", mood: "calm" },

    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", mood: "inspired" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", mood: "inspired" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", mood: "inspired" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", mood: "inspired" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", mood: "inspired" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs", mood: "inspired" },
];

let currentQuote = null;
let currentMood = 'all';
let favorites = [];

function newQuote() {
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');

    quoteText.style.animation = 'none';
    quoteAuthor.style.animation = 'none';

    const filtered = currentMood === 'all'
        ? quotes
        : quotes.filter(q => q.mood === currentMood);

    let quote;
    do {
        quote = filtered[Math.floor(Math.random() * filtered.length)];
    } while (currentQuote && quote.text === currentQuote.text && filtered.length > 1);

    currentQuote = quote;

    setTimeout(() => {
        quoteText.style.animation = 'slideUp 0.6s ease forwards';
        quoteAuthor.style.animation = 'slideUp 0.6s ease 0.15s forwards';
        quoteText.textContent = quote.text;
        quoteAuthor.textContent = quote.author;
        updateHeartIcon();
    }, 50);
}

function setMood(mood) {
    currentMood = mood;

    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    newQuote();
}

function toggleFavorite() {
    if (!currentQuote) return;

    const index = favorites.findIndex(f => f.text === currentQuote.text);

    if (index > -1) {
        favorites.splice(index, 1);
        showNotification('Removed from favorites');
    } else {
        favorites.push({ ...currentQuote });
        showNotification('Added to favorites ♡');
    }

    updateHeartIcon();
}

function updateHeartIcon() {
    const heartBtn = document.getElementById('heartBtn');
    if (currentQuote && favorites.some(f => f.text === currentQuote.text)) {
        heartBtn.textContent = '♥';
        heartBtn.classList.add('active');
    } else {
        heartBtn.textContent = '♡';
        heartBtn.classList.remove('active');
    }
}

function copyQuote() {
    if (!currentQuote) return;

    const text = `"${currentQuote.text}" — ${currentQuote.author}`;
    navigator.clipboard.writeText(text);
    showNotification('✓ Copied to clipboard!');
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        newQuote();
    }
});

window.addEventListener('load', () => {
    newQuote();
});
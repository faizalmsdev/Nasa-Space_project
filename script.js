document.addEventListener('DOMContentLoaded', () => {
    getCurrentImageOfTheDay();
    addSearchToHistory();
    
    document.getElementById('search-form').addEventListener('submit', (e) => {
        e.preventDefault();
        getImageOfTheDay();
    });

    document.getElementById('search-history').addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const selectedDate = e.target.innerText;
            getImageOfTheDay(selectedDate);
        }
    });
});

function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split('T')[0];
    getImage(currentDate);
}

function getImageOfTheDay(selectedDate) {
    const date = selectedDate || document.getElementById('search-input').value;
    getImage(date);
}

function getImage(date) {
    const apiKey = 'myGLtcgJyp7zKq1vhcP9YzEIkop0dlaECzUOQ0V7';
    const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayImage(data);
            saveSearch(date);
            addSearchToHistory();
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayImage(data) {
    const imageContainer = document.getElementById('current-image-container');
    imageContainer.innerHTML = `<img src="${data.url}" alt="${data.title}"><p>${data.title}</p>`;
}

function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));
}

function addSearchToHistory() {
    const searchHistoryList = document.getElementById('search-history');
    searchHistoryList.innerHTML = '';

    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.forEach(search => {
        const listItem = document.createElement('li');
        listItem.textContent = search;
        searchHistoryList.appendChild(listItem);
    });
}

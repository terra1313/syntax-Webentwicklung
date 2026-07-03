// ============================================
// USER VERZEICHNIS APP - Vollständig
// ============================================

// === 1. DOM ELEMENTE SELEKTIEREN ===
const searchInput = document.querySelector('#search-input');
const loadBtn = document.querySelector('#load-btn');
const userList = document.querySelector('#user-list');
const statusEl = document.querySelector('#status');

const sortNameBtn = document.querySelector('#sort-name');
const sortCountryBtn = document.querySelector('#sort-country');


// === 2. STATE (Daten-Speicher) ===
let allUsers = [];

// === 3. API URL ===
const API_URL = 'https://randomuser.me/api/?results=10';

// === 4. HILFSFUNKTIONEN ===

const setStatus = (message, type = '') => {
    statusEl.textContent = message;
    statusEl.classList.remove('loading', 'error', 'success');
    if (type) {
        statusEl.classList.add(type);
    }
};

const createUserCard = (user) => {
    const { name, email, picture, location } = user;
    const fullName = `${name.first} ${name.last}`;
    const city = `${location.city}, ${location.country}`;

    const card = document.createElement('div');
    card.classList.add('user-card');

    const avatar = document.createElement('img');
    avatar.classList.add('user-avatar');
    avatar.src = picture.medium;
    avatar.alt = fullName;

    const info = document.createElement('div');
    info.classList.add('user-info');

    const nameEl = document.createElement('div');
    nameEl.classList.add('user-name');
    nameEl.textContent = fullName;

    const emailEl = document.createElement('div');
    emailEl.classList.add('user-email');
    emailEl.textContent = email;

    const locationEl = document.createElement('div');
    locationEl.classList.add('user-location');
    locationEl.textContent = city;

    info.appendChild(nameEl);
    info.appendChild(emailEl);
    info.appendChild(locationEl);

    card.appendChild(avatar);
    card.appendChild(info);

    return card;
};

const renderUsers = (users) => {
    userList.innerHTML = '';

    if (users.length === 0) {
        const placeholder = document.createElement('p');
        placeholder.classList.add('placeholder');
        placeholder.textContent = 'Keine User gefunden.';
        userList.appendChild(placeholder);
        return;
    }

    users.forEach(user => {
        const card = createUserCard(user);
        userList.appendChild(card);
    });
};

// === 5. API FUNKTION ===

const loadUsers = async () => {
    setStatus('Lade User...', 'loading');
    loadBtn.disabled = true;
    userList.innerHTML = '<p class="loading-spinner">Laden...</p>';

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP Fehler: ${response.status}`);
        }

        const data = await response.json();
        allUsers = data.results;

        renderUsers(allUsers);
        setStatus(`${allUsers.length} User geladen`, 'success');

    } catch (error) {
        console.error('Fehler beim Laden:', error);
        setStatus('Fehler beim Laden!', 'error');
        userList.innerHTML = '<p class="placeholder">Fehler beim Laden. Bitte erneut versuchen.</p>';

    } finally {
        loadBtn.disabled = false;
    }
};

// === 6. FILTER FUNKTION ===

const filterUsers = (searchTerm) => {
    // Noch keine User geladen? Dann nichts tun
    if (allUsers.length === 0) {
        return;
    }

    if (!searchTerm.trim()) {
        renderUsers(allUsers);
        setStatus(`${allUsers.length} User angezeigt`, 'success');
        return;
    }

    const term = searchTerm.toLowerCase();

    const filtered = allUsers.filter(user => {
        const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
        return fullName.includes(term);
    });

    renderUsers(filtered);
    setStatus(`${filtered.length} von ${allUsers.length} User`, 'success');
};


// bonus punkt: Sortierung 
const sortByName = () => {
    const sorted = [...allUsers].sort((a, b) => {
        const nameA = `${a.name.first} ${a.name.last}`.toLowerCase();
        const nameB = `${b.name.first} ${b.name.last}`.toLowerCase();
        return nameA.localeCompare(nameB);
    });

    renderUsers(sorted);
    setStatus("User nach Name sortiert", "success");
};

const sortByCountry = () => {
    const sorted = [...allUsers].sort((a, b) => {
        const countryA = a.location.country.toLowerCase();
        const countryB = b.location.country.toLowerCase();
        return countryA.localeCompare(countryB);
    });

    renderUsers(sorted);
    setStatus("User nach Land sortiert", "success");
};


// === 7. EVENT LISTENERS ===

loadBtn.addEventListener('click', () => {
    loadUsers();
});

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value;
    filterUsers(searchTerm);
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && allUsers.length === 0) {
        loadUsers();
    }
});


sortNameBtn.addEventListener('click', () => {
    sortByName();
});

sortCountryBtn.addEventListener('click', () => {
    sortByCountry();
});


// === 8. INITIALISIERUNG ===
console.log('User Verzeichnis App geladen!');
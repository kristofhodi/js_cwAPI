const form = document.getElementById('userForm');
const usernameInput = document.getElementById('username');
const userCards = document.getElementById('userCards');
const toggleModeButton = document.getElementById('toggleMode');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

toggleModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    if (!username) return;

    try {
        const response = await fetch(`https://www.codewars.com/api/v1/users/${username}`);
        if (!response.ok) throw new Error('User not found');
        const data = await response.json();

        displayUser(data);
        usernameInput.value = '';
    } catch (error) {
        alert(error.message);
    }
});

clearData.addEventListener('click', () => {
    userCards.innerHTML = '';
});

function displayUser(user) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h2>${user.username}</h2>
        <p><strong>Name:</strong> ${user.name || 'N/A'}</p>
        <p><strong>Clan:</strong> ${user.clan || 'N/A'}</p>
        <p><strong>Languages:</strong> ${Object.keys(user.ranks.languages).join(', ') || 'N/A'}</p>
        <p><strong>Honor:</strong> ${user.honor}</p>
        <p><strong>Rank:</strong> ${user.ranks.overall.name}</p>
    `;
    userCards.appendChild(card);
}

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const lastModifiedElement = document.getElementById('last-modified');
    const currentYear = new Date().getFullYear();
    document.getElementById("current-year").innerHTML = `&copy; ${currentYear} Seth McNabb | USA`;
    const dateLastModified = new Date(document.lastModified).toDateString();
    lastModifiedElement.innerHTML = `Last modified: ${dateLastModified}`;

    const membersContainer = mainContent;

    async function fetchMembers() {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMembers(members);
    }

    function displayMembers(members) {
        membersContainer.innerHTML = '';

        members.forEach(member => {
            const card = document.createElement('div');
            card.className = 'member-card';
            card.innerHTML = `
                <img src="${member.image}" alt="${member.name}" loading="lazy">
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;
            membersContainer.appendChild(card);
        });
    }

    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('nav');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    document.getElementById('grid-view').addEventListener('click', () => {
        membersContainer.className = 'members-container grid-view'; 
    });

    document.getElementById('list-view').addEventListener('click', () => {
        membersContainer.className = 'members-container list-view';
    });

    fetchMembers();
});

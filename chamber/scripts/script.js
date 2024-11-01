document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const featuredContent = document.getElementById('featured-content');
    const lastModifiedElement = document.getElementById('last-modified');
    const currentYear = new Date().getFullYear();
    document.getElementById("current-year").innerHTML = `&copy; ${currentYear} Seth McNabb | USA`;
    const dateLastModified = new Date(document.lastModified).toDateString();
    lastModifiedElement.innerHTML = `Last modified: ${dateLastModified}`;

    async function fetchMembers() {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const members = await response.json();
            displayMembers(members);
            displayFeaturedBusiness(members);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    function displayMembers(members) {
        mainContent.innerHTML = '';
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
            mainContent.appendChild(card);
        });
    }

    function displayFeaturedBusiness(members) {
        const featured = members[0];
        if (featured) {
            featuredContent.innerHTML = '';
            const card_2 = document.createElement('div');
            card_2.className = 'featured-card';
            card_2.innerHTML = `
                <img src="${featured.image}" alt="${featured.name}" loading="lazy">
                <h2>${featured.name}</h2>
                <p>${featured.address}</p>
                <p>${featured.phone}</p>
                <a href="${featured.website}" target="_blank">Visit Website</a>
            `;
            featuredContent.appendChild(card_2);
        } else {
            featuredContent.innerHTML = '<p>No featured business available.</p>';
        }
    }

    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('nav');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    fetchMembers();
});

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=37.096208305119696&lon=-113.57259560267268&units=imperial&appid=671c492a0807a73bede4032a5519c1ac';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp.toFixed(1)}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
}

apiFetch();

document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
      const currentTimestamp = new Date().toISOString();
      timestampField.value = currentTimestamp;
    }
  });

const modal = document.querySelectorAll('.modal');
const button = document.querySelectorAll('.button');
const close = document.querySelectorAll('.close');

button.forEach((btn, index) => {
    btn.onclick = () => {
        modal[index].style.display = "block";
    };
});

close.forEach((cl) => {
    cl.onclick = () => {
        modal.forEach(m => m.style.display = "none");
    };
});

window.onclick = (event) => {
    if (event.target.classList.contains('modal')) {
        modal.forEach(m => m.style.display = "none");
    }
};

const lastVisitMessage = document.getElementById("last-visit-message");
const lastVisitKey = "lastVisit";
const now = Date.now();
const lastVisit = localStorage.getItem(lastVisitKey);

if (lastVisit) {
    const daysSinceLastVisit = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

    if (daysSinceLastVisit === 0) {
        lastVisitMessage.textContent = "Glad you're back!";
    } else {
        lastVisitMessage.textContent = `You last visited ${daysSinceLastVisit} day${daysSinceLastVisit > 1 ? "s" : ""} ago.`;
    }
} else {
    lastVisitMessage.textContent = "Welcome! Let us know if you have any questions.";
}

localStorage.setItem(lastVisitKey, now);


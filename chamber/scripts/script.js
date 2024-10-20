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

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const windSpeed = document.querySelector("#wind-speed");


const url = 'https://api.openweathermap.org/data/2.5/weather?lat=32.70676413908385&lon=-117.15155047161586&units=imperial&appid=671c492a0807a73bede4032a5519c1ac';

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        //console.log(data);
        displayResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
}
  

function displayResults(weatherData) {
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(1)}</strong>`;
    windSpeed.innerHTML = `<strong>${weatherData.wind.speed.toFixed(1)}</strong>`;
    
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;
  
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
}

const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.addEventListener('click', (event) => {
    if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});

let date = new Date();
let year = date.getFullYear();
let dateString = date.toDateString();
let dateLastModifiedLong = new Date(document.lastModified);
let dateLastModified = dateLastModifiedLong.toDateString();

document.getElementById("current-year").innerHTML = `&copy ${year} Seth McNabb | USA`;
document.getElementById("last-modified").innerHTML = `Last modified: ${dateLastModified}`;

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        completed: false
    }
];

function displayCourses(filter = 'All') {
    const coursesContainer = document.getElementById('courses-container');
    coursesContainer.innerHTML = '';

    const filteredCourses = filter === 'All' ? courses : courses.filter(course => course.subject === filter);

    filteredCourses.forEach(course => {
        const courseBox = document.createElement('div');
        courseBox.classList.add('course-box');
        courseBox.innerHTML = `<h3>${course.subject} ${course.number}</h3><p>${course.title}</p>`;
        coursesContainer.appendChild(courseBox);
    });
}

document.getElementById('all-btn').addEventListener('click', () => displayCourses('All'));
document.getElementById('cse-btn').addEventListener('click', () => displayCourses('CSE'));
document.getElementById('wdd-btn').addEventListener('click', () => displayCourses('WDD'));

displayCourses();

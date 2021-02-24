'use strict';

// Variables/selectors
const modal = document.querySelector('.modal'),
    overlay = document.querySelector('.overlay'),
    btnCloseModal = document.querySelector('.btn--close-modal'),
    btnsOpenModal = document.querySelectorAll('.btn--show-modal'),
    btnScrollTo = document.querySelector('.btn--scroll-to'),
    section1 = document.getElementById('section--1'),
    navLinks = document.querySelector('.nav__links'),
    tabs = document.querySelectorAll('.operations__tab'),
    tabsContainer = document.querySelector('.operations__tab-container'),
    tabsContent = document.querySelectorAll('.operations__content'),
    navEl = document.querySelector('.nav'),
    headerEl = document.querySelector('.header'),
    allSectionsEl = document.querySelectorAll('.section');

// ------------------- //
// // FUNCTIONS // //
// ------------------- //
// Function: Open modal
const openModal = (e) => {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

// Function: Close modal
const closeModal = () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

// ---------------------------- //
// // // EVENT LISTENERS // // //
// ---------------------------- //
// Event Listener: Open modal
btnsOpenModal.forEach((btn) => {
    btn.addEventListener('click', openModal);
});

// Event Listener: Close modal button
btnCloseModal.addEventListener('click', closeModal);

// Event Listener: Close modal on overlaty click
overlay.addEventListener('click', closeModal);

// Event Listener: Close modal on escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// Event Listener: Lean more btn click
btnScrollTo.addEventListener('click', () => {
    section1.scrollIntoView({ behavior: 'smooth' });
});

// Event Listener: Page navigation
navLinks.addEventListener('click', function (e) {
    e.preventDefault();

    // Apply smooth scrolling to nav links
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});

// Event Listener: Tabbed componenet
tabsContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');

    // Guard clause
    if (!clicked) return;

    // Remove active class from every tab & Add active class to selected btn
    tabs.forEach((tab) => tab.classList.remove('operations__tab--active'));
    clicked.classList.add('operations__tab--active');

    // Remove all active content & Add active class to selected content
    tabsContent.forEach((content) =>
        content.classList.remove('operations__content--active')
    );
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');
});

// Event Listener & Function: Nav menu fade animation
const handleHover = (event, opacity) => {
    if (event.target.classList.contains('nav__link')) {
        const link = event.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        // Change opacity
        siblings.forEach((el) => {
            if (el !== link) el.style.opacity = opacity;
        });
        logo.style.opacity = opacity;
    }
};

navEl.addEventListener('mouseover', (e) => handleHover(e, 0.5));
navEl.addEventListener('mouseout', (e) => handleHover(e, 1));

// Event: Sticky Navigation using Intersection Observer API
const navHeight = navEl.getBoundingClientRect().height;
const stickyNav = (entries) => {
    const [entry] = entries;
    if (!entry.isIntersecting) navEl.classList.add('sticky');
    else navEl.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});
headerObserver.observe(headerEl);

// Event Listener: Section load/reveal animation
const revealSection = (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

allSectionsEl.forEach((sec) => {
    sectionObserver.observe(sec);
    sec.classList.add('section--hidden');
});

// Event: Lazy loading images
const imgTarget = document.querySelectorAll('img[data-src]');

const loadImg = (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    // Replace src with data-src
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', () =>
        entry.target.classList.remove('lazy-img')
    );
    observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px',
});

imgTarget.forEach((img) => imgObserver.observe(img));

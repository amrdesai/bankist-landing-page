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
    navEl = document.querySelector('.nav');

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

'use strict';

// Variables/selectors
const modal = document.querySelector('.modal'),
    overlay = document.querySelector('.overlay'),
    btnCloseModal = document.querySelector('.btn--close-modal'),
    btnsOpenModal = document.querySelectorAll('.btn--show-modal'),
    btnScrollTo = document.querySelector('.btn--scroll-to'),
    section1 = document.getElementById('section--1'),
    navLinks = document.querySelector('.nav__links');

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

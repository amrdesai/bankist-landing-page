'use strict';

// Modal window
const modal = document.querySelector('.modal'),
    overlay = document.querySelector('.overlay'),
    btnCloseModal = document.querySelector('.btn--close-modal'),
    btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

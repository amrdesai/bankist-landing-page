'use strict';

// Variables/selectors
const modal = document.querySelector('.modal'), // modal (open account btn)
    overlay = document.querySelector('.overlay'),
    btnCloseModal = document.querySelector('.btn--close-modal'),
    btnsOpenModal = document.querySelectorAll('.btn--show-modal'),
    btnScrollTo = document.querySelector('.btn--scroll-to'),
    // Navbar
    navLinks = document.querySelector('.nav__links'),
    navEl = document.querySelector('.nav'),
    headerEl = document.querySelector('.header'),
    // Section 1 (Features)
    section1 = document.getElementById('section--1'),
    // Section 2 (Operations)
    tabs = document.querySelectorAll('.operations__tab'),
    tabsContainer = document.querySelector('.operations__tab-container'),
    tabsContent = document.querySelectorAll('.operations__content'),
    // All sections
    allSectionsEl = document.querySelectorAll('.section'),
    // Testimonials slider
    slidesEl = document.querySelectorAll('.slide'),
    sliderBtnLeft = document.querySelector('.slider__btn--left'),
    sliderBtnRight = document.querySelector('.slider__btn--right'),
    dotContainerEl = document.querySelector('.dots');

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

// Event Listener & Function: Nav menu fade animation //
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

// Event Listener: Section load/reveal animation //
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

// Event: Lazy loading images //
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

// Event Listener & Function for slides (testimonials)
const sliderTestimonials = () => {
    // Function: Create Dots
    const createDots = () => {
        slidesEl.forEach((_, idx) => {
            dotContainerEl.insertAdjacentHTML(
                'beforeend',
                `<button class="dots__dot" data-slide="${idx}"></button>`
            );
        });
    };

    // Function: Activate Dot
    const activateDot = (slide) => {
        // Get all dots el
        const dotsEl = dotContainerEl.querySelectorAll('.dots__dot');
        // Remove active class from all dots
        dotsEl.forEach((dot) => {
            dot.classList.remove('dots__dot--active');
        });
        // Add active class to selected
        document
            .querySelector(`.dots__dot[data-slide="${slide}"]`)
            .classList.add('dots__dot--active');
    };

    // Function: Go to slide
    const goToSlide = (slide) => {
        slidesEl.forEach((s, i) => {
            s.style.transform = `translateX(${100 * (i - slide)}%)`;
        });
        activateDot(slide);
    };

    // Function: Slider init fn
    const sliderInit = () => {
        createDots();
        goToSlide(0);
    };
    sliderInit();

    // State variables
    let currentSlide = 0;
    const maxSlide = slidesEl.length;

    // Function: Go to next slide
    const goToNextSlide = () => {
        if (currentSlide === maxSlide - 1) currentSlide = 0;
        else currentSlide++;
        // Go to slide
        goToSlide(currentSlide);
    };

    // Function: Go to previous slide
    const goToPrevSlide = () => {
        if (currentSlide === 0) currentSlide = maxSlide - 1;
        else currentSlide--;
        // Go to slide
        goToSlide(currentSlide);
    };

    // Event Listener: Go to next slide
    sliderBtnRight.addEventListener('click', goToNextSlide);

    // Event Listener: Go to previous slide
    sliderBtnLeft.addEventListener('click', goToPrevSlide);

    // Event Listener: Go to next/prev slide on key press
    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft') goToPrevSlide();
        if (e.key === 'ArrowRight') goToNextSlide();
    });

    // Event Listener: Slider dots click event
    dotContainerEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('dots__dot')) {
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    });
};
sliderTestimonials();

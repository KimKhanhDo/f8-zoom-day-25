const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const slideshowContainer = $$('.slideshow-container');

slideshowContainer.forEach((container) => {
    const slideWrapper = container.querySelector('.slide-wrapper');
    const slideItems = container.querySelectorAll('.slide-item');
    const controlBtn = container.querySelector('.control-btn');
    const dots = container.querySelector('.dots');

    // Clone 1st slide -> create infinite loop
    const cloneSlide = slideItems[0].cloneNode(true);
    slideWrapper.appendChild(cloneSlide);

    const totalSlides = slideItems.length;

    const slideshow = {
        slideWrapper,
        totalSlides,
        currentIndex: 0,
    };

    controlBtn.onclick = (e) => {
        const isNext = e.target.closest('.next-btn');
        const isPrev = e.target.closest('.prev-btn');

        if (isNext) {
            slideshow.currentIndex++;
            updatePosition(slideshow);
        }

        if (isPrev) {
            slideshow.currentIndex--;
            updatePosition(slideshow);
        }
    };
});

function updatePosition(slideshow, skipAnimation = false) {
    const offset = `-${slideshow.currentIndex * 100}%`;

    // Confirm if animation should happen when change slide, but doesn't move the slide
    slideshow.slideWrapper.style.transition = skipAnimation
        ? 'none'
        : 'transform 0.6s ease';

    // Actual action to move the slide
    slideshow.slideWrapper.style.transform = `translateX(${offset})`;
}

const carousel = document.getElementById('carousel');

let isTouchDevice = window.innerWidth <= 768;
let startX = 0;
let currentIndex = 0;

function updateCarouselPosition() {
    const width = carousel.clientWidth;
    carousel.style.transform = `translateX(${-currentIndex * width}px)`;
}

// Appliquer swipe uniquement sur téléphone
if (isTouchDevice) {
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const deltaX = endX - startX;
        const threshold = 50;

        if (deltaX < -threshold && currentIndex < carousel.children.length - 1) {
            currentIndex++;
        } else if (deltaX > threshold && currentIndex > 0) {
            currentIndex--;
        }

        updateCarouselPosition();
    });

    window.addEventListener('resize', () => {
        isTouchDevice = window.innerWidth <= 768;
        updateCarouselPosition();
    });
}

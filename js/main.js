
document.addEventListener('DOMContentLoaded', () => {
    // ---------- PAGE NAVIGATION ----------
    const pages = [...document.querySelectorAll('.page')];
    const progress = document.getElementById('progress');
    let current = 0;

    function show(id) {
        const index = pages.findIndex(page => page.id === id);
        if (index < 0) return;

        current = index;

        pages.forEach((page, i) => {
            page.classList.toggle('active', i === index);
        });

        if (progress) {
            progress.textContent =
                `A little journey · ${index + 1} / ${pages.length}`;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.querySelectorAll('.next').forEach(button => {
        button.addEventListener('click', () => {
            startMusic();
            show(button.dataset.next);
        });
    });

    document.querySelectorAll('.back').forEach(button => {
        button.addEventListener('click', () => {
            show(button.dataset.back);
        });
    });

    const homeLogo = document.getElementById('homeLogo');
    if (homeLogo) {
        homeLogo.addEventListener('click', event => {
            event.preventDefault();
            show('p0');
        });
    }

    const restart = document.getElementById('restart');
    if (restart) {
  restart.addEventListener('click', () => {
    // Reset the surprise box
    const gift = document.getElementById('gift');
    const openGift = document.getElementById('openGift');
    const surpriseTitle = document.getElementById('surpriseTitle');
    const surpriseText = document.getElementById('surpriseText');
    const confetti = document.getElementById('confetti');

    if (gift) gift.classList.remove('opened');

    if (openGift) {
      openGift.textContent = 'Open Your Surprise ♡';
      openGift.disabled = false;
    }

    if (surpriseTitle) {
      surpriseTitle.textContent = 'A little surprise for you ♡';
    }

    if (surpriseText) {
      surpriseText.textContent = 'Open the box to see your surprise!';
    }

    if (confetti) confetti.innerHTML = '';

    show('p0');
  });
}


    // ---------- BACKGROUND MUSIC ----------
    const audio = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');
    const musicStatus = document.getElementById('musicStatus');

    let playing = false;

    async function startMusic() {
        if (!audio) return;

        try {
            await audio.play();
            playing = true;

            if (musicBtn) musicBtn.textContent = 'Ⅱ';
            if (musicStatus) {
                musicStatus.textContent = 'now playing · for you ♡';
            }
        } catch (error) {
            if (musicStatus) {
                musicStatus.textContent =
                    'Click to play · check our-song.mp3';
            }
        }
    }

    function pauseMusic() {
        if (!audio) return;

        audio.pause();
        playing = false;

        if (musicBtn) musicBtn.textContent = '♫';
        if (musicStatus) musicStatus.textContent = 'music paused';
    }

    if (audio) {
        audio.loop = true;
        audio.volume = 0.5;

        // Try autoplay; browser permission may be required.
        startMusic();

        // Keep the button status in sync with actual playback.
        audio.addEventListener('play', () => {
            playing = true;
            if (musicBtn) musicBtn.textContent = 'Ⅱ';
        });

        audio.addEventListener('pause', () => {
            playing = false;
            if (musicBtn) musicBtn.textContent = '♫';
        });

        // Start music on the first user interaction if autoplay was blocked.
        document.addEventListener('pointerdown', () => {
            if (audio.paused) startMusic();
        }, { once: true });
    }

    if (musicBtn) {
        musicBtn.addEventListener('click', event => {
            event.stopPropagation();

            if (audio && !audio.paused) {
                pauseMusic();
            } else {
                startMusic();
            }
        });
    }


    // ---------- PERMANENT GALLERY + OPTIONAL PHOTO UPLOAD ----------
    const upload = document.getElementById('photoUpload');
    const gallery = document.getElementById('gallery');

    // If you removed the upload input, the permanent gallery still works.
    if (upload && gallery) {
        upload.addEventListener('change', event => {
            [...(event.target.files || [])].forEach(file => {
                if (!file.type.startsWith('image/')) return;

                const figure = document.createElement('figure');
                const img = document.createElement('img');
                const caption = document.createElement('figcaption');

                img.src = URL.createObjectURL(file);
                img.alt = file.name;

                caption.textContent =
                    file.name.replace(/\.[^.]+$/, '')
                             .replace(/[-_]/g, ' ') + ' ♡';

                figure.append(img, caption);
                gallery.prepend(figure);
            });
        });
    }


    // ---------- GALLERY LIGHTBOX ----------
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.getElementById('closeLightbox');

    if (gallery && lightbox && lightboxImg) {
        gallery.addEventListener('click', event => {
            const img = event.target.closest('img');
            if (!img) return;

            lightboxImg.src = img.src;
            lightbox.classList.add('open');
        });
    }

    function hideLightbox() {
        if (lightbox) lightbox.classList.remove('open');
    }

    if (closeLightbox) {
        closeLightbox.addEventListener('click', hideLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', event => {
            if (event.target === lightbox) hideLightbox();
        });
    }

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') hideLightbox();
    });


    // ---------- FINAL SURPRISE / OPEN GIFT ----------
    const openGift = document.getElementById('openGift');
    const gift = document.getElementById('gift');
    const surpriseTitle = document.getElementById('surpriseTitle');
    const surpriseText = document.getElementById('surpriseText');
    const confettiArea = document.getElementById('confetti');

    if (openGift) {
        openGift.addEventListener('click', () => {
            if (gift) {
                gift.classList.add('opened');
                gift.textContent = '💝';
            }

            if (surpriseTitle) {
                surpriseTitle.textContent =
                    'To my love, with all my love ♡';
            }

            if (surpriseText) {
                surpriseText.textContent =
                    'শুভ জন্মদিন, মুনা। তোমার হাসি যেন কখনো হারিয়ে না যায়, ' +
                    'তোমার স্বপ্নগুলো এক এক করে সত্যি হোক, আর তোমার জীবন ' +
                    'ভরে উঠুক অনেক ভালোবাসা আর সুন্দর মুহূর্তে। তুমি আমার ' +
                    'কাছে ভীষণ স্পেশাল, আমার ময়না পাখি। ❤️';
            }

            openGift.textContent = 'Surprise opened ♡';
            openGift.disabled = true;

            // Confetti animation
            if (confettiArea) {
                confettiArea.replaceChildren();

                const icons = ['♥', '✦', '♡', '✿', '✨'];

                for (let i = 0; i < 42; i++) {
                    const piece = document.createElement('span');

                    piece.className = 'confetti-piece';
                    piece.textContent = icons[i % icons.length];
                    piece.style.left = Math.random() * 100 + '%';
                    piece.style.animationDelay =
                        Math.random() * 1.3 + 's';
                    piece.style.fontSize =
                        13 + Math.random() * 16 + 'px';

                    confettiArea.appendChild(piece);
                }
            }
        });
    }
});

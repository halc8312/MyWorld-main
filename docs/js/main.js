// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    // Close menu when clicking a link
    const navLinksItems = document.querySelectorAll('.nav-link');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.setAttribute('aria-label', 'ページトップへ');
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Active nav link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinksItems.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Chapter navigation active state (for novel page)
    const chapterNav = document.querySelector('.chapter-nav');
    if (chapterNav) {
        const chapterLinks = chapterNav.querySelectorAll('a');
        
        window.addEventListener('scroll', function() {
            const chapters = document.querySelectorAll('.chapter-content');
            let currentChapter = '';
            
            chapters.forEach(chapter => {
                const chapterTop = chapter.offsetTop - 150;
                if (window.pageYOffset >= chapterTop) {
                    currentChapter = chapter.id;
                }
            });

            chapterLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(currentChapter)) {
                    link.classList.add('active');
                }
            });
        });
    }
});

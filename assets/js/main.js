// Main JS - Theme Toggle + Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    const root = document.documentElement;

    const savedTheme = localStorage.getItem('illumina-theme');

    if (savedTheme) {
        root.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.setAttribute('data-theme', 'dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('illumina-theme', newTheme);
        });
    }

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            nav.classList.toggle('is-open');

            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
        });

        const navLinks = nav.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('is-open');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
});
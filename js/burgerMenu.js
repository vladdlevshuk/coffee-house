document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.getElementById('burger-menu');
    const navContainer = document.querySelector('.burger-menu__nav-container');
    const navList = document.querySelector('.burger-menu__nav-list');
    const navItems = document.querySelectorAll('.burger-menu__nav-list__item');

    function closeBurgerMenu() {
        burgerMenu.classList.remove('open');
        navContainer.classList.remove('open');
        navList.classList.remove('open');
        document.body.style.overflow = 'auto';
    }

    burgerMenu.addEventListener('click', function () {
        burgerMenu.classList.toggle('open');
        navContainer.classList.toggle('open');
        navList.classList.toggle('open');

        const body = document.body;
        body.style.overflow = body.style.overflow === 'hidden' ? 'auto' : 'hidden';
    });

    navItems.forEach(function (item) {
        item.addEventListener('click', function (event) {
            event.preventDefault();

            closeBurgerMenu();

            const targetId = event.currentTarget.children[0].getAttribute('href').substring(1);

            const targetElement = document.getElementById(targetId);

            const targetOffset = targetElement.offsetTop;

            window.scrollTo({
                top: targetOffset,
                behavior: 'smooth'
            });
        });
    });
});

function showMenu(menuType) {
    const allMenus = document.querySelectorAll('.menu__list');
    allMenus.forEach(menu => menu.classList.remove('active'));

    const buttons = document.querySelectorAll('.menu-buttons__item');
    buttons.forEach(button => button.classList.remove('active'));

    const targetMenu = document.getElementById(menuType + '-menu');
    targetMenu.classList.add('active');

    const activeButton = document.querySelector(`.menu-buttons__item[data-menu="${menuType}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }

    adjustMenuContainerHeight(menuType);
    adjustShowMoreButton(menuType);
}

function adjustMenuContainerHeight(menuType) {
    const activeMenu = document.querySelector('.menu__list.active');
    const menuContainer = document.querySelector('.menu__list-container');

    if (activeMenu) {
        const menuHeight = activeMenu.scrollHeight;

        if (window.innerWidth > 1300) {
            menuContainer.style.height = (menuType === 'tea') ? '540px' : '1086px';
        } else if (window.innerWidth <= 760) {
            menuContainer.style.height = (menuType === 'tea') ? '2172px' : 'auto';
        } else {
            menuContainer.style.height = (menuType === 'tea') ? '1086px' : 'auto';
        }
    }
}

function adjustShowMoreButton(menuType) {
    const showMoreButton = document.querySelector('.show-more-button');
    const remainingHiddenItems = document.querySelectorAll('.menu__list-item:not([style*="display: flex"])');

    if (window.innerWidth <= 1300) {
        showMoreButton.style.display = (menuType === 'tea') ? 'none' : 'flex';
        if (remainingHiddenItems.length === 0) {
            showMoreButton.style.display = 'none';
        }
    }
}

function showMoreItems() {
    const activeMenu = document.querySelector('.menu__list.active');

    if (activeMenu) {
        const hiddenItems = document.querySelectorAll('.menu__list-item:not([style*="display: flex"])');
        const showMoreButton = document.querySelector('.show-more-button');

        hiddenItems.forEach(item => item.style.display = 'flex');

        const remainingHiddenItems = document.querySelectorAll('.menu__list-item:not([style*="display: flex"])');
        if (remainingHiddenItems.length === 0) {
            showMoreButton.style.display = 'none';
        }
    }
}
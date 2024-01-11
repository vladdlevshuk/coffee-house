document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu__list-item');
    const modalOverlay = document.querySelector('.modal-menu__overlay');
    const modalContent = document.querySelector('.modal-menu-content__right');
    const modalMenu = document.querySelector('.modal-menu');

    let selectedSizeButton = document.querySelector('.menu-modal__size-button.active');
    let selectedSize = parseFloat(selectedSizeButton.getAttribute('data-price'));
    let selectedAdditives = [];
    let originalAdditiveState;

    const toggleSize = (selectedButton) => {
        document.querySelectorAll('.menu-modal__size-button').forEach((button) => button.classList.remove('active'));
        selectedButton.classList.add('active');
        selectedSize = parseFloat(selectedButton.getAttribute('data-price'));
        updateTotalPrice();
    };

    const toggleAdditive = (selectedButton) => {
        const additive = selectedButton.textContent;
        const index = selectedAdditives.indexOf(additive);

        if (index === -1) {
            selectedAdditives.push(additive);
            selectedButton.classList.add('active');
        } else {
            selectedAdditives.splice(index, 1);
            selectedButton.classList.remove('active');
        }

        updateTotalPrice();
    };

    const updateTotalPrice = () => {
        const activeMenuItem = document.querySelector('.menu__list-item.active');
        const price = parseFloat(activeMenuItem.querySelector('.menu__list-item-price').textContent.replace('$', ''));
        const activeSizeButton = modalContent.querySelector('.menu-modal__size-button.active');
        const totalPrice = price + parseFloat(activeSizeButton.getAttribute('data-price')) + (selectedAdditives.length * 0.5);
        document.querySelector('.menu-modal__price').textContent = `$${totalPrice.toFixed(2)}`;
    };

    const setDefaultSize = () => {
        const defaultSizeButton = modalContent.querySelector('.menu-modal__size-button[data-price="0"]');
        toggleSize(defaultSizeButton);
    };

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        modalMenu.classList.remove('active');
        document.body.style.overflow = '';

        selectedAdditives = [];
        const additiveButtons = document.querySelectorAll('.menu-modal__additive-button');
        additiveButtons.forEach((button) => {
            button.classList.remove('active');
        });

        setDefaultSize();
        resetSizeButtons();
    };

    menuItems.forEach((menuItem) => {
        menuItem.addEventListener('click', () => {
            menuItems.forEach((item) => item.classList.remove('active'));
            menuItem.classList.add('active');

            const title = menuItem.querySelector('.menu__list-item-title').textContent;
            const description = menuItem.querySelector('.menu__list-item-description').textContent;
            const imageSrc = menuItem.querySelector('.menu__list-item-image img').getAttribute('src');
            const menuModalImage = document.querySelector('.menu-modal__image');

            const activeSizeButton = modalContent.querySelector('.menu-modal__size-button.active');
            const imageSize = activeSizeButton.querySelector('.menu-modal__size-buttons-title');
            const existingTitle = imageSize.textContent;
            imageSize.textContent = existingTitle;

            modalContent.querySelector('.menu-modal__title').textContent = title;
            modalContent.querySelector('.menu-modal__description').textContent = description;

            menuModalImage.src = imageSrc;

            updateTotalPrice();

            modalOverlay.classList.add('active');
            modalMenu.classList.add('active');
            document.body.style.overflow = 'hidden';

            if (menuItem.parentElement.id === 'dessert-menu') {
                document.querySelector('.menu-modal__size-buttons-content.first').textContent = '50 g';
                document.querySelector('.menu-modal__size-buttons-content.second').textContent = '100 g';
                document.querySelector('.menu-modal__size-buttons-content.third').textContent = '200 g';
                document.querySelector('.menu-modal__additive-buttons-content.third').textContent = 'Berries';
                document.querySelector('.menu-modal__additive-buttons-content.second').textContent = 'Nuts';
                document.querySelector('.menu-modal__additive-buttons-content.third').textContent = 'Jam';
            }

            if (menuItem.parentElement.id === 'tea-menu') {
                document.querySelector('.menu-modal__additive-buttons-content.second').textContent = 'Lemon';
            }
        });
    });

    const sizeButtons = document.querySelectorAll('.menu-modal__size-button');

    sizeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            toggleSize(button);
        });
    });

    const additiveButtons = document.querySelectorAll('.menu-modal__additive-button');

    additiveButtons.forEach((button) => {
        button.addEventListener('click', () => {
            toggleAdditive(button);
        });
    });

    const resetSizeButtons = () => {
        document.querySelector('.menu-modal__size-buttons-content.first').textContent = '200 ml';
        document.querySelector('.menu-modal__size-buttons-content.second').textContent = '300 ml';
        document.querySelector('.menu-modal__size-buttons-content.third').textContent = '400 ml';
        document.querySelector('.menu-modal__additive-buttons-content.third').textContent = 'Sugar';
        document.querySelector('.menu-modal__additive-buttons-content.second').textContent = 'Cinnamon';
        document.querySelector('.menu-modal__additive-buttons-content.third').textContent = 'Syrup';
    };

    document.querySelector('.menu-modal__button-close').addEventListener('click', () => {
        closeModal();
    });

    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
});
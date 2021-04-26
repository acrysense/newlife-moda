document.addEventListener("DOMContentLoaded", function () {
    // HEIGHT 100VH FIX FOR IOS
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    
    // MOBILE MENU
    const hamburger = document.getElementById('hamburger-toggle')
    const mobileMenu = document.querySelector('.mobile-menu')
    const mobileMenuClose = document.querySelector('.mobile-menu__close')
    const overlay = document.querySelector('.overlay')
    const subMenuDropdown = document.querySelectorAll('.nav__link--dropdown')
    const subMenu = document.querySelectorAll('.submenu')

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            if (hamburger.classList.contains('hamburger--active') && mobileMenu.classList.contains('mobile-menu--open')) {
                if (overlay.classList.contains('overlay--active')) {
                    overlay.classList.remove('overlay--active')
                }
                hamburger.classList.remove('hamburger--active')
                mobileMenu.classList.remove('mobile-menu--open')
                document.body.classList.remove('scroll-disabled')
            } else {
                if (!overlay.classList.contains('overlay--active')) {
                    overlay.classList.add('overlay--active')
                }
                hamburger.classList.add('hamburger--active')
                mobileMenu.classList.add('mobile-menu--open')
                document.body.classList.add('scroll-disabled')
            }
        });
    }

    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', () => {
            if (hamburger.classList.contains('hamburger--active') && mobileMenu.classList.contains('mobile-menu--open')) {
                if (overlay.classList.contains('overlay--active')) {
                    overlay.classList.remove('overlay--active')
                }
                hamburger.classList.remove('hamburger--active')
                mobileMenu.classList.remove('mobile-menu--open')
                document.body.classList.remove('scroll-disabled')
            }
        })
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            if (hamburger.classList.contains('hamburger--active') && mobileMenu.classList.contains('mobile-menu--open')) {
                if (overlay.classList.contains('overlay--active')) {
                    overlay.classList.remove('overlay--active')
                }
                hamburger.classList.remove('hamburger--active')
                mobileMenu.classList.remove('mobile-menu--open')
                document.body.classList.remove('scroll-disabled')
            }
        })
    }

    if (subMenuDropdown && subMenu) {
        subMenuDropdown.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                item.classList.toggle('nav__link--active')
                item.nextElementSibling.classList.toggle('submenu--active')
            })
        })
    }

    // TOP PROMO
    const topPromoContainer = document.querySelector('.top-promo')
    const topPromoCloseBtn = document.querySelector('.top-promo__close')

    if (topPromoCloseBtn) {
        topPromoCloseBtn.addEventListener('click', () => {
            topPromoContainer.classList.add('top-promo--hidden')
        })
    }

    // SWIPER
    const galleryThumb = document.querySelector('.gallery-thumbs')
    const galleryMain = document.querySelector('.gallery-main')

    let mySwiperThumb = new Swiper(galleryThumb, {
        allowTouchMove: false,
        slidesPerView: 5,
        spaceBetween: 10,
        freeMode: true,
        direction: 'vertical',
        watchSlidesVisibility: true,
        watchSlidesProgress: true
    })
    
    let mySwiperMain = new Swiper(galleryMain, {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        loopedSlides: 5,
        preloadImages: false,
        lazy: true,
        thumbs: {
            swiper: mySwiperThumb,
        },
        breakpoints: {
            0: {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
            },
            768: {
                pagination: {
                    el: false,
                    clickable: false
                },
            }
        }
    })

    document.querySelectorAll('.products-slider__swiper').forEach(n => {
        const mySwiperProductsSlider = new Swiper(n.querySelector('.swiper-container'), {
            slidesPerView: 4,
            loop: true,
            preloadImages: false,
            lazy: true,
            observer: true,
            observeParents: true,
            breakpoints: {
                0: {
                    slidesPerView: 2,
                },
                576: {
                    slidesPerView: 3,
                },
                992: {
                    slidesPerView: 4,
                }
            }
        })
    })

    // TRIGGER
    document.querySelectorAll('.product__trigger').forEach((item) => {
        item.addEventListener("click", function() {
            item.parentNode.classList.toggle('product__inner--hidden')
        });
    })

    // FOOTER TRIGGER
    document.querySelectorAll('.footer__heading').forEach((item) => {
        item.addEventListener("click", function() {
            item.parentNode.classList.toggle('footer__list--open')
        });
    })
    
    // TABS
    const tabsItems = document.querySelectorAll('.tabs__item')

    if (tabsItems) {
        tabsItems.forEach((item, i) => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.tabs__item').forEach((child) => child.classList.remove('tabs__item--active'))
                document.querySelectorAll('.tabs__content').forEach((child) => child.classList.remove('tabs__content--active'))
    
                item.classList.add('tabs__item--active')
                document.querySelectorAll('.tabs__content')[i].classList.add('tabs__content--active')
            })
        })
    }

    // POP-UP
    const popUpBtn = document.querySelectorAll('.pop-up__btn')
    const popUp = document.querySelectorAll('.pop-up__wrapper')

    const useItemChecker = (el, onClickOutside) => {
        const checkBodyClick = (e) => {
            let currentEl = e.target;

            while (currentEl) {
                if (currentEl === el) break;
                currentEl = currentEl.parentNode
            }

            if (!currentEl) {
                onClickOutside()
                removeBodyChecker()
            }
        }
        function setBodyChecker  ()  {
            document.documentElement.addEventListener('click', checkBodyClick)
        }
        function removeBodyChecker ()  {
            document.documentElement.removeEventListener('click', checkBodyClick)
        }
        return {setBodyChecker, removeBodyChecker}
    }

    if (popUpBtn) {
        popUpBtn.forEach((item) => {
            const close = () => {
                let dataText = item.getAttribute('data-text') // Get attribute text
                item.nextElementSibling.classList.remove('pop-up__wrapper--active')
                item.classList.remove('pop-up__btn--close')
                item.innerHTML = dataText // Return original text 
            }
            const itemChecker = useItemChecker(item.parentNode, close)
            item.addEventListener('click', () => {
                if (!item.nextElementSibling.classList.contains('pop-up__wrapper--active')) {
                    item.nextElementSibling.classList.add('pop-up__wrapper--active')
                    item.classList.add('pop-up__btn--close')
                    item.innerHTML = 'Закрыть' // Change text
                    itemChecker.setBodyChecker()
                } else {
                    close()
                }
            })
        })
    }

    // PERSONAL AREA
    const cabinetItems = document.querySelectorAll('.cabinet__item')

    if (cabinetItems) {
        cabinetItems.forEach((item, i) => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.cabinet__item').forEach((child) => child.classList.remove('cabinet__item--active'))
                document.querySelectorAll('.cabinet__content').forEach((child) => child.classList.remove('cabinet__content--active'))
    
                item.classList.add('cabinet__item--active')
                document.querySelectorAll('.cabinet__content')[i].classList.add('cabinet__content--active')
            })
        })
    }

    // SELECT
    document.querySelectorAll('.select').forEach(select => {
        select.addEventListener('change', function(evt) {
            select.classList.toggle('is-selected', !!evt.target.value)
        })
    })

    // EYE PASSWORD
    const inputEye = document.querySelectorAll('.input-group__eye')

    if (inputEye) {
        inputEye.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                if (item.previousElementSibling.previousElementSibling.type == 'password') {
                    item.previousElementSibling.previousElementSibling.type = 'text'
                } else {
                    item.previousElementSibling.previousElementSibling.type = 'password'
                }
            })
        })
    }

    // INPUTMASK
    Inputmask().mask(document.querySelectorAll('input'))
});
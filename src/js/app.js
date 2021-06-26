document.addEventListener('DOMContentLoaded', function () {
    // INPUTMASK
    Inputmask().mask(document.querySelectorAll('input'))

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
        spaceBetween: 5,
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

    document.querySelectorAll('.goods__swiper').forEach(n => {
        const mySwiperGoodsSlider = new Swiper(n.querySelector('.swiper-container'), {
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
    document.querySelectorAll('.product__trigger:not(.product__trigger--static)').forEach((item) => {
        item.addEventListener('click', function() {
            item.parentNode.classList.toggle('product__inner--hidden')
        });
    })

    // FOOTER TRIGGER
    document.querySelectorAll('.footer__heading').forEach((item) => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.footer__list').forEach((child) => child.classList.remove('footer__list--open'))

            item.parentNode.classList.toggle('footer__list--open')
        });
    })

    // FILTER TRIGGER
    document.querySelectorAll('.filter__btn').forEach((item) => {
        item.addEventListener('click', function() {
            item.parentNode.parentNode.classList.toggle('filter__item--active')
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

                if (window.innerWidth < 768) {
                    document.querySelector('.cabinet__list').classList.remove('cabinet__list--active')
                    document.querySelector('.cabinet__title--mobile').classList.remove('cabinet__title--active')
                    document.querySelector('.cabinet__user-info').classList.remove('cabinet__user-info--active')
                }
    
                item.classList.add('cabinet__item--active')
                document.querySelectorAll('.cabinet__content')[i].classList.add('cabinet__content--active')
            })
        })
    }

    // PERSONAL AREA MOBILE MENU
    const cabinetTitles = document.querySelectorAll('.cabinet__title')

    if (cabinetTitles) {
        cabinetTitles.forEach((item) => {
            item.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    document.querySelectorAll('.cabinet__item').forEach((child) => child.classList.remove('cabinet__item--active'))
                    document.querySelectorAll('.cabinet__content').forEach((child) => child.classList.remove('cabinet__content--active'))

                    document.querySelector('.cabinet__list').classList.add('cabinet__list--active')
                    document.querySelector('.cabinet__title--mobile').classList.add('cabinet__title--active')
                    document.querySelector('.cabinet__user-info').classList.add('cabinet__user-info--active')
                }
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

    // CATALOG CONTENT
    const filterList = document.querySelectorAll('.filter__list')

    if (filterList) {
        filterList.forEach(item => {
            item.addEventListener('scroll', () => {
                if (item.scrollTop > 0) {
                    item.parentNode.classList.remove('filter__content--hidden')
                } else {
                    item.parentNode.classList.add('filter__content--hidden')
                }
            })
        })
    }

    // CATALOG FILTER (MOBILE)
    const filter = document.querySelector('.filter')
    const mobileFilterBtn = document.querySelector('.filter-btn')
    const mobileFilterClose = document.querySelector('.filter__back')

    if (mobileFilterBtn) {
        mobileFilterBtn.addEventListener('click', () => {
            filter.classList.add('filter--active')
            document.body.classList.add('scroll-disabled')
        })
    }

    if (mobileFilterClose) {
        mobileFilterClose.addEventListener('click', () => {
            filter.classList.remove('filter--active')
            document.body.classList.remove('scroll-disabled')
        })
    }

    // SORT (MOBILE)
    const mobileSort = document.querySelector('.mobile-sort')
    const mobileSortBtn = document.querySelector('.sort-btn')
    const mobileSortClose = document.querySelector('.mobile-sort__back')

    if (mobileSortBtn) {
        mobileSortBtn.addEventListener('click', () => {
            mobileSort.classList.add('mobile-sort--active')
            document.body.classList.add('scroll-disabled')
        })
    }

    if (mobileSortClose) {
        mobileSortClose.addEventListener('click', () => {
            mobileSort.classList.remove('mobile-sort--active')
            document.body.classList.remove('scroll-disabled')
        })
    }

    // SELECT
    const selected = document.querySelectorAll('.sort__selected')
    const optionsList = document.querySelectorAll('.sort__option')
    
    if (selected) {
        selected.forEach(item => {
            const close = () => {
                document.querySelectorAll('.sort__container').forEach((child) => child.classList.remove('sort__container--active'))
                document.querySelectorAll('.sort__selected').forEach((child) => child.classList.remove('sort__selected--active'))
            }
            const itemChecker = useItemChecker(item.parentNode, close)

            item.addEventListener('click', () => {
                if (item.previousElementSibling.classList.contains('sort__container--active')) {
                    document.querySelectorAll('.sort__container').forEach((child) => child.classList.remove('sort__container--active'))
                    document.querySelectorAll('.sort__selected').forEach((child) => child.classList.remove('sort__selected--active'))
                }
                else {
                    document.querySelectorAll('.sort__container').forEach((child) => child.classList.remove('sort__container--active'))
                    document.querySelectorAll('.sort__selected').forEach((child) => child.classList.remove('sort__selected--active'))
                    item.previousElementSibling.classList.add('sort__container--active')
                    item.classList.add('sort__selected--active')
                    itemChecker.setBodyChecker()
                }
            })
        });
    }

    if (optionsList) {
        optionsList.forEach((option, i) => {
            option.addEventListener('click', () => {
                option.parentNode.nextElementSibling.innerHTML = option.querySelector('label').innerHTML

                option.parentNode.classList.remove('sort__container--active')
                option.parentNode.nextElementSibling.classList.remove('sort__selected--active')
            });
        });
    }
});
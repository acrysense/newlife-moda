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

    // SMOOTH SCROOL
    function currentYPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;

        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;

        return 0;
    } 
    
    function elmYPosition(eID) {
        let elm = document.getElementById(eID);
        let y = elm.offsetTop;
        let node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    }
    
    function smoothScroll(eID) {
        let startY = currentYPosition();
        let stopY = elmYPosition(eID) - Number(document.querySelector('.header').clientHeight);
        let distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        let speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        let step = Math.round(distance / 25);
        let leapY = stopY > startY ? startY + step : startY - step;
        let timer = 0;
        if (stopY > startY) {
            for (let i = startY; i < stopY; i += step ) {
                setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (let i = startY; i > stopY; i -= step ) {
            setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    }

    function smoothScrollCoord(coord) {
        let startY = currentYPosition();
        let stopY = coord;
        let distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        let speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        let step = Math.round(distance / 25);
        let leapY = stopY > startY ? startY + step : startY - step;
        let timer = 0;
        if (stopY > startY) {
            for (let i = startY; i < stopY; i += step ) {
                setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (let i = startY; i > stopY; i -= step ) {
            setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    }
    
    // MOBILE MENU
    const hamburger = document.getElementById('hamburger-toggle')
    const mobileMenu = document.querySelector('.mobile-menu')
    const mobileMenuClose = document.querySelector('.mobile-menu__close')
    const overlay = document.querySelector('.overlay')
    const submenuOpen = document.querySelectorAll('.nav__link--dropdown')
    const submenu = document.querySelector('.submenu')
    const submenuBack = document.querySelector('.submenu__back')
    const subCategoriesOpen= document.querySelectorAll('.submenu__link--dropdown')
    const subCategories = document.querySelector('.subcategories')
    const subCategoriesBack = document.querySelector('.subcategories__back')

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            if (hamburger.classList.contains('hamburger--active') && mobileMenu.classList.contains('mobile-menu--open')) {
                if (modalOverlay.classList.contains('modal-overlay--active')) {
                    modalOverlay.classList.remove('modal-overlay--active')
                }
                hamburger.classList.remove('hamburger--active')
                mobileMenu.classList.remove('mobile-menu--open')
                document.body.classList.remove('scroll-disabled')
            } else {
                if (!modalOverlay.classList.contains('modal-overlay--active')) {
                    modalOverlay.classList.add('modal-overlay--active')
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
                if (modalOverlay.classList.contains('modal-overlay--active')) {
                    modalOverlay.classList.remove('modal-overlay--active')
                }
                hamburger.classList.remove('hamburger--active')
                mobileMenu.classList.remove('mobile-menu--open')
                document.body.classList.remove('scroll-disabled')
            }
        })
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            if (searchWrapper && searchWrapper.classList.contains('search--active')) {
                searchWrapper.classList.remove('search--active')
                overlay.classList.remove('overlay--active')
                document.body.classList.remove('scroll-disabled')
            }
        })
    }

    if (submenuOpen) {
        submenuOpen.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                let itemData = item.getAttribute('data-mobile-item')
                item.parentNode.parentNode.parentNode.style.display = 'none'
                submenu.classList.add('submenu--active')
                submenu.querySelector('.submenu__list[data-mobile-category="' + itemData + '"').classList.add('submenu__list--active')
            })
        })
    }

    if (submenuBack) {
        submenuBack.addEventListener('click', (event) => {
            event.preventDefault()

            submenu.previousElementSibling.style.display = 'block'
            submenu.classList.remove('submenu--active')
            submenu.querySelectorAll('.submenu__list').forEach((child) => child.classList.remove('submenu__list--active'))
        })
    }

    if (subCategoriesOpen) {
        subCategoriesOpen.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                let itemData = item.getAttribute('data-mobile-subitem')
                submenu.classList.remove('submenu--active')
                subCategories.classList.add('subcategories--active')
                subCategories.querySelector('.subcategories__list[data-mobile-subcategory="' + itemData + '"').classList.add('subcategories__list--active')
            })
        })
    }

    if (subCategoriesBack) {
        subCategoriesBack.addEventListener('click', (event) => {
            event.preventDefault()

            subCategories.classList.remove('subcategories--active')
            subCategories.querySelectorAll('.subcategories__list').forEach((child) => child.classList.remove('subcategories__list--active'))
            submenu.classList.add('submenu--active')
        })
    }

    // SEARCH
    const searchBtn = document.querySelector('.search-btn')
    const searchWrapper = document.querySelector('.search')
    const searchClose = document.querySelector('.search__close')
    const topPromo = document.querySelector('.top-promo')

    if (topPromo && searchWrapper) {
        const topPromoHeight = topPromo.getBoundingClientRect().height;
        let searchTop = topPromoHeight - window.pageYOffset

        if (window.pageYOffset < topPromoHeight) {
            searchWrapper.style.setProperty('top', `${searchTop}px`)
        } else {
            searchWrapper.style.setProperty('top', `${0}px`)
        }
    
        if (window.innerWidth < 768) {
            if (window.pageYOffset < topPromoHeight) {
                searchWrapper.style.setProperty('--vh', `calc(100vh - ${searchTop}px)`)
            } else {
                searchWrapper.style.setProperty('--vh', `100vh`)
            }
        }
    }
    
    let prevScrollpos = window.pageYOffset;
    const product = document.querySelector('.product')
    const productLeft = document.querySelector('.product__gallery')
    const productRight = document.querySelector('.product__fixed')
    let coordOffsetBottom = 0 // Fixed block on bottom position
    let coordOffsetTop = 0 // Fixed block on offsetop position

    function getCoords(elem) {
        let box = elem.getBoundingClientRect();
        
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

    function productScroll() {
        if (product && productLeft && productRight) {
            if (window.innerWidth >= 992) {
                let currentScrollPos = window.pageYOffset;

                if (prevScrollpos > currentScrollPos || prevScrollpos <= 0) { // If up
                    if (productRight.classList.contains('product__fixed--active')) { // Если при фиксированном блоке скроллим вверх - убираем фиксацию
                        productRight.classList.remove('product__fixed--active')
                        productRight.classList.add('product__fixed--bottom')
                        productRight.style.position = 'relative'
                        productRight.style.top = '0px'
                        productRight.style.transform = 'translate3d(0px, ' + coordOffsetTop + 'px, 0px)'
                    }

                    if (window.pageYOffset <= getCoords(productRight).top && productRight.classList.contains('product__fixed--bottom')) { // Если проскроллили до верха блока - фиксируем
                        productRight.classList.add('product__fixed--top')
                        productRight.style.position = 'fixed'
                        productRight.style.top = '0px'
                        productRight.style.transform = 'translate3d(0px, 0px, 0px)'
                    }

                    if (window.pageYOffset <= product.offsetTop && productRight.classList.contains('product__fixed--top')) {
                        productRight.classList.remove('product__fixed--top')
                        productRight.style.position = 'relative'
                        productRight.style.top = '0px'
                        productRight.style.transform = 'translate3d(0px, 0px, 0px)'
                    }
                } else { // If down
                    coordOffsetTop = getCoords(productRight).top - product.offsetTop

                    if (productRight.classList.contains('product__fixed--top')) {
                        productRight.classList.remove('product__fixed--top')
                        productRight.style.position = 'relative'
                        productRight.style.top = '0px'
                        productRight.style.transform = 'translate3d(0px, ' + coordOffsetTop + 'px, 0px)'
                    }
                    
                    if (window.pageYOffset >= getCoords(productRight).top + productRight.getBoundingClientRect().height - (document.documentElement.clientHeight - Number(30)) && !productRight.classList.contains('product__fixed--active')) {
                        if (!((window.pageYOffset - product.offsetTop) - Number(30) >= productLeft.getBoundingClientRect().height - document.documentElement.clientHeight)) {
                            coordOffsetBottom = (window.pageYOffset - product.offsetTop) - productRight.getBoundingClientRect().height + window.innerHeight - 30
                        }

                        productRight.classList.add('product__fixed--active')
                        productRight.style.position = 'fixed'
                        productRight.style.top = document.documentElement.clientHeight - Number(30) + 'px'
                        productRight.style.transform = 'translate3d(0px, -100%, 0px)'
                    }
                    if ((window.pageYOffset - product.offsetTop) - Number(30) >= productLeft.getBoundingClientRect().height - document.documentElement.clientHeight) {
                        let transformFixedBottom = product.getBoundingClientRect().height - productRight.getBoundingClientRect().height

                        productRight.classList.remove('product__fixed--active')
                        productRight.classList.add('product__fixed--bottom')
                        productRight.style.position = 'relative'
                        productRight.style.top = '0px'
                        productRight.style.transform = 'translate3d(0px, ' + transformFixedBottom + 'px, 0px)'
                    }
                }
                prevScrollpos = currentScrollPos;
            } else {
                productRight.style.position = 'relative'
                productRight.style.top = '0px'
                productRight.style.transform = 'translate3d(0px, 0px, 0px)'
            }
        }
    }

    const galleryThumbImg = document.querySelectorAll('.product__gallery-thumb > .product__gallery-img');
    const galleryMainImg = document.querySelectorAll('.product__gallery-main > .product__gallery-img');
    const sections = {};

    galleryMainImg.forEach((item, i) => {
        sections[i] = item.offsetTop + product.offsetTop - 100;
    })

    galleryThumbImg.forEach((item, i) => {
        item.addEventListener('click', (event) => {
            event.preventDefault()

            document.querySelectorAll('.product__gallery-thumb > .product__gallery-img').forEach((child) => child.classList.remove('is--active'))
            item.classList.add('is--active');

            smoothScrollCoord(sections[i])
        })
    })

    window.addEventListener('scroll', () => {
        if (topPromo && searchWrapper) {
            const topPromoHeight = topPromo.getBoundingClientRect().height;
            let searchTop = topPromoHeight - window.pageYOffset

            if (window.pageYOffset < topPromoHeight) {
                searchWrapper.style.setProperty('top', `${searchTop}px`)
            } else {
                searchWrapper.style.setProperty('top', `${0}px`)
            }

            if (window.innerWidth < 768) {
                if (window.pageYOffset < topPromoHeight) {
                    searchWrapper.style.setProperty('--vh', `calc(100vh - ${searchTop}px)`)
                } else {
                    searchWrapper.style.setProperty('--vh', `100vh`)
                }
            }
        }

        if (header && header.querySelector('.header__wrap') && !product) {
            const headerHeight = header.getBoundingClientRect().height;
            const topPromoHeight = topPromo ? topPromo.getBoundingClientRect().height : 0

            let currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos || prevScrollpos <= 0) { // If up
                if (window.pageYOffset <= topPromoHeight) {
                    header.querySelector('.header__wrap').style.transform = 'translate3d(0px, 0px, 0px)'
                    header.querySelector('.header__wrap').style.transition = 'none'
                    header.querySelector('.header__wrap').style.position = 'relative'
                } else {
                    header.querySelector('.header__wrap').style.transform = 'translate3d(0px, 0px, 0px)'
                    header.querySelector('.header__wrap').style.transition = 'transform 0.2s ease-in-out'
                    header.querySelector('.header__wrap').style.position = 'fixed'
                }
            } else { // If down
                if (window.pageYOffset >= headerHeight) {
                    header.querySelector('.header__wrap').style.transform = 'translate3d(0px, -100%, 0px)'
                    header.querySelector('.header__wrap').style.transition = 'transform 0.2s ease-in-out'
                    setTimeout(() => header.querySelector('.header__wrap').style.position = 'fixed', 200)
                }
            }
            prevScrollpos = currentScrollPos;
        }

        productScroll()

        for (let i in sections) {
            if (sections[i] <= window.pageYOffset) {
                document.querySelectorAll('.product__gallery-thumb > .product__gallery-img').forEach((child) => child.classList.remove('is--active'))
                document.querySelectorAll('.product__gallery-thumb > .product__gallery-img')[i].classList.add('is--active');
            }
        }
    })
    
    window.addEventListener('resize', () => {
        if (topPromo && searchWrapper) {
            const topPromoHeight = topPromo.getBoundingClientRect().height;
            let searchTop = topPromoHeight - window.pageYOffset

            if (window.pageYOffset < topPromoHeight) {
                searchWrapper.style.setProperty('top', `${searchTop}px`)
            } else {
                searchWrapper.style.setProperty('top', `${0}px`)
            }

            if (window.innerWidth < 768) {
                if (window.pageYOffset < topPromoHeight) {
                    searchWrapper.style.setProperty('--vh', `calc(100vh - ${searchTop}px)`)
                } else {
                    searchWrapper.style.setProperty('--vh', `100vh`)
                }
            }
        }
    })

    if (searchBtn) {
        searchBtn.addEventListener('click', (event) => {
            event.preventDefault()

            if (!searchWrapper.classList.contains('search--active')) {
                searchWrapper.classList.add('search--active')
                overlay.classList.add('overlay--active')
                document.body.classList.add('scroll-disabled')
            } else {
                searchWrapper.classList.remove('search--active')
                overlay.classList.remove('overlay--active')
                document.body.classList.remove('scroll-disabled')
            }
        });
    }

    if (searchClose) {
        searchClose.addEventListener('click', () => {
            if (searchWrapper.classList.contains('search--active')) {
                searchWrapper.classList.remove('search--active')
                overlay.classList.remove('overlay--active')
                document.body.classList.remove('scroll-disabled')
            }
        })
    }

    // BASKET MODAl
    const basketBtn = document.querySelector('.basket-btn')
    const basketWrapper = document.querySelector('.basket-modal')
    const basketClose = document.querySelectorAll('.basket-modal__close')

    if (basketBtn) {
        basketBtn.addEventListener('click', (event) => {
            event.preventDefault()

            if (!basketWrapper.classList.contains('basket-modal--active')) {
                basketWrapper.classList.add('basket-modal--active')
                modalOverlay.classList.add('modal-overlay--active')
                document.body.classList.add('scroll-disabled')
            } else {
                basketWrapper.classList.remove('basket-modal--active')
                overlay.classList.remove('overlay--active')
                document.body.classList.remove('scroll-disabled')
            }
        });
    }

    if (basketClose) {
        basketClose.forEach(item => {
            item.addEventListener('click', () => {
                if (basketWrapper.classList.contains('basket-modal--active')) {
                    basketWrapper.classList.remove('basket-modal--active')
                    modalOverlay.classList.remove('modal-overlay--active')
                    document.body.classList.remove('scroll-disabled')
                }
            })
        })
    }

    // REQUEST PHOTO
    const requestPhotoIcon = document.querySelector('.request-photo__icon')

    if (requestPhotoIcon) {
        requestPhotoIcon.addEventListener('click', (event) => {
            event.preventDefault()
        })
    }

    // TOP PROMO
    const topPromoContainer = document.querySelector('.top-promo')
    const topPromoCloseBtn = document.querySelector('.top-promo__close')

    if (topPromoCloseBtn) {
        topPromoCloseBtn.addEventListener('click', () => {
            topPromoContainer.classList.add('top-promo--hidden')

            if (topPromo && searchWrapper) {
                const topPromoHeight = topPromo.getBoundingClientRect().height;
                let searchTop = topPromoHeight - window.pageYOffset
    
                if (window.pageYOffset < topPromoHeight) {
                    searchWrapper.style.setProperty('top', `${searchTop}px`)
                } else {
                    searchWrapper.style.setProperty('top', `${0}px`)
                }
    
                if (window.innerWidth < 768) {
                    if (window.pageYOffset < topPromoHeight) {
                        searchWrapper.style.setProperty('--vh', `calc(100vh - ${searchTop}px)`)
                    } else {
                        searchWrapper.style.setProperty('--vh', `100vh`)
                    }
                }
            }
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
        loop: true,
        loopedSlides: 5,
        preloadImages: false,
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
        item.addEventListener('click', () => {
            item.parentNode.classList.toggle('product__inner--hidden')
        });
    })

    // FOOTER TRIGGER
    document.querySelectorAll('.footer__heading').forEach((item) => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.footer__list').forEach((child) => child.classList.remove('footer__list--open'))

            item.parentNode.classList.toggle('footer__list--open')
        });
    })

    // FILTER TRIGGER
    document.querySelectorAll('.filter__item:not(.filter__item--plus) .filter__btn').forEach((item) => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.filter__item:not(.filter__item--plus)').forEach((child) => child.classList.remove('filter__item--active'))
            
            item.parentNode.parentNode.classList.toggle('filter__item--active')
        });
    })

    document.querySelectorAll('.filter__item--plus .filter__btn').forEach((item) => {
        item.addEventListener('click', () => {
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
    const filterList = document.querySelectorAll('.filter__list .simplebar-content-wrapper')

    if (filterList) {
        filterList.forEach(item => {
            item.addEventListener('scroll', () => {
                if (item.scrollTop > 0) {
                    item.parentNode.parentNode.parentNode.parentNode.parentNode.classList.remove('filter__content--hidden')
                } else {
                    item.parentNode.parentNode.parentNode.parentNode.parentNode.classList.add('filter__content--hidden')
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

    // MODAL
    const modalBtn = document.querySelectorAll('.modal-btn'),
        modal = document.querySelectorAll('.modal'),
        modalClose = document.querySelectorAll('.modal__close'),
        modalOverlay = document.querySelector('.modal-overlay')
    
    if (modalBtn) {
        modalBtn.forEach((item, i) => {
            item.addEventListener('click', (event) => {
                event.preventDefault();

                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                if (!modalOverlay.classList.contains('modal-overlay--active')) {
                    modalOverlay.classList.add('modal-overlay--active')
                }
                document.body.classList.add('scroll-disabled')
                document.querySelector('.header').classList.add('header--active')

                const modalID = item.dataset.id
                document.getElementById(modalID).classList.add('modal--active')
            });
        });
    }

    document.body.addEventListener('keyup', (event) => {
        let key = event.keyCode;

        if (modal && modalOverlay.classList.contains('modal-overlay--active')) {
            if (key == 27) {
                document.body.classList.remove('scroll-disabled')
                document.querySelector('.header').classList.remove('header--active')
                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                modalOverlay.classList.remove('modal-overlay--active')
            };
        }
    }, false);


    if (modalOverlay) {
        modalOverlay.addEventListener('click', () => {
            if (modal && modalOverlay.classList.contains('modal-overlay--active')) {
                document.body.classList.remove('scroll-disabled')
                document.querySelector('.header').classList.remove('header--active')
                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                modalOverlay.classList.remove('modal-overlay--active')
            }

            if (basketWrapper && basketWrapper.classList.contains('basket-modal--active')) {
                basketWrapper.classList.remove('basket-modal--active')
                modalOverlay.classList.remove('modal-overlay--active')
                document.body.classList.remove('scroll-disabled')
            }

            if (hamburger.classList.contains('hamburger--active') && mobileMenu.classList.contains('mobile-menu--open')) {
                if (overlay.classList.contains('overlay--active')) {
                    overlay.classList.remove('overlay--active')
                }
                hamburger.classList.remove('hamburger--active')
                mobileMenu.classList.remove('mobile-menu--open')
                document.body.classList.remove('scroll-disabled')
            }
        });
    }

    if (modalClose) {
        modalClose.forEach((item) => {
            item.addEventListener('click', () => {
                document.body.classList.remove('scroll-disabled')
                document.querySelector('.header').classList.remove('header--active')
                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                modalOverlay.classList.remove('modal-overlay--active')
            });
        });
    }
});
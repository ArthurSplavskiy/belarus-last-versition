class Header {
    constructor () {
        this.element = document.querySelector('.header')
        this.pageMenu = document.querySelector('.page-menu')
        this.сursor = document.querySelector('.c-cursor')
        this.cursorSlider = document.querySelector('.c-cursor__slider')

        this.cards = this.pageMenu.querySelectorAll('.page-menu__card')
        this.cardsTitle = this.pageMenu.querySelectorAll('.page-menu__card-title')
        this.slider = this.pageMenu.querySelector('.page-menu__slider')
        this.sliderWrapper = this.slider.querySelector('.page-menu__slider-wrapper')

        this.split = new Split()

        // last
        this.init()
    }

    init () {

        //this.splitCardsTitle()
        this.menu()
        this.menuSlider()
    }

    menuOpen(event) {
        const { target } = event
        
        if(target.closest('.burger') || target.classList.contains('burger')) {
            this.burger.classList.toggle('_active')
        }

        if(this.burger.classList.contains('_active')) { // menu open
            body_lock_add(0, 'menu')
            
            this.menuTimeline.play()

            this.element.classList.add('menu-open')

            this.addEventListeners()
        } else { // menu close
            body_lock_remove(0, 'menu')

            this.closeMenu()
        }
    }

    menu () {
        this.burger = this.element.querySelector('.burger')

        this.menuTimeline = gsap.timeline()

        this.menuTimeline.to(this.pageMenu, {
            y: '0'
        })
        this.menuTimeline.to(this.slider, {
            duration: 0.5,
            opacity: 1
        })
        // this.menuTimeline.fromTo(this.titleLines.chars, {
        //     y: '100%',
        //     opacity: 0
        // }, {
        //     duration: 1,
        //     ease: Power1.easeOut,
        //     //stagger: 0.09,
        //     y: '0%',
        //     opacity: 1
        // }, '-=0.5')
        this.menuTimeline.pause()

        gsap.set(this.pageMenu, { y: '-100%' })
        gsap.set(this.slider, { opacity: 0 })

        this.burger.onclick = event => this.menuOpen(event)
    }

    menuSlider () {

        const swiper = new Swiper('.swiper', {
            init: true,
            slidesPerView: 4,
            spaceBetween: 40,
            grabCursor: true,
            speed: 800,
            grabCursor: true,

            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },

            scrollbar: {
              el: '.swiper-scrollbar',
              draggable: true
            },

            breakpoints: {
                320: {
                  slidesPerView: 3,
                  spaceBetween: 20
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40
                }
            }
        })

        swiper.on('resize', () => {
            if(window.innerWidth <= 520) {
                swiper.disable()
            } else {
                swiper.enable()
            }
        })

        swiper.on('touchMove', (e) => {
            // this.сursor.style.top = e.touches.currentY + 'px';
            // this.сursor.style.left = e.touches.currentX + 'px';

            gsap.to(this.сursor, .5, {
                top:  e.touches.currentY,
		        left: e.touches.currentX
            })
        })
        swiper.on('touchStart', () => {
            this.sliderWrapper.classList.add('grabbing')
        })
        swiper.on('touchEnd', () => {
            this.sliderWrapper.classList.remove('grabbing')
        })
        
    }

    splitCardsTitle () {
        this.titleLines = this.split.splitText(this.cardsTitle, {
            type: "lines,words,chars",
            linesClass: "split-child"
        })
        // this.titleParentLines = this.split.splitText(this.cardsTitle, {
        //     type: "lines",
        //     linesClass: "split-parent"
        // })
    }

    anchorsTransition (e) {
        let timelineSection = 8000
        let historySection = 30000
        let incidentSection = 50000
        let blogSection = 55000

        if(window.innerWidth <= 768) {
            timelineSection = 4000
            historySection = 10000
            incidentSection = 14000
            blogSection = 18000
        }

        if(e.target.classList.contains('page-menu__card') || e.target.closest('.page-menu__card')) {
            const el = e.target.closest('.page-menu__card').dataset

            switch(el.link) {
                case 's-timeline': 
                    gsap.to(window, { duration: 0.2, scrollTo: {y: timelineSection} })
                    break;
                case 's-history': 
                    gsap.to(window, { duration: 0.2, scrollTo: {y: historySection} })
                    break;
                case 's-incident': 
                    gsap.to(window, { duration: 0.2, scrollTo: {y: incidentSection} })
                    break;
                case 's-blog': 
                    gsap.to(window, { duration: 0.2, scrollTo: {y: blogSection} })
                    break;
            }
        }

        this.closeMenu()
    }

    addEventListeners () {
        this.cards.forEach(card => {
            card.addEventListener('click', this.anchorsTransition.bind(this))
        })
    }

    removeEventListeners () {
        this.cards.forEach(card => {
            card.removeEventListener('click', this.anchorsTransition.bind(this))
        })
    }

    closeMenu () {
        this.burger.classList.remove('_active')
        this.menuTimeline.reverse()
        this.element.classList.remove('menu-open')
        this.removeEventListeners()
        body_lock_remove(0, 'menu')
    }

    onResize () {
        // if(this.titleLines) {
        //     this.titleLines.revert()
        // }
        //this.titleParentLines.revert()
    }

}
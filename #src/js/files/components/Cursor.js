class Cursor {
    constructor() {
        this.element = document.querySelector('.c-cursor')
        this.pageElement = document.querySelector('.page-cursor')
        this.cursorSlider = this.element.querySelector('.c-cursor__slider')

        this.cursorContainer = document.querySelector('.page-menu .swiper')
        this.controlsContainer = document.querySelector('.page-menu__slider-controls')

        this.activeCursorLinks = document.querySelectorAll('._cursor-pointer')

        this.init()
    }

    initCursor (e) {
        let x = e.clientX;
        let y = e.clientY;
        this.element.style.left = x + 'px';
        this.element.style.top = y + 'px';

        // gsap.to(this.element, .5, {
        //     top:  y,
        //     left: x
        // })

        if(this.element.classList.contains('above-slider')) {
            gsap.to(this.element, .5, {
                top:  y,
                left: x
            })

            if(x < (window.innerWidth / 2)) {
                if(this.cursorSlider.classList.contains('right')) {
                    this.cursorSlider.classList.remove('right')
                }
            } else {
                if(!this.cursorSlider.classList.contains('right')) {
                    this.cursorSlider.classList.add('right')
                }
            }
        }
        
    }

    setCursorSwiper () {
        this.element.classList.add('above-slider')
    }
    removeCursorSwiper () {
        this.element.classList.remove('above-slider')
    }

    setCursorPointer () {
        this.cursorTimeline.play()
    }
    removeCursorPointer () {
        this.cursorTimeline.reverse()
    }

    init () {
        this.cursorTimeline = gsap.timeline()
        this.cursorTimeline.to(this.pageElement, {
            scale: 1.4,
            rotate: '225deg'
        })
        this.cursorTimeline.pause()

        document.addEventListener('mousemove', this.initCursor.bind(this));
        this.cursorContainer.addEventListener('mouseenter', this.setCursorSwiper.bind(this));
        this.cursorContainer.addEventListener('mouseleave', this.removeCursorSwiper.bind(this));

        this.controlsContainer.addEventListener('mouseenter', this.removeCursorSwiper.bind(this));
        this.controlsContainer.addEventListener('mouseleave', this.setCursorSwiper.bind(this));

        this.activeCursorLinks.forEach(link => {
            link.addEventListener('mouseenter', this.setCursorPointer.bind(this));
            link.addEventListener('mouseleave', this.removeCursorPointer.bind(this));
        })
    }
}
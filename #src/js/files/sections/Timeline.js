class TimelineSection {
    constructor (element) {
        this.element = element

        /*
            * Section elements
        */
        this.elementWrapper = this.element.querySelector('.timeline-section__wrapper')
        this.elementScroll = this.element.querySelector('.scroll-container')
        this.elementScrollBg = this.element.querySelector('.scroll-container__bg')
        this.images = this.element.querySelectorAll('.parallax-item__img')
        this.text = this.element.querySelectorAll('.parallax-item_text p')

        /*
            * Document elements
        */
        this.scrollIndicatorArrow = document.querySelectorAll('.scroll-indicator path, .scroll-indicator rect')
        this.histotySection = document.querySelector('.history-section')
    
        /*
            * Classes
        */
        this.split = new Split()

        /*
            * Timeline End Points
        */
        this.timelineSizes = {
            endDesktop: 30000,
            endMobile: 10000
        }

        this.init()
    }

    init () {
        this.scroll()
        //this.Animation()

        // hide after init section animation
        hide(this.element.parentElement)
    }

    scroll () {

        ScrollTrigger.matchMedia({

            /*
                * Seaction mobile timeline
            */
            "(max-width: 768px)": () => {

                this.timelineMob = gsap.timeline({ defaults: {ease: 'none'} })

                ScrollTrigger.create({
                    trigger: this.element,
                    animation: this.timelineMob,
                    start: () => 4000,
                    end: () => `${this.timelineEnd || this.timelineSizes.endDesktop}px 100%`,
                    pin: true, 
                    scrub: true,
                    invalidateOnRefresh: true,

                    // hide after live section and revert
                    onLeave: () => hide(this.element),
                    onEnterBack: () => show(this.element)
                });

                /*
                    * Scroll section animatoin
                */
                this.timelineMob.to(this.element, {
                    duration: 0.1,
                    y: () => - (this.element.scrollHeight + 200),
                    onStart: () => {
                        this.element.classList.add('wc-transform')
                        show(this.histotySection.parentElement)
                        asyncLoadImage(this.histotySection)
                    },
                    onComplete: () => this.element.classList.remove('wc-transform')
                })

                /*
                    * Parallax years
                */
                this.timelineMob.to(this.elementScrollBg, {
                    duration: 0.1,
                    y: () => 1000,
                    onStart: () => this.elementScrollBg.classList.add('wc-transform'),
                    onComplete: () => this.elementScrollBg.classList.remove('wc-transform')
                }, '<')

            },

            /*
                * Seaction desktop timeline
            */
            "(min-width: 769px)": () => {

                this.timeline = gsap.timeline({ defaults: {ease: 'none'} })

                ScrollTrigger.create({
                    trigger: this.element,
                    animation: this.timeline,
                    start: () => 8000,
                    end: () => `${this.timelineEnd || this.timelineSizes.endDesktop}px 100%`,
                    pin: true, 
                    scrub: true,
                    invalidateOnRefresh: true,

                    // hide after live section and revert
                    onLeave: () => hide(this.element),
                    onEnterBack: () => show(this.element)
                });
                
                this.timeline.to(this.scrollIndicatorArrow, {
                    duration: 0,
                    fill: '#ffffff'
                })

                /*
                    * Scroll section animatoin
                */
                this.timeline.fromTo(this.elementScroll, {
                    x: 0,
                }, {
                    x: () => - (this.elementScroll.scrollWidth - window.innerWidth),
                    onStart: () => this.elementScroll.classList.add('wc-transform'),
                    onComplete: () => this.elementScroll.classList.remove('wc-transform')
                })
        
                /*
                    * Parallax years
                */
                this.timeline.fromTo(this.elementScrollBg, {
                    x: 0,
                    ease: Power3.easeIn,
                }, {
                    x: () => (this.elementScroll.scrollWidth / 4),
                    onStart: () => this.elementScrollBg.classList.add('wc-transform'),
                    onComplete: () => {
                        this.elementScrollBg.classList.remove('wc-transform')

                        // show next section
                        show(this.histotySection.parentElement)
                        asyncLoadImage(this.histotySection)
                    }
                }, '<')

                // timeline.to(parallaxImageText, {
                //     x: 40,
                //     onStart: () => parallaxImageText.classList.add('wc-transform'),
                //     onComplete: () => parallaxImageText.classList.remove('wc-transform')
                // }, '<')
                // timeline.to(parallaxImages, {
                //     x: -40,
                //     onStart: () => parallaxImages.classList.add('wc-transform'),
                //     onComplete: () => parallaxImages.classList.remove('wc-transform')
                // }, '<')

                // this.timeline.to(this.element, {
                //     duration: 0.02,
                // })

                /*
                    * Section move top animation
                */
                this.timeline.to(this.element, {
                    duration: 0.1,
                    y: () => - window.innerHeight,
                    onStart: () => this.element.classList.add('wc-transform'),
                    onComplete: () => this.element.classList.remove('wc-transform')
                })

                /*
                    * z-index
                */
                this.pinSpacer = this.element.parentElement
                let pinSpacerZindex = this.pinSpacer.style.zIndex
                this.timeline.to('.pin-spacer', {
                    duration: 0,
                    zIndex: pinSpacerZindex
                })
                this.timeline.call(_ => {
                    this.pinSpacer.style.zIndex = -1;
                })

            }

        })

    }

    /*
        * onScreen Observer Animation
    */
    Animation () {
        this.observer = new Observer(this.images, this.imageAnimationIn, this.imageAnimationOut)
        this.observerText = new Observer(this.text, this.textAnimationIn, this.textAnimationOut)
    }

    imageAnimationIn (el) {
        if(!el.classList.contains('_reveal')) {
            el.classList.add('_reveal')
        }
    }

    imageAnimationOut (el) {
        el.classList.remove('_reveal')
    }

    textAnimationIn (el) {
        if(!el.classList.contains('is-view')) {
            el.classList.add('is-view')
        }
    }

    textAnimationOut (el) {
        el.classList.remove('is-view')
    }


    onResize () {
        if(window.innerWidth <= 768) {
            this.timelineEnd = this.timelineSizes.endMobile
        } else {
            this.timelineEnd = this.timelineSizes.endDesktop
        }
    }

}
class Preloader {
    constructor (element) {
        this.element = element
        this.elementBg = this.element.querySelector('.preloader__bg')
        this.preloaderCover = document.querySelector('.preloader-cover')
        this.closeSlide = this.element.querySelector('.preloader__slide:last-child')
        this.closeTitle = this.closeSlide.querySelector('.preloader__title')
        this.closeButton = this.closeSlide.querySelector('.preloader__button')

        this.heroTitles = document.querySelectorAll('.hero-composition__title')
        this.heroDescriptions = document.querySelectorAll('.hero-composition__description')
        this.burger = document.querySelector('.burger')

        this.split = new Split()
        this.animation = new Animation()
    }

    init () {
        
        //this.heroTitlesAnimation()
        this.close()
        this.slider()
        this.timer()
    }

    slider () {
        this.sliderEl = this.element.querySelector('.preloader__slider')
        const slides = this.sliderEl.querySelectorAll('.preloader__slide')

        this.lastSlideTimeline = gsap.timeline({ defaults: { stagger: 0.1, duration: 0.6 } })

        // gsap.set(this.closeTitleLinesChild.lines, {
        //     y: '100%',
        //     opacity: 0
        // })
        // this.lastSlideTimeline.to(this.closeTitleLinesChild.lines, {
        //     y: '10%',
        //     opacity: 1
        // })
        
        //this.lastSlideTimeline.pause()

        slides[0].classList.add('_active')

        slides[0].style.cssText = `
            animation-name: animationEnd;
            animation-duration: 2s;
            animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
            animation-fill-mode: forwards;
            animation-delay: 6s;
        `

        slides[1].style.cssText = `
            animation-name: animationEndSecond;
            animation-duration: 2s;
            animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
            animation-fill-mode: forwards;
            animation-delay: 10s;
        `

        /*
          * Slides animation
        */
        const firstSlideDelay = 7000
        const secondSlideDelay = 12000

        let firstSlideAnimation = () => {
            slides[0].classList.remove('_active')
            slides[1].classList.add('_active')

            this.animation.animationTextIn(this.splitDateText.chars)
        }

        let secondSlideAnimation = () => {
            slides[1].classList.remove('_active')
            slides[2].classList.add('_active')

            //this.lastSlideTimeline.play()
        } 

        setTimeout(firstSlideAnimation, firstSlideDelay)
        setTimeout(secondSlideAnimation, secondSlideDelay)
    }

    timer () {
        const timer = this.element.querySelector('.timer')
        const timerYearField = timer.querySelector('[data-independence-year] span')
        const timerMonthField = timer.querySelector('[data-independence-month] span')
        const timerDayField = timer.querySelector('[data-independence-day] span')

        const nowDate = new Date()
        const nowDateYear = nowDate.getFullYear()
        const nowDateMonth = nowDate.getMonth()
        const nowDateDay = nowDate.getUTCDate()

        const independenceYear = 1991
        const independenceMonth = 7
        const independenceDay = 25

        let outYear
        let outDay
        let outMonth

        if(nowDateMonth < independenceMonth) {
            outYear = Math.abs((nowDateYear - independenceYear) - 1)
        } else {
            outYear = Math.abs(nowDateYear - independenceYear)
        }
        if(nowDateDay < independenceDay) {
            outMonth = Math.abs((nowDateMonth - independenceMonth) - 1)
            outDay = Math.abs(nowDateDay + 6)
        } else {
            outMonth = Math.abs(nowDateMonth - independenceMonth)
            outDay = Math.abs(nowDateDay - independenceDay)
        }

        const setZero = (num) => {
            if(num) {
                return num < 10 ? `0${num}` : num
            } else {
                return '00'
            }
        }

        timerYearField.innerHTML = setZero(outYear)
        timerMonthField.innerHTML = setZero(outMonth)
        timerDayField.innerHTML = setZero(outDay)

        const splitArray = [timerYearField, timerMonthField, timerDayField]
        this.splitDateText = this.split.splitText(splitArray)
    }

    close () {
        // this.closeTitleLines = this.split.splitText(this.closeTitle, { type: "lines,words" })
        // this.closeTitleLinesChild = this.split.splitText(this.closeTitleLines.lines, {
        //     linesClass: "split-parent"
        // })

        gsap.set(this.element, { transformOrigin: '100% 100%' })

        this.timelineClose = gsap.timeline({ defaults: { duration: 1, ease: Power2.easeIn } })

        const clickHandler = () => {
            //this.lastSlideTimeline.reverse()

            this.timelineClose.to(this.element, {
                yPercent: -100,
                onStart: () => this.element.classList.add('wc-transform'),
                onComplete: () => this.element.classList.remove('wc-transform')
            }, '+=1')

            this.timelineClose.call(_ => {
                this.element.remove()

                // gsap.to(this.heroTitlesLine.lines, {
                //     duration: 1,
                //     ease: Power1.easeOut,
                //     stagger: 0.1,
                //     y: '0%',
                //     opacity: 1
                // })

                // gsap.to(this.heroDescriptions, {
                //     duration: 2,
                //     ease: Power1.easeOut,
                //     autoAlpha: 1
                // })

                body_lock_remove(0)
                this.burger.classList.remove('disable')
            })
        }

        this.closeButton.onclick = clickHandler
    }

    heroTitlesAnimation () {
        this.heroTitlesLine = this.split.splitText(this.heroTitles, {
            type: "lines,words,chars",
            linesClass: "split-child"
        })
        this.heroTitlesParentLine = this.split.splitText(this.heroTitles, {
            linesClass: "split-parent"
        })

        gsap.set(this.heroTitlesLine.lines, {
            y: '100%',
            opacity: 0
        })
        gsap.set(this.heroDescriptions, {
            autoAlpha: 0
        })
    }

    onResize () {
        // this.heroTitlesLine.revert()
        // this.heroTitlesParentLine.revert()
        // this.closeTitleLines.revert()
        // this.splitDateText.revert()

        // this.heroTitlesAnimation()
    }

}
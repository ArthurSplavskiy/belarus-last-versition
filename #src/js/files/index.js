class App {
    constructor () {
        this.addEventListeners()
    }

    init () {
        /*
          * Settings
        */
        gsap.config({
            force3D: true,
            nullTargetWarn: false,
            trialWarn: false,
            units: {left: "%", top: "%", rotation: "rad"}
        });

        /*
          * Elements
        */
        this.$heroSection = document.querySelector('.hero-section')
        this.$timelineSection = document.querySelector('.timeline-section')
        this.$histotySection = document.querySelector('.history-section')
        this.$incidentSection = document.querySelector('.incident-section')
        this.$header = document.querySelector('header.header')
        this.$blogSection = document.querySelector('.blog-section')

        /*
          * Components
        */
        if (this.$header) {
            this.header = new Header()
        }
        this.animation = new Animation()
        //this.cursor = new Cursor()

        /*
          * Sections
        */
        if (this.$heroSection) {
            this.heroSection = new HeroSection(this.$heroSection)
        }
        if (this.$timelineSection) {
            this.timelineSection = new TimelineSection(this.$timelineSection)
        }
        if (this.$histotySection) {
            this.historySection = new HistorySection(this.$histotySection)
        }
        if (this.$incidentSection) {
            this.incidentSection = new IncidentSection(this.$incidentSection)
        }
        if (this.$blogSection) {
            this.blogSection = new BlogSection(this.$blogSection)
        }
        
        /*
          * Functions
        */
       //this.asyncLoad()
    }

    pageLoad () {
        this.onResize()

        /*
          * Elements
        */
        this.$preloader = document.querySelector('.preloader')
        this.$preloaderCover = document.querySelector('.preloader-cover')

        /*
          * Preloader cover
        */
        if (this.$preloader) {
            this.preloader = new Preloader(this.$preloader)
        }
        
        const preloaderCoverTimeline = gsap.timeline({ defaults: {delay: 1} })
        preloaderCoverTimeline.fromTo(this.$preloaderCover, { autoAlpha: 1 }, { autoAlpha: 0 })
        preloaderCoverTimeline.call(_ => this.$preloaderCover.remove())

        if (this.preloader) {
            this.preloader.init()
        }
    }

    contentDomLoad () {
        this.init()
        
        this.removeEventListeners()
    }

    onResize () {

        if (this.header) {
            this.header.onResize()
        }
        if (this.preloader) {
            this.preloader.onResize()
        }
        if (this.heroSection) {
            this.heroSection.onResize()
        }
        if (this.timelineSection) {
            this.timelineSection.onResize()
        }
        if (this.historySection) {
            this.historySection.onResize()
        }
        if (this.incidentSection) {
            this.incidentSection.onResize()
        }
        if (this.blogSection) {
            this.blogSection.onResize()
        }

        /*
          * Scroll Trigger recalculate
        */
        ScrollTrigger.refresh(true)
        ScrollTrigger.addEventListener('refresh', () => {
            ScrollTrigger.update()
        })
    }

    /*
        * Events
    */
    addEventListeners () {
        window.addEventListener('load', this.pageLoad.bind(this))
        window.addEventListener('resize', this.onResize.bind(this))
        document.addEventListener('DOMContentLoaded', this.contentDomLoad.bind(this))
    }

    removeEventListeners () {
        window.removeEventListener('load', this.pageLoad.bind(this))
        document.removeEventListener('DOMContentLoaded', this.contentDomLoad.bind(this))
    }

    /*
        * Image on screen load
    */
    asyncLoad () {
        const images = document.querySelectorAll('[data-src]')

        this.preloadImages = Array.from(images).map(image => {
            return new AsyncLoad(image)
        })
    }
}

new App()
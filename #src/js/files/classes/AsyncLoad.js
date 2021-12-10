 class AsyncLoad {
    constructor (element) {
        this.element = element

        //this.createObserver()
    }

    createObserver () {
        this.observer = new window.IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!this.element.src) {
                        this.element.src = this.element.getAttribute('data-src')
                        this.element.onload = _ => {
                            this.element.classList.add('loaded')
                        }
                    }
                }
            })
        })

        this.observer.observe(this.element)
    }
}

const asyncLoadImage = (section) => {
    section.classList.add('load-img')

    if(section.classList.contains('load-img')) {
        const images = section.querySelectorAll('[data-src]')

        images.forEach(img => {
            
            if (!img.src) {
                img.src = img.getAttribute('data-src')
                img.removeAttribute('data-src')
            }
        })
    }
}
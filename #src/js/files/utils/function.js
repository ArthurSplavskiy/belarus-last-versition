let hide = (el) => {
    if(!el.classList.contains('d-none')) {
        el.classList.add('d-none')
    }
}
let show = (el) => {
    if(el.classList.contains('d-none')) {
        el.classList.remove('d-none')
    }
}
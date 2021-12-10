let unlock = true;

function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay, mod = '') {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			
			if (mod) {
				body.classList.remove(`${mod}-lock`);
				if (body.classList.contains('_lock')) {
					body.classList.remove("_lock");
				}
			} else {
				body.classList.remove("_lock");
			}

		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay, mod = '') {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

		if (mod) {
			body.classList.add(`${mod}-lock`);
		} else {
			body.classList.add("_lock");
		}

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}

body_lock(0)
gsap.to(window, { scrollTo: {y: 0} })


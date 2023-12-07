const articles = document.querySelectorAll('article');

let backgroundsLoaded = 0;

function loadBackground() {
	articles.forEach(article => {
		let y = article.offsetTop - window.scrollY - window.innerHeight;

		if (y <= 0 && !article.classList.contains('loaded')) {
			backgroundsLoaded += 1;
			article.style.backgroundImage = `url(${article.dataset.background})`;

			article.classList.add('loaded');
		};

		if (backgroundsLoaded == articles.length)
			window.removeEventListener('scroll', loadBackground);
	});
}

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('navButton').addEventListener('click', e => {
		e.preventDefault();

		document.body.classList.toggle('menu');
	});

	document.querySelectorAll('nav a').forEach(nav => {
		nav.addEventListener('click', e => {
			e.preventDefault();

			document.querySelector(nav.getAttribute('href')).scrollIntoView({
				behavior: 'smooth'
			});

			if (window.innerWidth <= 600)
				document.body.classList.remove('menu');
		});
	});

	document.querySelector('main').addEventListener('click', () => {
		if (document.body.classList.contains('menu'))
			document.body.classList.remove('menu');
	});
});

window.addEventListener('load', loadBackground);
window.addEventListener('scroll', loadBackground);
const articles = document.querySelectorAll('article');

var backgroundsLoaded = 0;

function loadBackground() {
	articles.forEach(article => {
		let y = article.offsetTop - window.scrollY - window.innerHeight;

		if (y <= 0 && article.classList.length === 0) {
			article.classList.add('loading');

			let image = new Image();

			image.addEventListener('load', () => {
				article.style.backgroundImage = `url(${article.dataset.background})`;
				article.classList.replace('loading', 'loaded');

				backgroundsLoaded += 1;
			})

			image.src = article.dataset.background;
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
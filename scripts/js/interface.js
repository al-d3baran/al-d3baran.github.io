var articles;
var backgroundsLoaded = 0;

function loadBackgrounds() {
	articles.forEach(article => {
		const div = article.querySelector('.background');
		const y = article.offsetTop - window.scrollY - window.innerHeight;

		if (y <= 0 && article.classList.length === 0) {
			article.classList.add('loading');

			let image = new Image();

			image.addEventListener('load', () => {
				div.style.backgroundImage = `url(${image.src})`;
				article.classList.replace('loading', 'loaded');

				backgroundsLoaded += 1;
			})

			image.src = div.dataset.background;
		};

		if (backgroundsLoaded == articles.length)
			window.removeEventListener('scroll', loadBackgrounds);
	});
}

document.addEventListener('DOMContentLoaded', () => {
	articles = document.querySelectorAll('article');

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

	loadBackgrounds();
	Parallax.initialize(document.querySelectorAll('.background'));
	Lightbox.initialize(document.querySelectorAll('img'));
});

window.addEventListener('scroll', loadBackgrounds);
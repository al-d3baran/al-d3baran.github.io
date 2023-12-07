class Parallax {
	static initialize(articles) {
		const update = () => {
			articles.forEach(article => {
				const yOffset = Math.round(article.getBoundingClientRect().top / 9 * 100);
				article.style.backgroundPosition = `center ${yOffset / 100}px`;
			});

			requestAnimationFrame(update);
		}

		const debounce = f => {
			let timeout;

			return () => {
				const context = this,
					args = arguments;

				const wait = () => {
					timeout = null;
					f.apply(context, args);
				}

				clearTimeout(timeout);
				timeout = setTimeout(wait, 16);
			}
		}

		const debounced = debounce(update);

		debounced();
	}
}
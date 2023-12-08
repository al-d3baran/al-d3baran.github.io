class Parallax {
	static initialize(backgrounds) {
		const update = () => {
			backgrounds.forEach(background => {
				const yOffset = Math.round(background.getBoundingClientRect().top / 9 * 100);
				background.style.backgroundPosition = `center ${yOffset / 100}px`;
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
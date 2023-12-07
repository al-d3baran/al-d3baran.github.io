class Lightbox {
	static initialize(images) {
		const getScaledSize = size => {
			const windowWidth = window.innerWidth;
			const windowHeight = window.innerHeight;
			const imageRatio = size.width / size.height;

			if (size.width > windowWidth || size.height > windowHeight) {
				if (size.width > windowWidth) {
					size.width = windowWidth;
					size.height = windowWidth / imageRatio;
				}

				if (size.height > windowHeight) {
					size.height = windowHeight;
					size.width = windowHeight * imageRatio;
				}
			}

			if (windowWidth === size.width || windowHeight === size.height) {
				size.width -= size.width * 0.1;
				size.height -= size.height * 0.1;
			}

			return size;
		}

		const getImageSize = (src, callback) => {
			const image = new Image();

			image.addEventListener('load', () => {
				callback({
					width: image.naturalWidth,
					height: image.naturalHeight
				});
			});

			image.src = src;
		}

		const create = src => {
			const div = document.createElement('div');
			div.id = 'lightbox';
			div.style.backgroundImage = `url(${src})`;

			return div;
		}

		const close = overlay => {
			overlay.classList.remove('open');
		}

		const remove = overlay => {
			document.body.removeChild(overlay);
		}

		const open = image => {
			const src = image.dataset.image;
			const overlay = create(src);

			overlay.addEventListener('click', () => {
				close(overlay);
			});

			overlay.addEventListener('transitionend', () => {
				if (!overlay.classList.contains('open'))
					remove(overlay);
			});

			getImageSize(src, size => {
				const sz = getScaledSize({ ...size });
				overlay.style.backgroundSize = `${Math.floor(sz.width)}px ${Math.floor(sz.height)}px`;

				document.body.appendChild(overlay);

				void overlay.offsetWidth;
				overlay.classList.add('open');
			});
		}

		images.forEach(image => {
			image.addEventListener('click', () => {
				open(image);
			});
		});
	}
}
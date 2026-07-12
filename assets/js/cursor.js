/*
	Custom cursor — a small dot plus a trailing ring that reacts to
	interactive elements. Doesn't touch any existing hover styles,
	it just draws on top of them. Skipped entirely on touch devices.
*/

(function () {
	'use strict';

	if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches)
		return;

	document.body.classList.add('has-custom-cursor');

	var dot = document.createElement('div');
	dot.className = 'cursor-dot';

	var ring = document.createElement('div');
	ring.className = 'cursor-ring';

	document.body.appendChild(dot);
	document.body.appendChild(ring);

	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	var mouseX = -100, mouseY = -100,
		ringX = -100, ringY = -100;

	var interactiveSelector = 'a, button, .button, input, textarea, select, [role="button"], .badge-item';

	document.addEventListener('mousemove', function (e) {
		mouseX = e.clientX;
		mouseY = e.clientY;
		dot.style.transform = 'translate3d(' + mouseX + 'px,' + mouseY + 'px,0)';
		dot.style.opacity = '1';
		ring.style.opacity = '0.8';

		if (reduceMotion)
			ring.style.transform = 'translate3d(' + mouseX + 'px,' + mouseY + 'px,0)';
	});

	document.addEventListener('mousedown', function () {
		dot.classList.add('is-active');
		ring.classList.add('is-active');
	});

	document.addEventListener('mouseup', function () {
		dot.classList.remove('is-active');
		ring.classList.remove('is-active');
	});

	document.addEventListener('mouseover', function (e) {
		if (e.target.closest && e.target.closest(interactiveSelector))
			ring.classList.add('is-hovering');
	});

	document.addEventListener('mouseout', function (e) {
		if (e.target.closest && e.target.closest(interactiveSelector))
			ring.classList.remove('is-hovering');
	});

	document.addEventListener('mouseleave', function () {
		dot.style.opacity = '0';
		ring.style.opacity = '0';
	});

	document.addEventListener('mouseenter', function () {
		dot.style.opacity = '1';
		ring.style.opacity = '0.8';
	});

	if (!reduceMotion) {
		(function loop() {
			ringX += (mouseX - ringX) * 0.18;
			ringY += (mouseY - ringY) * 0.18;
			ring.style.transform = 'translate3d(' + ringX + 'px,' + ringY + 'px,0)';
			requestAnimationFrame(loop);
		})();
	}
})();

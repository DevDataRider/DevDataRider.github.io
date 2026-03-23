/*
	Stellar by HTML5 UP
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
	breakpoints({
		xlarge:   [ '1281px',  '1680px' ],
		large:    [ '981px',   '1280px' ],
		medium:   [ '737px',   '980px'  ],
		small:    [ '481px',   '736px'  ],
		xsmall:   [ '361px',   '480px'  ],
		xxsmall:  [ null,      '360px'  ]
	});

	// Play initial animations on page load.
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// ==========================================
	// Header scroll effect (AGREGADO)
	// ==========================================

	var $header = $('#header');

	$window.on('scroll', function() {

		var scroll = $window.scrollTop();

		if (scroll > 120) {
			$header.css({
				'opacity': '0',
				'transform': 'translateY(-40px)',
				'transition': 'opacity 1s ease, transform 1s ease'
			});
		} else {
			$header.css({
				'opacity': '1',
				'transform': 'translateY(0)',
				'transition': 'opacity 1s ease, transform 1s ease'
			});
		}

	});

	// Nav.
	var $nav = $('#nav');

	if ($nav.length > 0) {

		$main.scrollex({
			mode: 'top',
			enter: function() {
				$nav.addClass('alt');
			},
			leave: function() {
				$nav.removeClass('alt');
			},
		});

		var $nav_a = $nav.find('a');

		$nav_a
			.scrolly({
				speed: 1000,
				offset: function() { return $nav.height(); }
			})
			.on('click', function() {

				var $this = $(this);

				if ($this.attr('href').charAt(0) != '#')
					return;

				$nav_a
					.removeClass('active')
					.removeClass('active-locked');

				$this
					.addClass('active')
					.addClass('active-locked');

			})
			.each(function() {

				var $this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				if ($section.length < 1)
					return;

				$section.scrollex({
					mode: 'middle',
					initialize: function() {

						if (browser.canUse('transition'))
							$section.addClass('inactive');

					},
					enter: function() {

						$section.removeClass('inactive');

						if ($nav_a.filter('.active-locked').length == 0) {

							$nav_a.removeClass('active');
							$this.addClass('active');

						}

						else if ($this.hasClass('active-locked'))
							$this.removeClass('active-locked');

					}
				});

			});

	}

	// Scrolly.
	$('.scrolly').scrolly({
		speed: 1000
	});

})(jQuery);
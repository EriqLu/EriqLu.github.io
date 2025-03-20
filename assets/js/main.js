(function($) {

	var	$window = $(window),
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

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
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

	// ===============================
	// CONTACT FORM FUNCTIONALITY (NEW)
	// ===============================
	document.addEventListener("DOMContentLoaded", function() {
		const contactButtons = document.querySelectorAll(".contact-btn");
		const contactInfoSection = document.getElementById("contact-info");
	
		contactButtons.forEach(button => {
			button.addEventListener("click", function() {
				// Make the Contact Info section visible
				contactInfoSection.classList.remove("hidden");
	
				// Scroll smoothly to the Contact Info section
				window.scrollTo({ top: contactInfoSection.offsetTop, behavior: "smooth" });
			});
		});
	});
	

	// document.addEventListener("DOMContentLoaded", function() {
	// 	const contactButtons = document.querySelectorAll(".contact-btn");
	// 	const contactForm = document.getElementById("contact-form");
	// 	const subjectInput = document.getElementById("subject");
	
	// 	// Show form when Contact Me button is clicked
	// 	contactButtons.forEach(button => {
	// 		button.addEventListener("click", function() {
	// 			const serviceTitle = this.closest(".resume-box").querySelector("h3").innerText;
	// 			subjectInput.value = `Inquiry about: ${serviceTitle}`;
	// 			contactForm.classList.remove("hidden");
	// 			window.scrollTo({ top: contactForm.offsetTop, behavior: "smooth" });
	// 		});
	// 	});
	
	// 	// Handle form submission
	// 	document.getElementById("contactForm").addEventListener("submit", function(event) {
	// 		event.preventDefault(); // Prevent default form submission
	
	// 		const formData = new FormData(this);
			
	// 		// Validate email input
	// 		const emailInput = document.getElementById("email").value;
	// 		if (!emailInput.includes("@")) {
	// 			alert("Please enter a valid email address.");
	// 			return;
	// 		}
	
	// 		fetch("https://formsubmit.co/1234eriq@gmail.com", {
	// 			method: "POST",
	// 			body: formData
	// 		})
	// 		.then(response => response.text()) // Read response as text
	// 		.then(data => {
	// 			if (data.includes("success") || data.toLowerCase().includes("thank you")) { 
	// 				alert("Message sent successfully! ✅");
	// 				contactForm.reset();
	// 				contactForm.classList.add("hidden"); // Hide form after sending
	// 			} else {
	// 				throw new Error("Unexpected response from server");
	// 			}
	// 		})
	// 		.catch(error => {
	// 			console.error("Error:", error);
	// 			alert("Failed to send message. Please check FormSubmit setup.");
	// 		});
	// 	});
	// });

	
})(jQuery);

$(document).ready(function () {
  $('#deploy').click(function () {
    window.location.href = 'https://app.netlify.com/start/deploy?repository=https://github.com/SalsaBoy990/static-site-express'
  })

  // Add smooth scrolling to all links
  $('a[href="#get-started"], a[href="#contact-me"]').on('click', function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== '') {
      // Prevent default anchor click behavior
      event.preventDefault()

      // Store hash
      var hash = this.hash

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash
      })
    } // End if
  })
})

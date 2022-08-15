if (window.netlifyIdentity) {
  window.netlifyIdentity.on('init', function (user) {
    if (!user) {
      window.netlifyIdentity.on('login', function () {
        document.location.href = '/admin/'
      })
    }
  })

   window.netlifyIdentity.on("logout", function () {
     document.location.href = "/";
   });

   window.netlifyIdentity.on("error", function (err) {
     console.error("Error", err);
     document.location.href = "/";
   });
}

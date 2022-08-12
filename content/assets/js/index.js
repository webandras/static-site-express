(function () {
  function onLoad() {
    var deployBtn = document.getElementById('deploy')
    if (deployBtn) {
      deployBtn.addEventListener('click', function () {
        window.location.href = 'https://app.netlify.com/start/deploy?repository=https://github.com/SalsaBoy990/static-site-express'
      })
    }
  }
  window.addEventListener('load', onLoad)
})()

import "flowbite";

(function () {
  function onLoad() {
    var deployBtn = document.getElementById("deploy");
    if (deployBtn) {
      deployBtn.addEventListener("click", function () {
        window.location.href = "https://app.netlify.com/start/deploy?repository=https://github.com/SalsaBoy990/static-site-express";
      });
    }

    //toggleDarkMode();
  }
  window.addEventListener("load", onLoad);
})();

function toggleDarkMode() {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  // Whenever the user explicitly chooses light mode
  localStorage.theme = "light";

  // Whenever the user explicitly chooses dark mode
  localStorage.theme = "dark";

  // Whenever the user explicitly chooses to respect the OS preference
  localStorage.removeItem("theme");
}

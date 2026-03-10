(function () {
  try {
    var redirectPath = sessionStorage.getItem("spa_redirect");
    if (redirectPath) {
      sessionStorage.removeItem("spa_redirect");
      if (location.pathname === "/" && redirectPath.charAt(0) === "/") {
        history.replaceState(null, "", redirectPath);
      }
    }
  } catch (e) {
    /* ignore */
  }
})();

/* Served copy of the legacy admin dashboard script. */
(function () {
  var AUTH_KEY = "yogaAdminSession";
  function getSession() { try { return JSON.parse(localStorage.getItem(AUTH_KEY) || "null"); } catch (_) { return null; } }
  function isDashboard() { return /\/admin\/dashboard\/?$/i.test(location.pathname); }
  function initLogin() {
    var form = document.getElementById("loginForm");
    if (!form) return;
    if (getSession() && getSession().isLoggedIn) { location.href = "/admin/dashboard"; return; }
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var error = document.getElementById("loginError");
      var username = String(form.username.value || "").trim();
      var password = String(form.password.value || "").trim();
      if (username === "nawal" && password === "nawalll") {
        localStorage.setItem(AUTH_KEY, JSON.stringify({ isLoggedIn: true, username: username }));
        location.href = "/admin/dashboard";
      } else if (error) error.textContent = "Invalid username or password.";
    });
  }
  function initDashboard() {
    var session = getSession();
    if (!session || !session.isLoggedIn) { location.href = "/admin"; return; }
    var logout = document.getElementById("logoutBtn");
    if (logout) logout.addEventListener("click", function () { localStorage.removeItem(AUTH_KEY); location.href = "/admin"; });
    var nav = document.getElementById("sidebarNav");
    var summary = document.getElementById("summaryGrid");
    var empty = document.getElementById("emptyState");
    if (nav) nav.innerHTML = '<button class="nav-link active" type="button"><span>Nawal's Care</span><span class="nav-badge">0</span></button><button class="nav-link" type="button"><span>Ice Bath</span><span class="nav-badge">0</span></button><button class="nav-link" type="button"><span>Retreat Requests</span><span class="nav-badge">0</span></button>';
    if (summary) summary.innerHTML = '<button class="summary-card" type="button"><span class="summary-label">Total Requests</span><strong class="summary-count">0</strong></button>';
    if (empty) empty.hidden = false;
    var toggle = document.getElementById("sidebarMenuToggle");
    var sidebar = document.getElementById("dashboardSidebar");
    var overlay = document.getElementById("sidebarOverlay");
    function close() { if (sidebar) sidebar.classList.remove("is-open"); if (overlay) overlay.hidden = true; }
    if (toggle) toggle.addEventListener("click", function () { if (sidebar) sidebar.classList.add("is-open"); if (overlay) overlay.hidden = false; });
    var closeButton = document.getElementById("sidebarCloseBtn");
    if (closeButton) closeButton.addEventListener("click", close);
    if (overlay) overlay.addEventListener("click", close);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { isDashboard() ? initDashboard() : initLogin(); });
  else isDashboard() ? initDashboard() : initLogin();
})();

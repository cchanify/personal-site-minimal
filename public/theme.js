// Theme: runs in <head> (blocking) to set the theme before first paint,
// then wires up the header toggle once the DOM is ready.
(function () {
  var KEY = 'theme-preference';
  var COLORS = { light: '#ffffff', dark: '#121212' };
  var root = document.documentElement;
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function getStored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function setStored(value) {
    try { localStorage.setItem(KEY, value); } catch (e) { /* storage blocked */ }
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', COLORS[theme]);
    var button = document.querySelector('.theme-toggle');
    if (button) {
      var isDark = theme === 'dark';
      button.textContent = isDark ? '☀️' : '🌙';
      button.setAttribute('aria-label', 'Switch to ' + (isDark ? 'light' : 'dark') + ' mode');
    }
  }

  apply(getStored() || (media.matches ? 'dark' : 'light'));

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.querySelector('.theme-toggle');
    if (button) {
      button.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setStored(next);
        apply(next);
      });
    }
    apply(root.getAttribute('data-theme'));
  });

  media.addEventListener('change', function (e) {
    if (!getStored()) apply(e.matches ? 'dark' : 'light');
  });
})();

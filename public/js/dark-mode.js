/**
 * Dark Mode Toggle Functionality
 * Handles theme switching and persistence
 */

class DarkModeToggle {
  constructor() {
    this.storageKey = 'theme-preference';
    this.theme = this.getStoredTheme() || this.getSystemTheme();
    this.init();
  }

  init() {
    // Apply initial theme
    this.applyTheme(this.theme);
    
    // Create and add toggle button
    this.createToggleButton();
    
    // Listen for system theme changes
    this.watchSystemTheme();
  }

  getStoredTheme() {
    return localStorage.getItem(this.storageKey);
  }

  getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  storeTheme(theme) {
    localStorage.setItem(this.storageKey, theme);
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.updateToggleButton(theme);
  }

  toggleTheme() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.theme = newTheme;
    this.applyTheme(newTheme);
    this.storeTheme(newTheme);
  }

  createToggleButton() {
    const button = document.createElement('button');
    button.className = 'dark-mode-toggle';
    button.setAttribute('aria-label', 'Toggle dark mode');
    button.setAttribute('title', 'Toggle dark mode');
    button.onclick = () => this.toggleTheme();
    
    // Add to page
    document.body.appendChild(button);
    this.toggleButton = button;
    this.updateToggleButton(this.theme);
  }

  updateToggleButton(theme) {
    if (!this.toggleButton) return;
    
    const isDark = theme === 'dark';
    const icon = isDark ? '☀️' : '🌙';
    const text = isDark ? 'Light' : 'Dark';
    
    this.toggleButton.innerHTML = `<span class="toggle-icon">${icon}</span>${text}`;
    this.toggleButton.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
  }

  watchSystemTheme() {
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        // Only update if user hasn't set a preference
        if (!this.getStoredTheme()) {
          this.theme = e.matches ? 'dark' : 'light';
          this.applyTheme(this.theme);
        }
      });
  }
}

// Initialize dark mode when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new DarkModeToggle();
  });
} else {
  new DarkModeToggle();
}
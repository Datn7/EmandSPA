import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly darkClass = 'dark-theme';

  constructor() {
    // Load theme from localStorage on app init
    const isDark = localStorage.getItem('isDarkMode') === 'true';
    this.setDarkMode(isDark);
  }

  setDarkMode(isDarkMode: boolean) {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add(this.darkClass);
    } else {
      body.classList.remove(this.darkClass);
    }
    localStorage.setItem('isDarkMode', String(isDarkMode));
  }

  toggleTheme() {
    const isDark = document.body.classList.contains(this.darkClass);
    this.setDarkMode(!isDark);
  }

  isDarkMode(): boolean {
    return document.body.classList.contains(this.darkClass);
  }
}

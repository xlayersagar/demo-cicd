import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'restaurant-management-system';
  constructor(private router: Router) {}

  onLogout() {
    // Your logout logic here
    // For simplicity, we assume a basic logout functionality here
    this.router.navigate(['/']);
  }

  showNavigationLinks(): boolean {
    // Get the current route URL
    const currentRoute = this.router.url;

    // Check if the current route is the main page ('/')
    // If it is, we don't want to show any navigation links, so return false
    if (currentRoute === '/') {
      return false;
    }

    return true;
  }

  showLogoutLink(): boolean {
    // Get the current route URL
    const currentRoute = this.router.url;

    // Check if the current route is '/login', '/home', '/signup', or '/'
    // If it is, we don't want to show the "Logout" link, so return false
    if (currentRoute === '/login' || currentRoute === '/home' || currentRoute === '/signup' || currentRoute === '/') {
      return false;
    }

    // If the current route is not '/login', '/home', '/signup', or '/', we want to show the "Logout" link, so return true
    return true;
  }
}

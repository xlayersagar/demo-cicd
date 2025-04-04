// src/app/navbar/navbar.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  onLogout() {
    // Your logout logic here
    // For simplicity, we'll just navigate to the login page
    this.router.navigate(['/login']);
  }
}

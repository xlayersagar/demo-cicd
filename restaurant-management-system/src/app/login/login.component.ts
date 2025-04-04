import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; // Add this line

  constructor(private http: HttpClient, private router: Router) {}

  onLoginSubmit() {
    const formData = {
      username: this.username,
      password: this.password,
    };

    this.http.post<any>('http://localhost:8080/api/auth/login', formData).subscribe(
      (response) => {
        console.log('Login successful!');
        // You might want to store the authentication token or user data in a service
        // and then navigate to the desired page after successful login
        this.router.navigate(['/menu']); // Replace '/menu' with the actual path to your menu page
      },
      (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid username or password'; // Set the error message
      }
    );
  }
}

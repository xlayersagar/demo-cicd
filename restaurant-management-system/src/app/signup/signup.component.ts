import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'], 
})
export class SignupComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  onSignupSubmit() {
    const formData = {
      username: this.username,
      password: this.password,
    };

    this.http.post<any>('http://localhost:8080/api/auth/register', formData).subscribe(
      (response) => {
        console.log('Registration successful!');
        // Manually navigate to the home page
        window.location.href = '/'; // Replace '/home' with the actual path to your home page
      },
      (error) => {
        console.error('Error occurred during sign up:', error);
      }
    );
  }
}

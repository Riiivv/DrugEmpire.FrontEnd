import { Component, ɵɵdeferPrefetchOnViewport } from '@angular/core';
import { AuthService } from '../services/auth.services';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  username = '';
  email = '';
  firstName = '';
  lastName = '';
  phoneNumber = '';
  password = '';


  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register({
      username: this.username,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      password: this.password
    }).subscribe({
      next: (res) => {
        console.log(res);
        alert('User created');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        alert('Error creating user');
      }
    });
  }
}
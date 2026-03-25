import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}
    
    onSubmit() {
      this.authService.login({
        email: this.email,
        password: this.password
      }).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['/']);
        },
        error: () => {
          alert ('wrong email or password');
        }
      });
    }
}
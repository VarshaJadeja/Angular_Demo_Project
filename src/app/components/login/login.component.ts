import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@app/services/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  login() {
    this.loginService.login(this.username, this.password)
      .subscribe(
        response => {
          // Successful login
          console.log('Login successful:', response);

          // Save token to local storage or session storage
          localStorage.setItem('token', response.token);

          // Redirect or navigate to another route
          this.router.navigate(['/dashboard']); // Replace '/dashboard' with your desired route
        },
        error => {
          // Handle login error
          console.error('Login error:', error);
          // Display error message or handle as needed
        }
      );
  }
}

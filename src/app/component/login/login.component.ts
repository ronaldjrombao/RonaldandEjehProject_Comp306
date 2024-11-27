import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Needed for [(ngModel)]
import { AuthService } from '../../service/login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Fixed the key from styleUrl to styleUrls
})
export class LoginComponent {
  username = '';
  password = '';
  rememberMe = false;
  loginFailed = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe((success) => {
      if (success) {
        const userId = this.authService.getCurrentUserId();
        console.log('Logged in user ID:', userId);
        this.router.navigate(['/home']); // Redirect to home on successful login
      } else {
        this.loginFailed = true; // Show error if login fails
      }
    });
  }
}

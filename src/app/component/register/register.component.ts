import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/login/auth.service';
import { response } from 'express';

@Component({
  selector: 'app-register',
  standalone: true,
  providers: [HttpClient, AuthService],
  imports: [ FormsModule, CommonModule], // Add FormsModule here
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor( private router: Router, 
    private http: HttpClient,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (this.user.password === this.user.confirmPassword) {
      console.log(this.user);
      this.authService.register(this.user.email, this.user.password).subscribe(
        response => {
          alert('Registration successful!');
          this.router.navigate(['/login']);
        },
        error => {
          console.error(error);
          alert('Registration failed. Please try again.');
        }
      );
    } else {
      alert('Passwords do not match.');
    }
  }
}

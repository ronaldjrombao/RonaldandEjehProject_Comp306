import { Component } from '@angular/core';
import { AuthService } from '../../service/login/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}
  isLoggedIn$!: Observable<boolean>;
  username$ : Observable<string | null> | undefined;
  ngOnInit(): void {
    // Check if user is logged in
    this.isLoggedIn$ = this.authService.isAuthenticated();
    this.username$ = this.authService.getCurrentUsername() || '';
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

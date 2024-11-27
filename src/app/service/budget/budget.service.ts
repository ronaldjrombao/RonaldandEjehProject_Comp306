import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BudgetCategory, UserBudget } from '../../app.interface';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { response } from 'express';



@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiServerUrl = 'https://localhost:7296';

  private budgetsSubject = new BehaviorSubject([]);
  constructor(private http: HttpClient) {
  }

  getBudgets(): Observable<any[]> {
    // Retrieve tokens and other data from localStorage
    const accessToken = localStorage.getItem('token');
    const tokenType = localStorage.getItem('tokenType');
    const expiresIn = localStorage.getItem('expiresIn');
    const refreshToken = localStorage.getItem('refreshToken');

    // Create the headers, including all required information
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${tokenType} ${accessToken}`, // Use tokenType and accessToken together if needed
      'X-Expires-In': expiresIn || '',  // Custom header for expiration if needed
      'X-Refresh-Token': refreshToken || '' // Custom header for refresh token if needed
    });

    // Make the HTTP GET request with headers
    return this.http.get<any[]>(`${this.apiServerUrl}/api/budgets`, { headers });
  }
  updateBudget(budget: any) {
    const accessToken = localStorage.getItem('token');
    const tokenType = localStorage.getItem('tokenType');
    const expiresIn = localStorage.getItem('expiresIn');
    const refreshToken = localStorage.getItem('refreshToken');

    // Create the headers, including all required information
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${tokenType} ${accessToken}`, // Use tokenType and accessToken together if needed
      'X-Expires-In': expiresIn || '',  // Custom header for expiration if needed
      'X-Refresh-Token': refreshToken || '' // Custom header for refresh token if needed
    });
    return this.http.put(`${this.apiServerUrl}/api/budgets/${budget.budgetId}`, budget, { headers });
  }
  
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/api/Category`);
  }


  deleteBudget(budgetId: number) {
    const accessToken = localStorage.getItem('token');
    const tokenType = localStorage.getItem('tokenType');
    const expiresIn = localStorage.getItem('expiresIn');
    const refreshToken = localStorage.getItem('refreshToken');

    // Create the headers, including all required information
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${tokenType} ${accessToken}`, // Use tokenType and accessToken together if needed
      'X-Expires-In': expiresIn || '',  // Custom header for expiration if needed
      'X-Refresh-Token': refreshToken || '' // Custom header for refresh token if needed
    });
    return this.http.delete(`${this.apiServerUrl}/api/budgets/${budgetId}`, { headers });
  }

  addBudget( newCategory: any) {
    // Retrieve tokens and other data from localStorage
    const accessToken = localStorage.getItem('token');
    const tokenType = localStorage.getItem('tokenType');
    const expiresIn = localStorage.getItem('expiresIn');
    const refreshToken = localStorage.getItem('refreshToken');

    // Create the headers, including all required information
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${tokenType} ${accessToken}`, // Use tokenType and accessToken together if needed
      'X-Expires-In': expiresIn || '',  // Custom header for expiration if needed
      'X-Refresh-Token': refreshToken || '' // Custom header for refresh token if needed
    });
    
    return this.http.post(`${this.apiServerUrl}/api/budgets/`, newCategory, { headers })
}


}
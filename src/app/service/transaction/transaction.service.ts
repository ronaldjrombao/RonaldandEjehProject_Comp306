import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiServerUrl = 'https://localhost:7296';

  constructor(private http: HttpClient) { }

  getTransactions() {
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
    return this.http.get<any[]>(`${this.apiServerUrl}/api/Transaction`, { headers });
  }

  addTransaction(newTransaction: any) {
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
    return this.http.post(`${this.apiServerUrl}/api/Transaction`, newTransaction, { headers });
  }

  deleteTransaction(transactionId: number) {
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

    return this.http.delete(`${this.apiServerUrl}/api/Transaction/${transactionId}`, { headers });
  }

  updateTransaction(transaction: any) {
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
    return this.http.put(`${this.apiServerUrl}/api/Transaction/${transaction.transactionId}`, transaction, { headers });
    }
}

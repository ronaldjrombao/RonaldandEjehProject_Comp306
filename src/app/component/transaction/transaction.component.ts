import { Component } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/login/auth.service';
import { TransactionService } from '../../service/transaction/transaction.service';
import { BudgetService } from '../../service/budget/budget.service';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, NgbModule, FormsModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {

  constructor(
    public authService: AuthService,
    private transactionService: TransactionService,
    private router: Router, 
    private modalService: NgbModal,
    private budgetService: BudgetService
  ) { }

  newTransaction = {
    transactionType: 0,
    amount: 0,
    transactionDate: ''
  }
  transactions: {
    transactionId: number;
    transactionType: string;
    amount: number;
    transactionDate: string;
  }[] = [];
  categories: any[] = [];
  selectedTransaction: any = null;
  ngOnInit() {
    this.fetchCategories();
    this.fetchTransactions();
    
  }

  openTransactionModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }); // Open the modal
  }

  openEditTransactionModal(content: any, transaction: any) {
    this.selectedTransaction = transaction;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  
  addTransaction(transaction: any) {
    // this.newTransaction.transactionType = Number(this.newTransaction.transactionType);
    console.log( this.newTransaction);
    this.transactionService.addTransaction(this.newTransaction).subscribe(
      response => {
        console.log('Transaction saved successfully', response);
        this.fetchTransactions();
        this.newTransaction = { transactionType: 0, amount: 0, transactionDate: '' };
        transaction.close();
      },
      error => {
        console.error('Error saving transaction', error);
      }
    );
  }

  deleteTransaction(transactionId: number) {
    this.transactionService.deleteTransaction(transactionId).subscribe(() => {
      this.fetchTransactions();
    });
  }

  
  // editBudget(budget: any) {
  //   budget.budgetType = this.categories.find(cat => cat.categoryName === budget.budgetType)?.categoryId;
  //   console.log(budget);
  //   this.budgetService.updateBudget(budget).subscribe(() => {
  //     this.fetchBudgets();
  //   });
  // }
  editTransaction(transaction: any) {
    transaction.transactionType = this.categories.find(cat => cat.categoryName === transaction.transactionType)?.categoryId;
    console.log(transaction);
    this.transactionService.updateTransaction(transaction).subscribe(() => {
      this.fetchTransactions();
      this.modalService.dismissAll();
    });
  }
  fetchTransactions() {
    this.transactionService.getTransactions().subscribe((
      data: any) => {
        this.transactions = data.results; // Assign transactions to the component's variable
      },
      error => {
        console.error('Error fetching transactions', error);
      }
    );
  }

  fetchCategories() {
    this.budgetService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error('Error fetching categories', error);
      }
    );
  }

}

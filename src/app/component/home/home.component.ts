import { Component } from '@angular/core';
import { AuthService } from '../../service/login/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../../service/budget/budget.service';
import { BudgetCategory } from '../../app.interface';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
    selector: 'app-home',
    imports: [CommonModule, NgbModule, FormsModule], // Add FormsModule here
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
  
  
  totalAllocated: number = 0;
  totalSpent: number = 0;
  totalRemaining: number = 0;

  newCategoryName = '';
  newAllocatedAmount = 0;
  newCurrentAmount = 0;
  selectedCategory: BudgetCategory | null = null;
  userId: number | null = null;

  newBudget = {
    budgetName: '',
    budgetType: 0,
    amount: 0,
    startDate: '',
    currentAmount: 0,
    endDate: ''
  };

  budgets: { 
    budgetId: number; 
    budgetName: string; 
    budgetType: string; 
    amount: number; 
    startDate: string; 
    endDate: string;
    currentAmount: number 
  }[] = [];

  categories: any[] = []
  selectedBudget: any = null
  emptyBudget: boolean = true

  constructor(public authService: AuthService, 
    private router: Router, 
    private budgetService: BudgetService,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
    this.fetchCategories();
    this.userId = this.authService.getCurrentUserId();
    this.fetchBudgets();


  }

  addNewBudget(modal: any) {
    this.budgetService.addBudget(this.newBudget).subscribe(
      response => {
        console.log('Budget saved successfully', response);
        this.fetchBudgets();
        modal.close(); // Close the modal on success
      },
      error => {
        console.error('Error saving budget', error);
        modal.close();
      }
    );
    this.newBudget = {
      budgetName: '',
      budgetType: 0,
      amount: 0,
      currentAmount: 0,
      startDate: '',
      endDate: ''
    };
  }
  openTransactionModal(content: any, category: BudgetCategory) {
    this.selectedCategory = category; // Set the selected category
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  openBudgetModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }); // Open the modal
  }

  opentBudgetModal(content: any, budget: any) {
    this.selectedBudget = budget;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  calculateTotals() {
    this.totalAllocated = this.budgets.reduce((acc, budget) => acc + budget.amount, 0);
    this.totalSpent = this.categories.reduce((acc, budget) => acc + budget.currentAmount, 0);
    this.totalRemaining = this.categories.reduce((acc, budget) => acc + budget.remaining, 0);
  }


  fetchBudgets() {
    this.budgetService.getBudgets().subscribe((data: any) => {
          this.budgets = data.results;
        })
        if (this.budgets.length >  0){
          this.emptyBudget = false
        }
  }
  
  deleteBudget(budgetId: number) {
    this.budgetService.deleteBudget(budgetId).subscribe(() => {
      this.fetchBudgets();
    });
  }

  editBudget(budget: any) {
    budget.budgetType = this.categories.find(cat => cat.categoryName === budget.budgetType)?.categoryId;
    this.budgetService.updateBudget(budget).subscribe(() => {
      this.fetchBudgets();
      this.modalService.dismissAll();
    });
  }

  fetchCategories() {
    this.budgetService.getCategories().subscribe(
      data => {
        this.categories = data; // Assign categories to the component's variable
      },
      error => {
        console.error('Error fetching categories', error);
      }
    );
  }
}

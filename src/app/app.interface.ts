export  interface BudgetCategory {
    name: string;
    allocated: number;
    current: number;
    remaining: number;
  }
  
  export  interface UserBudget {
    userId: number;
    categories: BudgetCategory[];
  }

  export interface RegisterModel {
    
  
  }

  export interface BudgetResult {
    message: string;
    result: [];
  }
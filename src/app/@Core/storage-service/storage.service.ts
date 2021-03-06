import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private appLang: string;
  private employees: IEmployee[];

  constructor() {
    this.getAppLang();
    this.getSavedEmployees();
  }

  private getAppLang(): void {
    const currentLang = localStorage.getItem('appLang');

    if (currentLang) {
      this.appLang = currentLang;
    }
  }

  private getSavedEmployees(): void {
    const savedEmployees = localStorage.getItem('employees');

    if (savedEmployees !== null && savedEmployees !== undefined) {
      this.employees = JSON.parse(savedEmployees);
    } else {
      this.employees = [];
    }
  }

  // SECTION Get and Set App Lang --------------------

  get AppLang(): string {
    return this.appLang;
  }

  set AppLang(lang: string) {
    localStorage.setItem('appLang', lang);
    this.appLang = lang;
  }

  // !SECTION Get and Set App Lang --------------------

  // SECTION Get and Set Saved Employees --------------------

  get Employees(): IEmployee[] {
    return this.employees;
  }

  addEmployee(employee: IEmployee) {
    this.employees.push(employee);

    localStorage.setItem('employees', JSON.stringify(this.employees));
  }

  // !SECTION Get and Set App Lang --------------------
}

export interface IEmployee {
  id: number;
  name: string;
  departmentId: number;
  employeeCode: string;
  birthdate: Date;
  genderId: number;
}

export interface IDisplayEmployee {
  id: number;
  name: string;
  departmentId: number;
  department: { arabic: string; english: string };
  employeeCode: string;
  birthdate: Date;
  genderId: number;
  gender: string;
}

export interface IEmployeeOptions {
  name?: string;
  departmentId?: number;
  employeeCode?: string;
  birthdate?: Date;
  genderId?: number;
}

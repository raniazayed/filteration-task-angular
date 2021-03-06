import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  DataService,
  IDepartment
} from 'src/app/@Core/data-service/data.service';
import {
  IDisplayEmployee,
  IEmployee,
  IEmployeeOptions,
  StorageService
} from 'src/app/@Core/storage-service/storage.service';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.scss']
})
export class SearchEmployeeComponent implements OnInit {
  allEmployees: IEmployee[] = [];
  employees: IDisplayEmployee[] = [];

  departments: IDepartment[] = [];
  filterOptions: IEmployeeOptions = {};
  locale: string;

  constructor(
    private storageService: StorageService,
    private dataService: DataService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.locale = this.translateService.currentLang;

    this.onLangChange();

    this.getDepartments();

    this.getEmployees();
  }

  private onLangChange(): void {
    this.translateService.onLangChange.subscribe(
      langObj => (this.locale = langObj.lang)
    );
  }

  private getDepartments(): void {
    this.departments = this.dataService.Departments;
  }

  private getEmployees(): void {
    this.allEmployees = this.storageService.Employees;

    this.filter();
  }

  filter(): void {
    const filters = Object.entries(this.filterOptions).filter(
      ([key, value]) => value !== null && value !== undefined && value !== ''
    );
    const filteredEmployees = this.allEmployees.filter(employee => {
      const truthyFiltersArr = this.getTruthyFiltersArray(filters, employee);
      
      const isIncluded = !truthyFiltersArr.some(bool => bool === false);

      return isIncluded;
    });

    this.setFilteredEmployees(filteredEmployees);
  }

  private getTruthyFiltersArray(
    filters: any[],
    employeeObject: IEmployee
  ): boolean[] {
    return filters.map(filter => {
      if (filter[1] instanceof Date) {
        return this.matchDates(employeeObject[filter[0]], filter[1]);
      } else if (typeof employeeObject[filter[0]] === 'string') {
        return this.matchStrings(employeeObject[filter[0]], filter[1]);
      } else {
        return employeeObject[filter[0]] === filter[1];
      }
    });
  }

  private matchDates(
    firstDate: Date | string,
    secondDate: Date | string
  ): boolean {
    return (
      moment(firstDate).format('YYYY-MM-DD') ===
      moment(secondDate).format('YYYY-MM-DD')
    );
  }

  private matchStrings(firstString: string, secondString: string): boolean {
    // NOTE If Input Is String match the input without being case sensetive
    return (
      String(firstString).toLowerCase().includes(String(secondString).toLowerCase())
      || String(secondString).toLowerCase().includes(String(firstString).toLowerCase())
    );
  }

  private setFilteredEmployees(filteredEmployees: IEmployee[]) {
    this.employees = filteredEmployees.map(employee => {
      const department = this.departments.find(
        dep => dep.value === employee.departmentId
      ).viewValue;
      const gender = employee.genderId === 1 ? 'male' : 'female';

      return { department, gender, ...employee };
    });
  }

  clear() {
    this.filterOptions = {};
    this.filter();
  }
}

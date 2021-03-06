import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  DataService,
  IDepartment
} from 'src/app/@Core/data-service/data.service';
import { StorageService } from 'src/app/@Core/storage-service/storage.service';

import * as _moment from 'moment';

const moment = _moment;
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;

  departments: IDepartment[] = [];

  locale: string;

  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    private dataService: DataService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.locale = this.translateService.currentLang;

    this.initForm();

    this.getDepartments();

    this.onLangChange();
  }

  private initForm() {
    // NOTE Reset the current hours, minutes, secs, ms to 0
    const d = new Date();
    d.setHours(0, 0, 0, 0);

    this.employeeForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      departmentId: ['', Validators.required],
      employeeCode: ['', [Validators.required, Validators.min(0)]],
      birthdate: [d, Validators.required],
      genderId: ['', Validators.required]
    });

    this.setEmployeeId();
  }

  private setEmployeeId() {
    if(this.storageService.Employees.length !== 0) {
      const lastEmployee = [...this.storageService.Employees].splice(-1)[0];
      if (lastEmployee.id !== null && lastEmployee.id !== undefined) {
        this.employeeForm.get('id').setValue(lastEmployee.id + 1);
      } 
    } else {
      this.employeeForm.get('id').setValue(1);
    }
  }

  private getDepartments() {
    this.departments = this.dataService.Departments;
  }

  onSubmit() {
    if (this.isFormValid) {
      const body = this.employeeForm.value;

      body.birthdate = moment(body.birthdate).format('YYYY-MM-DD');

      this.storageService.addEmployee(this.employeeForm.value);

      this.employeeForm.reset();

      this.router.navigate(['../search-employee']);
    }
  }

  private get isFormValid(): boolean {
    this.employeeForm.markAllAsTouched();

    return this.employeeForm.touched && this.employeeForm.valid;
  }

  private onLangChange() {
    this.translateService.onLangChange.subscribe(
      langObj => (this.locale = langObj.lang)
    );
  }
}

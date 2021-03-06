import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchEmployeeComponent } from './search-employee.component';
import { SearchEmployeeRoutingModule } from './search-employee-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DataService } from 'src/app/@Core/data-service/data.service';
import { EmployeesTableComponent } from './employees-table/employees-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    SearchEmployeeRoutingModule,
    TranslateModule.forChild(),
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTableModule
  ],
  providers: [DataService],
  declarations: [SearchEmployeeComponent, EmployeesTableComponent]
})
export class SearchEmployeeModule {}

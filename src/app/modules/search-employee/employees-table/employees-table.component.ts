import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { IEmployee } from 'src/app/@Core/storage-service/storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss']
})
export class EmployeesTableComponent implements OnInit, OnChanges {
  @Input() employees: IEmployee[] = [];
  displayedColumns: string[] = [
    'select',
    'name',
    'department',
    'employeeCode',
    'gender',
    'birthdate'
  ];
  
  dataSource: MatTableDataSource<IEmployee>;
  selection: SelectionModel<IEmployee>;
  locale: string;

  constructor(private translateService: TranslateService) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if (changes.employees.currentValue !== changes.employees.previousValue) {
      this.dataSource = new MatTableDataSource<IEmployee>(this.employees);
      this.selection = new SelectionModel<IEmployee>(true, []);
    }
  }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.locale = this.translateService.currentLang;
    this.dataSource = new MatTableDataSource<IEmployee>(this.employees);
    this.selection = new SelectionModel<IEmployee>(true, []);

    this.onLangChange();
  }

  private onLangChange() {
    this.translateService.onLangChange.subscribe(
      langObj => (this.locale = langObj.lang)
    );
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IEmployee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchEmployeeComponent } from './search-employee.component';

const routes: Routes = [
  {
    path: '',
    component: SearchEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchEmployeeRoutingModule {}

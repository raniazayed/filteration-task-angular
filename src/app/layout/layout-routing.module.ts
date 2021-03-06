import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'search-employee'
      },
      {
        path: 'search-employee',
        loadChildren: () =>
          import('../modules/search-employee/search-employee.module').then(
            m => m.SearchEmployeeModule
          )
      },
      {
        path: 'add-employee',
        loadChildren: () =>
          import('../modules/add-employee/add-employee.module').then(
            m => m.AddEmployeeModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {TransferComponent} from "./transfer/transfer.component";
import {TableComponent} from "./table/table.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'en',
    pathMatch: 'full',
  },
  {
    path: ':lang',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'transfer',
        pathMatch: 'full'
      },
      {
        path: 'transfer',
        component: TransferComponent,
      }, {
        path: 'tables',
        component: TableComponent,
      }
    ]
  },
  {
    path: ':lang',
    children: [
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', 'en')
    }
  }
}

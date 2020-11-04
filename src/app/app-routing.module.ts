import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {TransferComponent} from "./transfer/transfer.component";
import {ItemComponent} from "./item/item.component";
import {TableComponent} from "./table/table.component";
import {CustomerComponent} from "./customer/customer.component";
import {AuthGuardService} from "./services/auth-guard.service";

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
        canActivate: [AuthGuardService]
      },
      {
        path: 'customers',
        component: CustomerComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'tables',
        component: TableComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'items',
        component: ItemComponent,
        canActivate: [AuthGuardService]
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

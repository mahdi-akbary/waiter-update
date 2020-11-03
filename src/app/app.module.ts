import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTreeModule} from '@angular/material/tree';
import {LayoutComponent} from './layout/layout.component';
import {ListOptionsComponent} from './layout/list-options/list-options.component';
import {HeaderComponent} from './layout/header/header.component';
import {HttpService} from './services/http.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InterceptorService} from './services/interceptor.service';
import {AuthService} from './services/auth.service';
import {FormValidationService} from './services/form-validation.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {StaticDataService} from './services/static-data.service';
import {SharedModule} from "./shared/shared.module";
import {TransferService} from "./transfer/transfer.service";
import {TransferComponent} from "./transfer/transfer.component";
import {TableComponent} from "./table/table.component";
import {TableService} from "./table/table.service";
import {SummaryDialogComponent} from "./table/summary-dialog/summary-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ListOptionsComponent,
    HeaderComponent,
    TransferComponent,
    TableComponent,
    SummaryDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTreeModule,
    SharedModule,
    FlexLayoutModule,
  ],
  providers: [
    HttpService,
    AuthService,
    FormValidationService,
    TransferService,
    TableService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      deps: [],
      multi: true
    },
    StaticDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

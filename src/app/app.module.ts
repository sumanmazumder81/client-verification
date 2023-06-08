import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './component/login/login.component';


// common module
import { localModule } from './module/common/local.module';
import { VehiclesModule } from './module/vehicles/vehicles.module';
import { BrokerModule } from './module/broker/broker.module';
import {ConnectionServiceModule} from 'ng-connection-service';
//services
// import { httpInterceptorProviders } from './http-interceptors/index';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // NgbModule,
    localModule,
    VehiclesModule,
    BrokerModule,
    ConnectionServiceModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

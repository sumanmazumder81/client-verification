import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './module/common/component/dashboard/dashboard.component';
import { vendorEntityType } from './enums/vendorsEntity.enum';
const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, children:[
    {path: '', redirectTo: 'Broker', pathMatch: "full"},
    {path: vendorEntityType.BROKER, loadChildren: () => import('./module/broker/broker.module').then(m => m.BrokerModule) },
    {path: vendorEntityType.DRIVER, loadChildren: () => import('./module/driver/driver.module').then(m => m.DriverModule) },
    {path: vendorEntityType.OWNER, loadChildren: () => import('./module/owner/owner.module').then(m => m.OwnerModule) },
    {path: vendorEntityType.VEHICLE, loadChildren: () => import('./module/vehicles/vehicles.module').then(m => m.VehiclesModule) },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

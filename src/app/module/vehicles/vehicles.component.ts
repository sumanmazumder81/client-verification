import { Component, ViewEncapsulation, OnInit } from '@angular/core';
// import { ThemePalette } from '@angular/material/core';
import { vendorEntityType } from '../../enums/vendorsEntity.enum';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
@Component({
  selector: 'vehicles-app',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class VehiclesComponent {
  public vendorEntityType = vendorEntityType.VEHICLE;
  public activeClass:string;
  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute
  ){ }
  statusCheck(){
    this.activeRouter.queryParams.subscribe((respond:any)=>{
      console.log(respond.status);
      if(respond.status == undefined){
        this.activeClass = '';
        console.log(this.activeClass);
      }
      this.activeClass = respond.status;
    })
  }
  ngAfterViewInit(): void{
    this.statusCheck();
  }
  redirect(status:string){
    this.router.navigate([`dashboard/Vehicle/all-list`], {queryParams: {status: status}})
  }
}

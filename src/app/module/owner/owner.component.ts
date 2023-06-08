import { Component, ViewEncapsulation, OnInit } from '@angular/core';
// import { ThemePalette } from '@angular/material/core';
import { vendorEntityType } from '../../enums/vendorsEntity.enum';
import { servicesEnum } from '../../enums/services.enum';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
@Component({
  selector: 'owner-app',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OwnerComponent implements OnInit{
  public vendorEntityType = vendorEntityType.OWNER;
  public activeClass:string;
  constructor(
    private router : Router,
    private activeRouter: ActivatedRoute,
  ){

  }
  ngOnInit(): void {
    // this.displayedColumns

  }

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
    this.router.navigate([`dashboard/Owner/all-list`], {queryParams: {status: status}})
  }
}

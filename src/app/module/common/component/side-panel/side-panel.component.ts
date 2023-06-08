import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../../node_modules/@angular/router';
import { SidePanelService } from '../../../../services/side-panel.service';
import { vendorEntityType } from '../../../../enums/vendorsEntity.enum';
@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {
  public menus = [
    {id: 4, name: vendorEntityType.BROKER, link: vendorEntityType.BROKER, isActive: false, image: './assets/images/broker-icon.svg', activeImage: './assets/images/broker-active-icon.svg'},
    {id: 3, name: vendorEntityType.DRIVER, link: vendorEntityType.DRIVER, isActive: false, image: './assets/images/driver-icon.svg', activeImage: './assets/images/driver-active-icon.svg'},
    {id: 2, name: vendorEntityType.OWNER, link: vendorEntityType.OWNER, isActive: false, image: './assets/images/owner-icon.svg', activeImage: './assets/images/owner-active-icon.svg'},
    {id: 1, name: vendorEntityType.VEHICLE, link: vendorEntityType.VEHICLE, isActive: false, image: './assets/images/vehicles-icon.svg', activeImage: './assets/images/vehicles-active-icon.svg'},
  ];
  constructor(private sidePanelService: SidePanelService, private router: Router) { }

  ngOnInit(): void {
  }
  // routeToEntity(callus: string){
  //   this.sidePanelService.setCurrentCaller(callus);
  //   this.router.navigateByUrl('/dashboard/vendor')
  // }

}

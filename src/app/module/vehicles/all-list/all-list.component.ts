import { Component, OnInit } from '@angular/core';
import { vendorEntityType } from 'src/app/enums/vendorsEntity.enum';
import { ServicesService } from '../../../services/services.service';
import { servicesEnum } from '../../../enums/services.enum';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { ConsoleLogService } from '../../../services/console-log.service';
import { ToasterService } from '../../../services/toaster.service';
@Component({
  selector: 'app-all-list',
  templateUrl: './all-list.component.html',
  styleUrls: ['./all-list.component.scss']
})
export class AllListComponent implements OnInit {
  public allTableData:any;
  public loader : boolean = false;
  public pageIndex: number = 1;
  public pageSize: number = 5;
  public dataLength: any;
  public searchString: string = '';
  displayedColumns: any[] = [
    {label: 'Id', key: 'id'},
    {label: 'Registration number', key: 'RegistrationNumber'},
    {label: 'Status', key: 'Status'},
    {label: 'Vehicle type', key: 'VehicleType'},
    {label: 'Vehicle veriant', key: 'VehicleVeriant'},
    {label: 'action', key: 'action'},
  ];
  constructor(
    private servicesService: ServicesService,
    private _router: Router,
    private consoleLogService: ConsoleLogService,
    private activeRouter: ActivatedRoute,
    private toster: ToasterService,
  ) { }

  ngOnInit(): void {
    this.brokerAllList(this.pageIndex, this.pageSize, this.searchString);
    // this.ddd();

  }
  brokerAllList(page:any, pageSize:any, searchString:any){

    this.activeRouter.queryParams.subscribe((respond:any)=>{
      console.log(respond.status);
      this.loader = true;
      if(respond.status == undefined || respond.status == ""){
        const url = `${servicesEnum.VEHICLE}/search?displayCount=${pageSize}&pageNo=${page}&searchValue=${searchString}&status=`;
        this.servicesService.verificationGet(url).subscribe(
          (success: any)=>{
            console.log(success);
            success.result.map((element:any)=> element.verificatonComment == "undefined"? "" : element);
            this.allTableData = success.result;
            this.pageIndex = success.currentPage;
            this.pageSize = success.pageSize;
            this.dataLength = success.totalCount;
            this.loader = false;
          }, (error: any)=>{
            console.log(error);
            this.loader = false;
            this.toster.showError(error.error.Message, error.message);
          },()=>{
            this.loader = false;
          }
        )
      }else{
        const url = `${servicesEnum.VEHICLE}/search?displayCount=${pageSize}&pageNo=${page}&searchValue=${searchString}&status=${respond?.status}`;
        this.servicesService.get(url).subscribe(
          (success: any)=>{
            console.log(success);
            success.result.map((element:any)=> element.verificatonComment == "undefined"? "" : element);

            this.allTableData = success.result;
            this.pageIndex = success.currentPage;
            this.pageSize = success.pageSize;
            this.dataLength = success.totalCount;
            this.loader = false;
          }, (error: any)=>{
            console.log(error);
            this.loader = false;
            this.toster.showError(error.error.Message, error.message);
          },()=>{
            this.loader = false;
          }
        )
      }

    })

  }


  search(event:any){
    this.searchString = event;
    this.pageIndex = 1;
    this.brokerAllList(this.pageIndex, this.pageSize, event);
  }
  setPegination(event: {pageIndex: number, pageSize: number}){
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.brokerAllList(event.pageIndex +1, event.pageSize, this.searchString);
  }

  edit(id:any){
    console.log(id);
    this._router.navigate([`/dashboard/${vendorEntityType.VEHICLE}/all-details/${id}`], {queryParams: {entityType: vendorEntityType.VEHICLE}});
  }
}

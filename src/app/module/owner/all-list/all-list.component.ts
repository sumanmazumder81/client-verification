import { Component, OnInit } from '@angular/core';
import { servicesEnum } from '../../../enums/services.enum';
import { ServicesService } from '../../../services/services.service';
import { vendorEntityType } from '../../../enums/vendorsEntity.enum';
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
    {label: 'Vendor Code', key: 'meta.VendorCode'},
    {label: 'Broker Name', key: 'userEntity.fullName'},
    {label: 'Created Date', key: 'userEntity.createdDate'},
    {label: 'Contact No', key: 'userEntity.contact[0]contactList[0].contactNo'},
    {label: 'Status', key: 'userEntity.contact[0]contactList[0].Status'},
    {label: 'Comment', key: 'verificatonComment'},
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
        const url = `${servicesEnum.OWNER}/search?displayCount=${pageSize}&pageNo=${page}&searchValue=${searchString}&status=`;
        this.servicesService.get(url).subscribe(
          (success: any)=>{
            success.result.map((element:any)=> !element.verificatonComment? "" : element);
            success.result.map((ele:any)=>{
              console.log(ele.status);
              ele.status = ele.status == "Approved" ? '<span class="success">Approved</span>': ele.status == "Pending"? '<span class="warning">Pending</span>': '<span class="danger">Declined</span>';
              return ele;
            });
            console.log(success);
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
        const url = `${servicesEnum.OWNER}/search?displayCount=${pageSize}&pageNo=${page}&searchValue=${searchString}&status=${respond?.status}`;
        this.servicesService.get(url).subscribe(
          (success: any)=>{
            success.result.map((element:any)=> element.verificatonComment == "undefined"? "" : element);
            success.result.map((ele:any)=>{
              ele.status = ele.status == "Approved" ? '<span class="success">Approved</span>': ele.status == "Pending"? '<span class="success">Pending</span>': '<span class="Declined">Declined</span>'
            });
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
    this._router.navigate([`/dashboard/${vendorEntityType.OWNER}/all-details/${id}`], {queryParams: {entityType: vendorEntityType.OWNER}});
  }
}

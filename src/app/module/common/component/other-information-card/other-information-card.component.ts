import { Component, OnInit, Input, SimpleChanges, Output,EventEmitter } from '@angular/core';
import { Router, NavigationExtras } from '../../../../../../node_modules/@angular/router';
import { ConsoleLogService } from '../../../../services/console-log.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { ImageViewComponent } from '../image-view/image-view.component';
@Component({
  selector: 'app-other-information-card',
  templateUrl: './other-information-card.component.html',
  styleUrls: ['./other-information-card.component.scss']
})
export class OtherInformationCardComponent implements OnInit {
  @Input("otherInformations") otherInformations : any[] = [];
  @Input("entityType") entityType : any;
  @Input("entityId") entityId : any;
  @Output() imageStatus: EventEmitter<boolean> = new EventEmitter();
  @Output() dialogClosed: EventEmitter<any> = new EventEmitter();
  public currentStataus: any;
  public allImageDatas:any = [];
  // public myDialog = new MatDialogConfig();
  // public imgCollection: Array<object> = [
  //   {
  //     image: 'https://www.magicminds.io/static/media/hero-digital-marketing.4938d4d8.jpg',
  //     thumbImage: 'https://www.magicminds.io/static/media/hero-digital-marketing.4938d4d8.jpg',
  //     alt: 'Image 1',
  //     title: 'Image 1'
  //   },
  //   {
  //     image: 'https://www.magicminds.io/static/media/hero-digital-marketing.4938d4d8.jpg',
  //     thumbImage: 'https://www.magicminds.io/static/media/hero-digital-marketing.4938d4d8.jpg',
  //     title: 'Image 2',
  //     alt: 'Image 2'
  //   }, {
  //     image: 'https://www.magicminds.io/static/media/hero-digital-marketing.4938d4d8.jpg',
  //     thumbImage: 'https://www.magicminds.io/static/media/hero-digital-marketing.4938d4d8.jpg',
  //     title: 'Image 3',
  //     alt: 'Image 3'
  //   }, {
  //     image: 'https://loremflickr.com/600/400/brazil,rio',
  //     thumbImage: 'https://loremflickr.com/600/400/brazil,rio',
  //     title: 'Image 4',
  //     alt: 'Image 4'
  //   }, {
  //     image: 'https://loremflickr.com/600/400/paris,girl/all',
  //     thumbImage: 'https://loremflickr.com/1200/800/paris,girl/all',
  //     title: 'Image 5',
  //     alt: 'Image 5'
  //   }
  // ];
  constructor(
    private _router: Router,
    private consoleLog : ConsoleLogService,
    public dialog: MatDialog,
  ) {

   }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges){
    console.log(changes['otherInformations']);
  }
  ngAfterViewInit() {
    return this.currentStataus;
  }
  detailsView(data:any){
    console.log(data.imageData);
    // let passData: NavigationExtras = {
    //   queryParams: {
    //     title: data.Title,
    //     companyName: data.companyName,
    //     gstNumber: data.gstNumber,
    //     imageData: data.imageData,
    //     tradeLicenceNumber: data.tradeLicenceNumber
    //   }
    // }
  //   this._router.navigate([`/dashboard/${this.entityType}/image-details/`],
  //   // {queryParams: {criteriaList: data}}
  //   passData
  // );
    // this.myDialog.data = data;
    const dialogConfig = new MatDialogConfig();
    let totalObject = {
      data : data,
      type: this.entityType,
      id: this.entityId,
    }
    dialogConfig.disableClose = true;
    dialogConfig.width = '100%';
    dialogConfig.data = totalObject;
    dialogConfig.height = '100%';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.maxWidth = '100vw';
    const dialogRef = this.dialog.open(ImageViewComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result:any)=>{
      let dialogStatus:boolean = true;
      this.dialogClosed.emit(dialogStatus);
    })
  }

  // status show
  isApproved(data: any){
    // console.log(data);
    if(data){
      for(let i=0; i < data.length; i++){
        if(data[i].Status == "Approved"){
          this.currentStataus =  "Approved";
        }else if(data[i].Status == "Declined"){
          this.currentStataus =  "Declined";
        }else if(data[i].Status == "Pending" || data[i].Status == "pending"){
          this.currentStataus = "Pending";
        }
        return this.currentStataus;
      }
    }
  }

  dateFormet(utcDate:string){
    return new Date(utcDate).toLocaleString();
  }
}

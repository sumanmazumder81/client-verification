import { Component, OnInit, Inject } from '@angular/core';
import { vendorEntityType } from '../../../../enums/vendorsEntity.enum';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '../../../../../../node_modules/@angular/forms';
import { ConsoleLogService } from '../../../../services/console-log.service';
import { ServicesService } from '../../../../services/services.service';
import { ToasterService } from '../../../../services/toaster.service';
@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnInit {
  public vendorEntityType = vendorEntityType.VEHICLE;
  public allData :any;
  public verificationForm : FormGroup;
  public approved: boolean;
  public loader : boolean = false;
  // imageObject = [
  //   {
  //     image:
  //       "https://static.toiimg.com/photo/msid-90953921/90953921.jpg?67472",
  //     thumbImage:
  //       "https://static.toiimg.com/photo/msid-90953921/90953921.jpg?67472",
  //     title: "Hummingbirds are amazing creatures"
  //   },
  //   {
  //     image:
  //       "https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg",
  //     thumbImage:
  //       "https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg"
  //   },
  //   {
  //     image:
  //       "https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg",
  //     thumbImage:
  //       "https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg",
  //     title: "Example with title."
  //   },
  //   {
  //     image:
  //       "https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg",
  //     thumbImage:
  //       "https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg",
  //     title: "Hummingbirds are amazing creatures"
  //   },
  //   {
  //     image:
  //       "https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg",
  //     thumbImage:
  //       "https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg"
  //   },
  //   {
  //     image:
  //       "https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg",
  //     thumbImage:
  //       "https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg",
  //     title: "Example two with title."
  //   }
  // ];
  constructor(
    private activeRouter : ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ImageViewComponent>,
    private consoleLog : ConsoleLogService,
    private ServicesService : ServicesService,
    private toaster: ToasterService,
  ) {
    this.verificationForm = new FormGroup({
      comment : new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    console.log(this.data)
    // console.log(this.activeRouter.snapshot.paramMap.get('data'));
    this.getData();
    console.log(this.data.data.imageData);
    this.data.data.imageData?.map((item:any)=>{
      if(item.Status == "Approved"){
        this.approved = true;
      }else{
        this.approved = false;
      }
    })
  }

  getData() {
    // this.activeRouter.queryParams.subscribe((passData:any) => {
    //   console.log(passData);
    // })
    // console.log(this.activeRouter.snapshot.queryParams['get']('criteriaList'));
    let commentes = this.data.data.imageData?.map((element:any)=>element.Comments);
    console.log(commentes);
    if(commentes){
      this.verificationForm.patchValue({
        comment:commentes[0]
      });
    }
  }




  // Approved images function
  submitApproved(){
    this.loader = true;
    this.consoleLog.log(this.data.id);
    this.consoleLog.log(this.data.type);
    const url = `Photos/verification/${this.data.id}/${this.data.type}`;
    const imagesDataFilter = this.data.data.imageData.map((element:any)=> element.KeyName);
    console.log(imagesDataFilter);
    let statusSend = {
      "photoKey": imagesDataFilter,
      "comments": this.verificationForm.value.comment,
      "verifiedBy": "string",
      "approved": true
    }
    this.consoleLog.log(statusSend);
    this.ServicesService.post(url, statusSend).subscribe(
      (success:any)=>{
        this.consoleLog.log(success);
        this.loader = false;
        this.dialogClose();
      },(error:any)=>{
        this.consoleLog.log(error);
        this.loader = false;
        this.toaster.showError(error.error.Message, '');
      },()=>{
        this.loader = false;
      }
    )
  }

  // Declined images function
  submitDeclined(){
    this.loader = true;
    const url = `Photos/verification/${this.data.id}/${this.data.type}`;
    const imagesDataFilter = this.data.data.imageData.map((element:any)=> element.KeyName);
    console.log(imagesDataFilter);
    let statusSend = {
      "photoKey": imagesDataFilter,
      "comments": this.verificationForm.value.comment,
      "verifiedBy": "string",
      "approved": false
    }
    this.consoleLog.log(statusSend);
    this.ServicesService.post(url, statusSend).subscribe(
      (success:any)=>{
        this.consoleLog.log(success);
        this.loader = false;
        this.dialogClose();
      },(error:any)=>{
        this.consoleLog.log(error);
        this.loader = false;
        this.toaster.showError(error.error.Message, '');
        this.dialogClose();
      },()=>{
        this.loader = false;
      }
    )
  }
// dialog closed
dialogClose():any{
  this.dialogRef.close();
}
dateFormet(utcDate:string){
  return new Date(utcDate).toLocaleString();
}
}

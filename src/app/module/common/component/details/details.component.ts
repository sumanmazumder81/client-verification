import { Component, OnInit, Input, ViewEncapsulation, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { vendorEntityType } from '../../../../enums/vendorsEntity.enum';
import { Router, ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { ServicesService } from '../../../../services/services.service';
import { ConsoleLogService } from '../../../../services/console-log.service';
import { ToasterService } from '../../../../services/toaster.service';
import { FormGroup, FormControlName, FormControl, Validators } from '../../../../../../node_modules/@angular/forms';
import {Location} from '@angular/common';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsComponent implements OnInit {
  public vendorEntityType = vendorEntityType.BROKER;
  public loader:boolean = false;
  public contactInformation:any[] = [];
  public otherInformations:any[] = [];
  public entityId:number;
  public getEntityType : any;
  public verificationForm : FormGroup;
  public allEntityData : any;
  public btnStatus: boolean;
  constructor(
    private _router: Router,
    private services: ServicesService,
    private activeRouter : ActivatedRoute,
    private consoleLog: ConsoleLogService,
    private toaster: ToasterService,
    private location: Location,
  ) {
    this.verificationForm = new FormGroup({
      comment : new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.getUrl();
    this.verificationForm.valueChanges.subscribe(()=>{
      console.log(this.verificationForm);
    });

  }
  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
  }
  dialogClosed(data:any){
    if(data == true){
      console.log(data);
      this.getUrl();
    }
  }
  // page load data show
  getUrl(){
    this.loader = true;
    const id = this.activeRouter.snapshot.paramMap.get('id');
    this.activeRouter.queryParams.subscribe((res:any)=>{
      console.log(res.entityType);
      this.getEntityType = res.entityType;
    })
    this.consoleLog.log(id);
    console.log(this.getEntityType);
    let url = `${this.getEntityType}/${id}`;
    this.services.verificationGet(url).subscribe(
      (success: any)=>{
        console.log(success);
        if(success.Media){
          let imageStatus = success.Media.every((item:any)=> item.Status == "Approved");
          console.log(imageStatus)
          // let contactStatus = success.ContactInformation.every((item:any)=> item.Status == "Approved");
          let contactStatus = success.ContactInformation?.every((element:any) => {
            return element.contactList.every((item:any)=>{
              return item.Status == "Approved";
            })
          });
          console.log(contactStatus);
          console.log(success.ContactInformation);
          contactStatus && imageStatus ? this.btnStatus = true : !success.ContactInformation?.length && imageStatus ? this.btnStatus = true : this.btnStatus = false;
          console.log(this.btnStatus);
        }
        this.allEntityData = success;
        this.consoleLog.log(this.allEntityData);
        this.entityId = success.Id;
        if(success.Meta?.VerificatonComment){
          this.verificationForm.patchValue({comment: success.Meta.VerificatonComment});
        }
        this.contactInformation = success.ContactInformation;
        this.otherInformations = success?.OtherInformation.map((item:any)=>{
          if(item.Title === 'Aadhaar Information'){
            item.imageData = success.Media.filter((e:any)=> {
              if(e.KeyName.includes('aadhar')){
                console.log("Photo key name", e.KeyName);
                e.image = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}.jpg`;
                e.thumbImage = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}.jpg`;
                e.title = e.KeyName;
                return e;
              }
            });
            item.address = success.AddressInformation.primary;
          }if(item.Title === 'Pan Information'){
            item.imageData = success.Media.filter((e:any)=>{
              if(e.KeyName.includes('pan')){
                e.image = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}.jpg`;
                e.thumbImage = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}.jpg`;
                return e;
              }
            })
          }
          if(item.Title === 'Company Information'){
            item.imageData = success.Media.filter((e:any)=>{
              if(e.KeyName.includes('self_photo')){
                e.image = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}`;
                e.thumbImage = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}`;
                return e;
              }
            })
          }
          if(item.Title === 'Licence Information'){
            item.imageData = success.Media.filter((e:any)=>{
              if(e.KeyName.includes('licence')){
                e.image = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}`;
                e.thumbImage = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}`;
                return e;
              }
            })
          }
          if(item.Title === 'Road Tax Information'){
            item.imageData = success.Media.filter((e:any)=>{
              if(e.KeyName.includes('road_tax')){
                e.image = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}`;
                e.thumbImage = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}`;
                return e;
              }
            })
          }
          if(item.Title === 'RC Permit Information'){
            item.imageData = success.Media.filter((e:any)=>{
              if(e.KeyName.includes('rc_card')){
                e.image = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}`;
                e.thumbImage = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}`;
                return e;
              }
            })
          }
          if(item.Title === 'National Permit Information'){
            item.imageData = success.Media?.filter((e:any)=>{
              if(e.KeyName.includes('national_permit_number')){
                e.image = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}`;
                e.thumbImage = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}`;
                return e;
              }
            })
          }
          if(item.Title === 'Insurance Number Information'){
            item.imageData = success.Media?.filter((e:any)=>{
              if(e.KeyName.includes('insurance')){
                e.image = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}`;
                e.thumbImage = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}`;
                return e;
              }
            })
          }
          if(item.Title === 'Pollution Number Information'){
            item.imageData = success.Media?.filter((e:any)=>{
              if(e.KeyName.includes('pollution_number')){
                e.image = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}`;
                e.thumbImage = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}`;
                return e;
              }
            })
          }
          if(item.Title === 'Fitness Certificated Information'){
            item.imageData = success.Media?.filter((e:any)=>{
              if(e.KeyName.includes('fitness_certificated')){
                e.image = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}`;
                e.thumbImage = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}`;
                return e;
              }
            })
          }
          if(item.Title === 'EMI Group Information'){
            item.imageData = success.Media?.filter((e:any)=>{
              if(e.KeyName.includes('emi_group')){
                e.image = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}`;
                e.thumbImage = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}`;
                return e;
              }
            })
          }
          if(item.Title === 'Other Documents Information'){
            item.imageData = success.Media?.filter((e:any)=>{
              if(e.KeyName.includes('other_documents')){
                e.image = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}`;
                e.thumbImage = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}`;
                return e;
              }
            })
          }
          if(item.Title === 'Vehicles Age Information'){
            item.imageData = success.Media?.filter((e:any)=>{
              if(e.KeyName.includes('vehicle')){
                e.image = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}`;
                e.thumbImage = `https://verify-dev.formulanextexpress.com/api/Photos?entityType=${this.getEntityType}&entityId=${success.Id}&photoKey=${e.KeyName}`;
                return e;
              }
            })
          }
          return item;
        });
        console.log(this.otherInformations);
      },(error:any)=>{
        this.consoleLog.log(error);
        this.loader = false;
        this.toaster.showError(error.error.Message, '');
      },()=>{
        this.loader = false;
      }
    )
  }

  // output value given by child data
  imageStatus(data:any){
    // console.log(data);
    // if(data == false){
    //   this.btnStatus1 = false;
    // }else{
    //   this.btnStatus1 = true;
    // }
  }
  contactStatus(data:any){
    // console.log(data);
    // if(data == true){
    //   this.btnStatus2 = true;
    // }
  }
  // Approved button
  submitApproved(){
    this.loader = true;
    const url = `Verification/verify`;
    const entityData = {
      "entityId":this.entityId,
      "entityType": this.getEntityType,
      "isApproved": true,
      "comment": this.verificationForm.value.comment
    }
    console.log(entityData);
    this.services.post(url, entityData).subscribe(
      (success:any)=>{
        console.log(success);
        this.loader = false;
        this.toaster.showSuccess('All document are verified', '');
        this._router.navigate([`/dashboard/${this.getEntityType}`]);
      },(error: any)=>{
        this.toaster.showError(error.error.Message, '');
        console.log(error.error.Message);
        this.loader = false;
        this._router.navigate([`/dashboard/${this.getEntityType}`]);
      },()=>{
        this.loader = false;
        this._router.navigate([`/dashboard/${this.getEntityType}`]);
      }
    )
  }
  // Decline button
  submitDecline(){
    this.loader = true;
    const url = `Verification/verify`;
    const entityData = {
      "entityId":this.entityId,
      "entityType": this.getEntityType,
      "isApproved": false,
      "comment": this.verificationForm.value.comment
    }
    console.log(entityData);
    this.services.post(url, entityData).subscribe(
      (success:any)=>{
        console.log(success);
        this.loader = false;
        this.toaster.showSuccess('All document are not approved', '');
        this._router.navigate([`/dashboard/${this.getEntityType}`]);
        // this.location.back();
      },(error: any)=>{
        console.log(error);
        this.loader = false;
        this.toaster.showError(error.error.Message, '');
        this._router.navigate([`/dashboard/${this.getEntityType}`]);
      },()=>{
        this.loader = false;
      }
    )
  }
}

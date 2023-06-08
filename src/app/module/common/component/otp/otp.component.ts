import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '../../../../../../node_modules/@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ServicesService } from '../../../../services/services.service';
import { ConsoleLogService } from '../../../../services/console-log.service';
import { ToasterService } from '../../../../services/toaster.service';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  // encapsulation: ViewEncapsulation.none,
})
export class OtpComponent implements OnInit {
  public loader : boolean = false;
  public otp: string;
  public otpVerification : FormGroup = new FormGroup({
    otpNumber : new FormControl('', Validators.required),
  });
  public resetTime: any;
  public timerOn :boolean = true;

  constructor(
    public dialogRef: MatDialogRef<OtpComponent>,
    @Inject(MAT_DIALOG_DATA) public contactData: any,
    private consoleLogService: ConsoleLogService,
    private servicesService: ServicesService,
    private toaster: ToasterService,
  ) {
  }

  ngOnInit(): void {
    console.log(this.contactData);
    this.timer(120);
  }

// resent OTP
  public timer(remaining:number){
    let m = Math.floor(remaining / 60);
    let s = remaining % 60;
    this.resetTime = m + ":" + s;
    remaining -= 1;
    if(remaining >= 0 && this.timerOn) {
      setTimeout(()=>{
        this.timer(remaining);
      }, 1000);
      return;
    }else{
      this.timerOn = false;
    }
  }

  onOtpChange(data: string){
    console.log(data);
    this.otp = data;
  }
  submitOtp(){
    this.loader = true;
    const url = `ContactVerification/verifyOtp`;
    const contactData= {
      "entityId": this.contactData.entityId,
      "entityType": this.contactData.entityType,
      "otp": this.otp,
      "contactNumber": this.contactData.contactNumber
    }
    console.log(contactData);
    this.servicesService.post(url, contactData).subscribe(
      (success:any)=>{
        // this.consoleLogService.log(success);
        console.log(success.Message);
        this.toaster.showSuccess(contactData.contactNumber, success.Message);
        this.dialogRef.close();
        this.loader = false;
      },(error: any)=>{
        console.log(error);
        this.dialogRef.close();
        this.loader = false;
        this.toaster.showError(error.error.Message, contactData.contactNumber);
      },()=>{
        this.dialogRef.close();
        this.loader = false;
      }
    )
  }
  resentOtp(){
    this.loader = true;

    const contactData= {
      "entityId": this.contactData.entityId,
      "entityType": this.contactData.entityType,
      "contactNumber": this.contactData.contactNumber
    }
    const url = `ContactVerification/sendOtp`;
    this.servicesService.post(url, contactData).subscribe(
      (success:any)=>{
        this.consoleLogService.log(success);
        this.toaster.showSuccess(contactData.contactNumber, 'we are send Otp this number' );
        this.loader = false;
        this.timerOn = true;
        this.timer(120);
      },(error:any)=>{
        this.consoleLogService.log(error);
        this.toaster.showError(error.error.Message, contactData.contactNumber);
        this.loader = false;
      },()=>{
        this.loader = false;
      }
    )
  }
}

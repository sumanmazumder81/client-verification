import { Component, OnInit, Input, SimpleChanges, AfterViewInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { OtpComponent } from '../otp/otp.component';
import { ServicesService } from '../../../../services/services.service';
import { ConsoleLogService } from '../../../../services/console-log.service';
import { ToasterService } from '../../../../services/toaster.service';
@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactCardComponent implements OnInit {
  public loader : boolean = false;
  public myDialog = new MatDialogConfig();
  @Input('contactInformation') contactInformation:any[] = [];
  @Input('entityId') entityId:number;
  @Input('entityType') entityType:string;
  @Output() contactStatus: EventEmitter<boolean> = new EventEmitter();
  @Output() dialogClosed: EventEmitter<any> = new EventEmitter();
  public contactData = {}
  public allContactStatus: boolean;
  constructor(
    public dialog: MatDialog,
    private servicesService: ServicesService,
    private consoleLogService: ConsoleLogService,
    private toaster: ToasterService,
  ) {
    this.myDialog.disableClose = false;
    this.myDialog.autoFocus = false;
    this.myDialog.width = '600px';
   }

  ngOnInit(): void {
    console.log(this.contactInformation);
  }
  ngOnChanges(changes: SimpleChanges){
    // console.log(changes.currentValue)
    this.allContactStatus = changes['contactInformation'].currentValue.every((item:any)=>{
      return item.contactList.every((element:any) => {
        console.log(element);
        return element.Status == "Approved";
      });
    })
    console.log(this.allContactStatus);
    // changes['contactInformation'].currentValue.forEach((element:any) => {
    //     this.contactStatus.emit(element.Status);
    // });
    // let approvedStatus = changes['contactInformation'].currentValue.every((item:any) => item.Status == "Approved");
    // this.contactStatus.emit(approvedStatus);
  }
  // ngAfterViewInit() {
  //   console.log(this.entityType);
  // }

  // api call
  openDialog(data:any): void{
    console.log(data);
    this.loader = true;
    let contactData = {
      "entityId": this.entityId,
      "entityType": this.entityType,
      "contactNumber": data.contactNo
    }
    console.log(contactData);
    this.myDialog.data = contactData;
    const url = `ContactVerification/sendOtp`;
    this.servicesService.post(url, contactData).subscribe(
      (success:any)=>{
        this.consoleLogService.log(success);
        this.toaster.showSuccess(data.contactNo, 'we are send Otp this number');
        this.loader = false;
        this.contactDialog();
      },(error:any)=>{
        this.loader = false;
        this.consoleLogService.log(error);
        this.toaster.showError(data.contactNo, error.error.Message);
      },()=>{
        this.loader = false;
      }
    )
  }
  contactDialog(){
    const dialogRef = this.dialog.open(OtpComponent, this.myDialog);
        dialogRef.afterClosed().subscribe((result:any) => {
          // console.log(result);
          // this.toaster.showError(result.Status.Message, '');
          console.log('The dialog was closed');
          let dialogStatus:boolean = true;
          this.dialogClosed.emit(dialogStatus);
        });

  }
}

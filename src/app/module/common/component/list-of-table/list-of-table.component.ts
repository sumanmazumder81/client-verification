import { Component, OnInit, ViewChild, Input, SimpleChanges, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
// import get from "lodash/get";
import * as _ from 'lodash';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subject, debounceTime } from 'rxjs';
import { Router } from '@angular/router';
import { ConsoleLogService } from '../../../../services/console-log.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { CommentDetailsComponent } from '../comment-details/comment-details.component';
import * as moment from 'moment';
@Component({
  selector: 'app-list-of-table',
  templateUrl: './list-of-table.component.html',
  styleUrls: ['./list-of-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListOfTableComponent implements OnInit {

  // variable name
  public skeletonLoader:boolean = true;
  public displayedColumns: string[] =[];
  public columnData : any;
  // parent to child data transfer
  @Input('tableHeaderData')tableHeaderData: any[] = [];
  @Input('allTableData') allTableData: any;
  @Input('pageSize') pageSize :number = 5;
  @Input('isCallFromBackend') isCallFromBackend : boolean = false;
  @Input('pageIndex')pageIndex: number = 1;
  @Input('dataLength')dataLength : number;

  // data pass to parent component
  @Output() tableEditId : EventEmitter<number> = new EventEmitter;
  @Output() search : EventEmitter<string> = new EventEmitter;
  @Output() setpagination : EventEmitter<any> = new EventEmitter;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tableDatas = new MatTableDataSource<interfacTableData>(tabledata);
  private searchSubject: Subject<string> = new Subject();
  public myDialog = new MatDialogConfig();
  public loader:boolean = false;
  public noteLength : boolean = false;
  public moment = moment;

  constructor(
    private routers: Router,
    private consoleLogService: ConsoleLogService,
    public dialog: MatDialog,
  ) {
    this.myDialog.disableClose = false;
    this.myDialog.autoFocus = false;
    this.myDialog.width = '600px';
  }
  ngOnInit(): void {
    this.displayedColumns = this.tableHeaderData.map((element:any) => element.key);
    this.columnData = this.displayedColumns.length;
    this.searchSubject.pipe(debounceTime(500)).subscribe((e: string)=>{
      this.search.emit(e);
    })
  }
  ngOnChanges(changes: SimpleChanges){
    // this.consoleLogService.log(changes['allTableData'].currentValue);
    if(changes['allTableData']?.currentValue && (changes['allTableData']?.currentValue.length > 0 || changes['allTableData']?.currentValue.length === 0)){
      this.skeletonLoader = false;
      console.log(changes['allTableData'].currentValue);
      this.tableDatas = new MatTableDataSource<interfacTableData>(changes['allTableData'].currentValue);
      setTimeout(() => {
        this.tableDatas.sort = this.sort;
      }, 500);
      if(!this.isCallFromBackend){
        this.tableDatas.paginator = this.paginator;
      }else{
        this.paginator.pageIndex = this.pageIndex - 1;
        this.paginator.length = this.dataLength;
        this.paginator.pageSize = this.pageSize;
      }
    }
    // changes['allTableData'].currentValue.forEach((element:any) => {
    //   if(element.notes.length > 10){
    //     this.noteLength = true;
    //     alert("Length");
    //   }
    // });
  }

  ngAfterViewInit() {
    // this.consoleLogService.log(this.search.emit());
  }
  onChangePage(pe:PageEvent) {

    // this.consoleLogService.log(pe);
    console.log(this.tableDatas);
    if(this.isCallFromBackend){
      this.skeletonLoader = true;
      this.allTableData.data = [];
      this.setpagination.emit({pageIndex: pe.pageIndex, pageSize: pe.pageSize})
    }
  }
  applyFilter(event:any) {
    if(this.isCallFromBackend) {
      this.skeletonLoader = true;
      this.allTableData.data = [];
      this.searchSubject.next(event);
    }else{
      this.allTableData.filter = event.trim().toLowerCase();
    }
  }
  edit(id: number): void{
    console.log(id);
    this.tableEditId.emit(id);
  }
  getSellData(element:any, key:any){
    // console.log(element)
    return _.get(element, key) ? _.get(element, key) : '';
  }
  readComment(data:any){
    this.loader = true;
    this.myDialog.data = {
      data: data,
    }
    if(data){
      this.loader = false;
      this.dialog.open(CommentDetailsComponent, this.myDialog);
    }
  }
}
export interface interfacTableData {
  vendorCode?: number;
  status?: boolean;
  name?: string;
  contactNo?: number;
  action?: any;
  comment?: string;
  Id?: number;
  RegistrationNumber?: string;
  VehicleType?: string;
  VehicleVeriant?: string;
}
const tabledata: interfacTableData[] = [];

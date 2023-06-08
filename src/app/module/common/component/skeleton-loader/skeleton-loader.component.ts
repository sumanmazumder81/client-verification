import { Component, OnInit, ChangeDetectorRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss']
})
export class SkeletonLoaderComponent implements OnChanges {
  @Input() paginationData : any;
  @Input() columns : any;
  public row = new Array();
  public column :any[]= [];
  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cdRef.detectChanges();
    // console.log(this.columns);
    for(let index = 0; index < this.columns; index++){
      this.column.push(index);
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['paginationData']);
    if(changes['paginationData'].currentValue){

      this.fillInNumber(changes['paginationData'].currentValue);
    }
  }
  fillInNumber(n:number){
    // console.log(n);
    return Array(n).fill(0).map((index:any)=>{
      this.row.push(index);
      return index + 1;
    })
  }

}

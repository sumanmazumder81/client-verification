import { Component, OnInit, Inject } from '@angular/core';
import { ServicesService } from '../../../../services/services.service';
import { MAT_DIALOG_DATA } from '../../../../../../node_modules/@angular/material/dialog';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.scss']
})
export class CommentDetailsComponent implements OnInit {
  constructor(
    private services : ServicesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    // console.log(this.data.data);
  }

}

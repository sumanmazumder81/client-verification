import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input('vendorEntityType') vendorEntityType :string;
  constructor() { }

  ngOnInit(): void {
  }
  clicked(){
    // alert("click");
    let sidebar = document.getElementsByClassName("sidebar")[0].classList.toggle('full-width');
    // document.getElementsByClassName("sidebar")[0].classList.remove('full-width');
    // sidebar.classList.add("mystyle");
    console.log(sidebar);
  }
}

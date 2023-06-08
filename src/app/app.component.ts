import { Component } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
// import { ConnectionService } from 'ngxc-connection-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isConnected: boolean = false;
  noInternetConnection: boolean;
  title = 'client-verification';
  constructor(private connectionService: ConnectionService) {
    this.isConnected = navigator.onLine ? true : false;
    this.checkTheInternetConnection();

  }

  checkTheInternetConnection(){
    this.connectionService.monitor().subscribe((isConnected:any) => {
       this.isConnected = isConnected;
       if (this.isConnected) {
         this.isConnected=isConnected;
       }
       else {
         this.isConnected=isConnected;
       }
     })
  }


}

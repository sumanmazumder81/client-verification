import { Injectable } from '@angular/core';
import { Route, Routes, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SidePanelService {
  private _caller = '';
  getCaller(data: string){
    this._caller = data;
    console.log(this._caller);
    // this.navigateToCaller(this._caller);
    // return this._caller;

  }
  constructor(private router: Router) { }
  // userEntities(data:any){
  //   const url = this.apiService.getUrl("userEntities");
  //   return this.http.post(url, data);
  // }
  setCurrentCaller(caller: string){
    this._caller = caller;
    console.log(this._caller);
    //
  }
  // navigateToCaller(_caller){
  //   switch (_caller){
  //     case this._caller === "owner":
  //       this.router.navigateByUrl('dashboard/vehicle');
  //       console.log("router");
  //       break;
  //   }
  // }
  // getUserData(id){
  //   const url = this.apiService.getUrl(`UserEntities/${id}`);
  //   return this.http.get(url);
  // }
}

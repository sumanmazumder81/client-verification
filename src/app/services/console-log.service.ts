import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsoleLogService {

  constructor() { }
  log(data:any){
    console.log(data);
  }
}

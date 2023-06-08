import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keys'})
export class KeyPipe implements PipeTransform {
  transform(value:any, args:string[]) : any {
    console.log(value);
    let keys = [];
    for (let key in value) {
      console.log(key);
      keys.push(key);
    }
    return keys;
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
  ) { }

  public getUrl(url: string): string {
    return `${environment.apiEndPoint}/${url}`;
  }
  public verificationGetUrl(url: string): string{
    return `${environment.verificationApiEndPoint}/${url}`;
  }
  get(url:string){
    return this.http.get(this.getUrl(url));
  }
  verificationGet(url: string){
    return this.http.get(this.verificationGetUrl(url))
  }
  post(url:string, body: any){
    return this.http.post(this.verificationGetUrl(url), body);
  }
  put(url:string, body: any){
    return this.http.put(this.getUrl(url), body);
  }
  delete(url:string){
    return this.http.delete(this.getUrl(url));
  }
  patch(url:string, body:any){
    return this.http.patch(this.getUrl(url), body);
  }
  getId(url: string){
    return this.http.get(this.getUrl(url))
  }
}

import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }
  token: string
  public url:string='api/user/'
  userPostService(url,body){
    url = this.url + url;
    this.token = localStorage.getItem('token');
    return this.httpService.postServiceAuthentication(url,body, this.token);
  }

  userPost(url,body){
    url = this.url + url;
    return this.httpService.postService(url,body);
  }
} 

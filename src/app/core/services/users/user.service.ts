import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userService: HttpService) { }
  public url='api/user/'
  userPostService(url,login){
    url = this.url + url;
    console.log(url);
    return this.userService.postServiceAuthentication(url,login)
  }

  userPost(url,body){
    url = this.url + url;
    return this.userService.postService(url,body)
  }

  userGetService(url){
    url = this.url + url;
    return this.userService.getService(url)
  }
} 

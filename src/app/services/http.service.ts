import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  server_url = 'http://34.213.106.173/';
  constructor(private http: HttpClient) { }


  // to get list of services 
  getService(url) {
    url = this.server_url + url;
    return this.http.get<any>(url);
  }
  
  //post service without authentication
  postService(url, user) {
    url = this.server_url + url;
    return this.http.post<any>(url, user);
  }


  //pst service with authentication
  postServiceAuthentication(url, data, token) {
    url = this.server_url + url;
    var httpAuthenticate = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })

    };
    return this.http.post(url,data, httpAuthenticate);
  }

  postServiceAuth(url, data, token) {
    url = this.server_url + url;
    var httpAuthenticate = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })

    };
    return this.http.post(url,this.getFormUrlEncoded(data), httpAuthenticate);
  }

  //get service with authentication
  getNotesList(url, token){
    url = this.server_url + url;
    var httpAuthenticate = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })

    };
    return this.http.get(url, httpAuthenticate);

  }

  //post service with body empty and authentication
  userLogout(url, token) {
    url = this.server_url + url;
    var httpAuthenticate = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })

    };
    return this.http.post(url, {}, httpAuthenticate);
  }

 
deleteLabel(url){
  url = this.server_url + url;
  return this.http.delete(url);
}

imageUpload(url,file,token) {
  url = this.server_url + url;
    var httpAuthenticate = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.post(url,file, httpAuthenticate);
}

// httpAddImage(nexturl,body,token){
//   console.log(token);
//   var httpOptions={
//     headers:new HttpHeaders({
//      'Authorization':token
//     })
//   };
//   return this.http.post(this.url+"/"+nexturl,body,httpOptions)
// }
  //post service for reset password
  resetPassword(url, data, token) {
    url = this.server_url + url;
    var httpAuthenticate = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })
    };
    return this.http.post(url, this.getFormUrlEncoded(data), httpAuthenticate);
  }


  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }


}


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  server_url = 'http://34.213.106.173/';
  constructor(private http: HttpClient) { }

  getService(url) {
    url = this.server_url + url;
    return this.http.get<any>(url);
}

postService(url,user) {
  url = this.server_url + url;
  return this.http.post<any>(url, user);   
}

saveNote(url,data,token) {
  url = this.server_url + url;
  var httpAuthenticate = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })

  };
  return this.http.post(url,data,httpAuthenticate);
}

deleteNote(url,data,token){

  url = this.server_url + url;
  var httpAuthenticate = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })

  };
  return this.http.post(url,data,httpAuthenticate);

}

getNotesList(url,token) {
  url = this.server_url + url;
  var httpAuthenticate = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })

  };
  return this.http.get(url,httpAuthenticate);

}
userLogout(url,token) {
  url = this.server_url + url;
  var httpAuthenticate = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })

  };
  return this.http.post(url,{},httpAuthenticate);
}

getUserData(url) {
  url = this.server_url + url; 
  return this.http.get<any>(url);
}
resetPassword(url, data, token) {
  console.log(token);
  console.log(data);

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


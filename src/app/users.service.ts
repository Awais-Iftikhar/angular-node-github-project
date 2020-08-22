import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Subject } from 'rxjs';

const clientid = `${environment.githubclientid}`;
const clientsecret = `${environment.githubclientsecret}`;
const backendurl = `${environment.apiurl}`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
userdata: any;
private user = new Subject<User[]>();

  constructor(private http: HttpClient) { }

  getgithubuser(user) {
    this.http.get(`https://api.github.com/users/${user}?clientid=${clientid}&client_secret=${clientsecret}`)
    .subscribe(res => {
      console.log(res);
      this.userdata = res;
      this.user.next(this.userdata);
     }, err => {
       this.userdata = err.error.message;
       this.user.next(this.userdata);
    });
  }
  updateui() {
    return this.user.asObservable();
  }

  saveuserdata(data) {
    return this.http.post(`${backendurl}/user` , data);
  }

  fetchalldata() {
    return this.http.get(`${backendurl}/details`);
  }

  alert(msg, clasname) {

    const alert = document.querySelector('.alert');
    if (alert) {
        alert.remove();
    }

    const div = document.createElement('div');
    div.className = clasname;
    const text = document.createTextNode(msg);
    div.appendChild(text);
    const cont = document.querySelector('#searchcontainer');
    const head = document.querySelector('#head');
    cont.insertBefore(div, head);

    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000 );

  }


}

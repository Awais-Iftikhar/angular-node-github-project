import { UsersService } from './../../users.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/user';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
  userdata: any;
  userchecks;
userform: FormGroup;
  constructor(private service: UsersService) { }

  ngOnInit() {
    this.userform = new FormGroup({
      name : new FormControl(null, Validators.required),
    });
  }
  updatesearch(e) {
    if (e.target.value === '') {
      this.userdata = undefined;
     }
  }
  getname() {
    return this.userform.get('name');
  }
  add(form) {
    if (form.invalid) {
      this.service.alert('user name is required' , 'alert alert-danger mt-2');
      return;
    }
    this.service.getgithubuser(form.value.name);
    this.service.updateui().subscribe(res => {
      this.userdata = res;
      if (this.userdata === 'Not Found') {
        this.service.alert('user not found', 'alert alert-danger mt-2');
      } else {
        if (this.userdata.bio == null) {
          this.userdata.bio = 'not defined';
        }
        if (this.userdata.location == null) {
          this.userdata.location = 'not set';
        }
      }
    });
  }
  alldata(data) {
    const postdata = {
      userid: data.id,
      name: data.avatar_url,
      bio: data.bio,
      location: data.location,
      type: data.type,
      publicrepos: data.public_repos,
      gists: data.public_gists,
      followers: data.followers,
      following: data.following,
      created: data.created_at
    };
    this.service.saveuserdata(postdata).subscribe(res => {
      this.service.alert('user registered successfully', 'alert alert-success mt-2');
      this.userform.setValue({ name: '' });
      this.userdata = undefined;
    }, err => {
      this.service.alert('user already registered' , 'alert alert-warning mt-2');
    });
  }
}

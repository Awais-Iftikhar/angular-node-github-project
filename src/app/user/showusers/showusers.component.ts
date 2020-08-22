import { UsersService } from './../../users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showusers',
  templateUrl: './showusers.component.html',
  styleUrls: ['./showusers.component.css']
})
export class ShowusersComponent implements OnInit {
userdata;
isloading = true;
  constructor(private service: UsersService) { }

  ngOnInit() {
   this.service.fetchalldata().subscribe(res => {
     this.isloading = false;
     this.userdata = res;
  });
  }

}

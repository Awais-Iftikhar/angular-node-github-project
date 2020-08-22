import { ShowusersComponent } from './user/showusers/showusers.component';
import { CreateuserComponent } from './user/createuser/createuser.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '' , component: CreateuserComponent},
  {path: 'users' , component: ShowusersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

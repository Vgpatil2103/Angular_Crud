import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFormComponent } from './Components/add-form/add-form.component';
import { ViewDataComponent } from './Components/view-data/view-data.component';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
import { LoginSignupComponent } from './Components/login-signup/login-signup.component';
import {authGuard} from "./auth.guard"
const routes: Routes = [
  {path:'add-data',component:AddFormComponent,canActivate:[authGuard]},
  {path:'view-data',component:ViewDataComponent,canActivate:[authGuard]},
  {path:'login',component:LoginSignupComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'**',component:PagenotfoundComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpServicesService } from 'src/app/Services/emp-services.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent {
  loginForm: FormGroup;
  loginData:any={};
  constructor(private fb: FormBuilder, private service: EmpServicesService,private route:Router) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit(){
    if(localStorage.getItem('adminDetails')){
      this.service.isAdminLoggedIn.next(true);
      this.route.navigate(['/add-data'])
    }
  }

  validateUser() {
    this.loginData = this.loginForm.value;
    this.service.loginUser(this.loginData)
  }
  
}

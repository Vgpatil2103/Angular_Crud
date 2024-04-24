import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmpServicesService } from 'src/app/Services/emp-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private route:Router,private service:EmpServicesService){}
  logout(){
    localStorage.removeItem('adminDetails');
    this.service.isAdminLoggedIn.next(false);
    this.route.navigate(['/login']);
  }
}

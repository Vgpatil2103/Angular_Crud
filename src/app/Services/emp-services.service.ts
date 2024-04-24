import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class EmpServicesService {

  constructor(private http:HttpClient,private route:Router
  ) { }

  isAdminLoggedIn=new BehaviorSubject<boolean>(false);

  postData(data:any){
    return this.http.post('http://localhost:3000/empFromData',data);
  }

  getData(){
    return this.http.get('http://localhost:3000/empFromData');

  }

  getDatabyId(id:any){
    return this.http.get(`http://localhost:3000/empFromData/${id}`);

  }

  deleteById(id:any){
    return this.http.delete(`http://localhost:3000/empFromData/${id}`)
  }

  postUpdatedData(id:any,Data:any){

    return this.http.put(`http://localhost:3000/empFromData/${id}`,Data)

  }

  loginUser(data:any){

    return this.http.get(`http://localhost:3000/adminDetails?email=${data.email}&password=${data.password}`).subscribe((res:any)=>{
      if(res.length>0){
        alert("Login succesfull")
        localStorage.setItem("adminDetails",JSON.stringify(res));
        this.isAdminLoggedIn.next(true);
      this.route.navigate(['/add-data'])
      }
      else{
        alert("login Failed");
      }
      
    })
  }
}

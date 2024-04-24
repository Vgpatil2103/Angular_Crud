import { Component, Inject } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpServicesService } from 'src/app/Services/emp-services.service';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.css']
})
export class UpdateDataComponent {

  updateForm!: FormGroup;

  updateData:any;
  constructor(private fb:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any,private service:EmpServicesService){
   
  }

  initialozeForm(){
  
   this.updateForm=this.fb.group({

      name:[this.updateData.name ],
      lname:[this.updateData.lname],
      email:[this.updateData.email,Validators.email],
      phoneNo:[this.updateData.phoneNo],
      city:[this.updateData.city],
      department:[this.updateData.department],
      salary:[this.updateData.salary]
      
    })
  }
  ngOnInit(){
    this.service.getDatabyId(this.data).subscribe((res)=>{
      console.log(res)
      this.updateData=res;
      this.initialozeForm()
    }
  )}

  

  updatetheData(){
    const id=this.data;
    this.service.postUpdatedData(id,this.updateForm.value).subscribe((res)=>{
      console.log(id);
      alert('Data Updation Succesfull');
      window.location.reload();
    })

  }
}

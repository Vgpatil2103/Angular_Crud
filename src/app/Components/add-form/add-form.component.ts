import { Component } from '@angular/core';
import { FormBuilder,FormArray,FormGroup, Validators } from '@angular/forms';
import { EmpServicesService } from 'src/app/Services/emp-services.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})



export class AddFormComponent {

  empForm:FormGroup;

  constructor(private fb:FormBuilder,private service:EmpServicesService){
    this.empForm=this.fb.group({
      name:['',Validators.required],
      mname:['',Validators.required],
      lname:['',Validators.required],
      email:['',(Validators.required,Validators.email)],
      phoneNo:['',Validators.required,Validators.max(10)],
      city:['',Validators.required],
      gender:['',Validators.required],
      dob:['',Validators.required],
      department:['',Validators.required],
      salary:['',Validators.required],
      mAadhar:['',Validators.required],
      fAadhar:['',Validators.required],
      skills:this.fb.array([
        this.fb.control(''),
       
      ])

    })

    this.empForm.get('gender')?.valueChanges.subscribe(gender => {
      if (gender === 'male') {
        this.empForm.get('mAadhar')?.setValidators(Validators.required);
        this.empForm.get('fAadhar')?.clearValidators();
      } else if (gender === 'female') {
        this.empForm.get('fAadhar')?.setValidators(Validators.required);
        this.empForm.get('mAadhar')?.clearValidators();
      }
  
      this.empForm.get('mAadhar')?.updateValueAndValidity();
      this.empForm.get('fAadhar')?.updateValueAndValidity();
    });
  }

  

  get control(){
    return this.empForm.controls;
  }


  get skillarr(){
    return this.empForm.get('skills')as FormArray;
  }

  postData(){

    this.service.postData(this.empForm.value).subscribe((res)=>{
      console.log(res);
      alert("Data Saved Succefully");
      this.empForm.reset();
      this.empForm.get('skills')?.reset();
    })


  }


  addSkills(){
    const skillArray=this.empForm.get('skills') as FormArray
    skillArray.push(this.fb.control('',[Validators.required]))
  }

  reset(){
    this.empForm.reset();
  }


}

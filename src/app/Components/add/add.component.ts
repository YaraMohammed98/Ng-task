
import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl, Validators, FormBuilder } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { EmployeesService } from '../../Services/employees.service';
import {Router} from "@angular/router";



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{
  EmpForm:FormGroup;
  submitted=false;
  constructor(public modalRef: MdbModalRef<AddComponent> , private fb:FormBuilder,private EmpService:EmployeesService,private router: Router) {

  }
  ngOnInit(): void {

    this.EmpForm= this.fb.group({
      empName: ['',Validators.required],
      empEmail: ['',[Validators.required , Validators.email ]],
      empAddress: ['',Validators.required],
      empPhone: ['',[Validators.required , Validators.pattern('^01[012][0-9]{8}$')]]
 });


  }
  get empFormControl() {
    return this.EmpForm.controls;
  }
  addEmp(){
    this.submitted=true;
    if (this.EmpForm.valid) {
      this.EmpService.addEmployee(this.EmpForm.value).subscribe({
        next:(res)=>{
      //snack bar todo
    },
        error:()=>{

        }
      });
      console.log(this.EmpForm.value)
      this.modalRef.close()


    }
  }
}

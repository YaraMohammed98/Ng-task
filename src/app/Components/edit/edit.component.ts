import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FormGroup ,FormControl, Validators, FormBuilder } from '@angular/forms';
import { EmployeesService } from 'src/app/Services/employees.service';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  UpdatedForm:FormGroup;
  submitted=false;
  EmptoUpdate:any
  constructor(private route: ActivatedRoute,public modalRef: MdbModalRef<EditComponent> , private fb:FormBuilder,private EmpService:EmployeesService,private modalService: MdbModalService) {
    this.route.queryParams.subscribe(params => {
      this.EmptoUpdate=params;

  });
  }
  ngOnInit(): void {
    this.UpdatedForm= this.fb.group({
      empId: +[this.EmptoUpdate.empId],
      empName: [this.EmptoUpdate.empName,Validators.required],
      empEmail: [this.EmptoUpdate.empEmail,[Validators.required , Validators.email ]],
      empAddress: [this.EmptoUpdate.empAddress,Validators.required],
      empPhone: [this.EmptoUpdate.empPhone,[Validators.required , Validators.pattern('^01[012][0-9]{8}$')]]

 });

  }

  get empFormControl() {
    return this.UpdatedForm.controls;
  }

 UpdateEmp(){
  this.submitted=true;
  if (this.UpdatedForm.valid) {
    this.EmpService.editEmployee(this.UpdatedForm.value).subscribe({
      next:(res)=>{
  },
      error:(err)=>{
        console.log(err)
      }
    });
    console.log(this.UpdatedForm.value)
    this.modalRef.close()

  }

 }
}

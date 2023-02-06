import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/Services/employees.service';
import { IEmployee } from '../../Models/iemployee';
import {Router, NavigationExtras} from "@angular/router";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { EditComponent } from '../edit/edit.component';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';





@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})


export class IndexComponent implements OnInit {

  modalRef: MdbModalRef<EditComponent>;
  checkedIds:IEmployee[]=[]
  dtOptions: DataTables.Settings = {};
  displayTable: boolean = false;
  showLoader: boolean = false;

  EmpList: IEmployee[]=[];
  constructor(private EmpService:EmployeesService,private router: Router,private modalService: MdbModalService,private spinner: NgxSpinnerService,private dialog: MatDialog,){}




   getAllEmp(){
    this.spinner.show();
    this.EmpService.getAllEmployees().subscribe({
      next:(Empolyees)=>{
        setTimeout(() => {
          this.spinner.hide();
        }, 5000);
        this.EmpList=Empolyees
        this.displayTable = true;
      },
      error:(err)=>{
        console.log(err)
      }
    });
  }

  ngOnInit(){
    this.dtOptions={
      pagingType:'simple_numbers',
      // only name and address are orderable
      'columnDefs': [ {
        'targets': [0,2,4,5],
        'orderable': false,
     }],
      pageLength:10,
      ordering:true,
      searching:false,
      lengthChange: false,
    }
     this.getAllEmp();
     this.EmpService.refreshNeeded.subscribe(res=>{
      this.getAllEmp();
     })


}



async editEmp(employee:IEmployee){
    let navigationExtras: NavigationExtras = {
      queryParams:employee,
    }
    await this.router.navigate(["app-edit"], navigationExtras);
    this.modalService.open(EditComponent);


}



deleteEmp(id:any){
  const dialogRef = this.dialog.open(ConfirmationComponent,{
    data:{
      message: 'Are you sure want to delete this employee?',
      buttonText: {
        ok: 'Delete',
        cancel: 'Cancel'
      }
    }
    ,position: {top: '50px'}
    ,width:"450px",
    height:"350px"

  });
  dialogRef.afterClosed().subscribe((confirmed: boolean) => {
    if (confirmed) {
      this.EmpService.deleteEmpByID(id).subscribe();
      this.ngOnInit();
    }
    })
}

checkAllCheckBox(ev: any) {
  this.EmpList.forEach(x => x.checked = ev.target.checked)
}

isAllCheckBoxChecked() {
  return this.EmpList.every(p => p.checked);
}


CheckUncheck(){
  for (let i = 0; i < this.EmpList.length; i++) {
    if(this.EmpList[i].checked && !this.checkedIds.includes(this.EmpList[i])){
      this.checkedIds.push(this.EmpList[i])
    }
  }
  console.log(this.checkedIds)

}

}

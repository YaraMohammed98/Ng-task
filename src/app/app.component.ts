import { Component ,OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddComponent } from './Components/add/add.component';
import { IEmployee } from './Models/iemployee';
import { EmployeesService } from './Services/employees.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from './Components/confirmation/confirmation.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ispressed:boolean=false
  checkedIds:any
  modalRef: MdbModalRef<AddComponent>;
  title = 'task';

  constructor(private modalService: MdbModalService,private EmpService:EmployeesService,private dialog: MatDialog) {

  }

  openModal() {
    this.modalRef = this.modalService.open(AddComponent);
  }



  DeleteMany(){
    this.ispressed=true
    this.checkedIds= document.querySelectorAll('input[type=checkbox]:checked');
    if(this.checkedIds.length!=0){
      const dialogRef = this.dialog.open(ConfirmationComponent,{
        data:{
          message: 'Are you sure want to delete thess employees?',
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
          for (let i = 0; i < this.checkedIds.length; i++) {
            this.EmpService.deleteEmpByID(this.checkedIds[i].value).subscribe();
          }
        }
        })
    }
}

}

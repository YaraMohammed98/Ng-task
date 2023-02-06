import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.development';
import { IEmployee } from '../Models/iemployee';
import { Observable,Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {


  constructor(private httpClient:HttpClient) {
  }


  private _refreshNeeded=new Subject<void>();

  get refreshNeeded(){
    return this._refreshNeeded;
  }


  getAllEmployees():Observable<IEmployee[]>
  {
   return this.httpClient.get<IEmployee[]>(`${environment.APIURL}/getAllEmployees`);
  }


  getEmpByID(empID:number):Observable<IEmployee>
  {
    return this.httpClient.get<IEmployee>(`${environment.APIURL}/getEmpByID/${empID}`);

  }
  addEmployee(newEmp: IEmployee):Observable<IEmployee>{
    return this.httpClient.post<IEmployee>(`${environment.APIURL}/addEmployee`,newEmp).pipe(
      tap(()=>{
        this.refreshNeeded.next();
      })
    )

  }

  deleteEmpByID(empID:number):Observable<IEmployee>{
   return  this.httpClient.get<IEmployee>(`${environment.APIURL}/deleteEmpByID/${empID}`).pipe(
    tap(()=>{
      this.refreshNeeded.next();
    })
  )
  }
  editEmployee(UpdatedEmp:IEmployee):Observable<IEmployee>{
    return  this.httpClient.post<IEmployee>(`${environment.APIURL}/editEmployee`,UpdatedEmp).pipe(
      tap(()=>{
        this.refreshNeeded.next();
      })
    )

  }


}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http' ;
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './Components/add/add.component';
import { EditComponent } from './Components/edit/edit.component';
import { IndexComponent } from './Components/index/index.component';
import {MatIconModule} from '@angular/material/icon';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from "angular-datatables";
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmationComponent } from './Components/confirmation/confirmation.component';






@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    EditComponent,
    IndexComponent,
    ConfirmationComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MdbModalModule,
    ReactiveFormsModule,
    MatIconModule,
    DataTablesModule,
    FormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    BrowserAnimationsModule,
    MatDialogModule






  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

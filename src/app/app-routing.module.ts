import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './Components/edit/edit.component';
import { IndexComponent } from './Components/index/index.component';

const routes: Routes = [
  { path: 'app-edit', component: EditComponent },
  { path: 'app-index', component: IndexComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

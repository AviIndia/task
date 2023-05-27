import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { AuthGuard } from './auth.guard';
import { DeletedTaskComponent } from './deleted-task/deleted-task.component';
import { CompletedTaskComponent } from './completed-task/completed-task.component';


const routes: Routes = [
  /* {path:'login', component:LoginComponent},
  {path: '', pathMatch: 'full', redirectTo: '/login' },
  {path:'create-task', component:CreateTaskComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'edit-task',component:EditTaskComponent}
   */
  { path: 'login', component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'create-task', component: CreateTaskComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'edit-task', component: EditTaskComponent, canActivate: [AuthGuard] },
  { path: 'deleted-task', component:DeletedTaskComponent, canActivate: [AuthGuard] },
  { path: 'completed-task', component:CompletedTaskComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

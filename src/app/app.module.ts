import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TopbarComponent } from './topbar/topbar.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { JwtModule } from '@auth0/angular-jwt';
import { CompletedTaskComponent } from './completed-task/completed-task.component';
import { DeletedTaskComponent } from './deleted-task/deleted-task.component'; // Import JwtModule from '@auth0/angular-jwt'

export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,

    SidebarComponent,
    TopbarComponent,
    CreateTaskComponent,
    EditTaskComponent,
    CompletedTaskComponent,
    DeletedTaskComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    DataTablesModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['example.com'], // Replace with your actual domain
        disallowedRoutes: ['http://example.com/auth/'], // Replace with your actual auth endpoint
      },
    }),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

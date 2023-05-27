import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage!: string | undefined;
  userExists!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginServiceService,
    private route: Router,
    private jwtHelper: JwtHelperService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
    /* this.checkUserExists(); */
  }

 

  onSubmit() {
    const username = this.loginForm.value.userId;
    const password = this.loginForm.value.password;

    this.loginService.getUsers().subscribe((data: any) => {
      console.warn(data);

      const user = data.find(
        (u: { user_id: any; password: any }) =>
          u.user_id === username && u.password === password
      );
        console.warn(user)
      if (user) {
        // Login successful, validate the token
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'; // Replace with your actual token

        if (this.validateToken(token)) {
          // Token is valid, store it and redirect to the desired page
          alert('Welcome to Dashboard');
          console.warn(token)
          localStorage.setItem('token', token); 
          this.route.navigate(['/dashboard']);
        } else {
          // Token is invalid
          alert('Invalid token');
        }
      } else {
        alert('Please check login details');
        this.loginForm.reset();
      }
    });
  }
  validateToken(token: string): boolean {
    try {
      const decodedToken: any = jwt_decode(token);
  console.warn(decodedToken)
      // Check if the token is expired
      const currentTime = Date.now() / 1000; // Convert to seconds
      const isExpired = decodedToken.exp < currentTime;
  
      // Add any additional validation logic here
  
      return !isExpired;
    } catch (error) {
      return false;
    }
  }

  /*------------Log Out-------------------*/

  
}

import { Injectable } from '@angular/core';
import {Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  isLoggedIn() {
    throw new Error('Method not implemented.');
  }

  constructor(private router: Router) { }
}

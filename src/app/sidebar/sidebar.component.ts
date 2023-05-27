import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private router: Router,private ActRoute:ActivatedRoute) { }
  logout(): void {
    // Remove the authenticated user from localStorage or session variable
    /* localStorage.removeItem('currentUser');
    this.router.navigate(['/login']); */
  }
  /*---------Menu Link Active------------------*/
  isMenuItemActive(path: string): boolean {
    return this.router.url === path;
  }
}

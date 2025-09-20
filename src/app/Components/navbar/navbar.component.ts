import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterLink, RouterLinkActive],
})
export class NavbarComponent implements OnInit {
  // injections
  router = inject(Router);

  constructor() {}

  ngOnInit() {}

  onLogout() {
    localStorage.removeItem('Token');
    this.router.navigateByUrl('login');
  }
}

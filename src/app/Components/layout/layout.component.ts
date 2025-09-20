import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [NavbarComponent, RouterOutlet],
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

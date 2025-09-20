import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterLink],
})
export class HomeComponent implements OnInit {
  // injections
  userService = inject(UsersService);

  constructor() {}

  ngOnInit() {}
}

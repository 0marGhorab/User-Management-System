import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { UsersService } from '../../Services/users.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [RouterLink],
})
export class AdminComponent implements OnInit {
  // variables
  allUsers: any = {};
  // injections
  userService = inject(UsersService);
  router = inject(Router);

  constructor() {}

  ngOnInit() {
    this.sendRequest();
  }

  sendRequest() {
    this.allUsers = this.userService.getAllUsers().subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.result) {
          this.allUsers = response.data.slice(0, 10);
          console.log(this.allUsers);
        }
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }

  onDeleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: (response: any) => {
          if (response.result) {
            alert(response.message);
            this.sendRequest();
          }
        },
        error: (err) => {
          console.error('Error deleting user:', err);
        },
      });
    }
  }
}

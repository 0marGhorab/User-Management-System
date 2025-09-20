import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'app-showUsers',
  templateUrl: './showUsers.component.html',
  styleUrls: ['./showUsers.component.css'],
  imports: [],
})
export class ShowUsersComponent implements OnInit {
  // variables
  allUsers: any = {};
  // injections
  userService = inject(UsersService);
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
      error: (error) => {
        console.error('Error fetching users:', error);
        if (error.error && typeof error.error === 'string') {
          alert(error.error);
        } else if (error.error && error.error.message) {
          alert(error.error.message);
        } else {
          alert('Request failed: ' + error.message);
        }
      },
    });
  }
}

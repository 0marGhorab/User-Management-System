import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'app-showUsers',
  templateUrl: './showUsers.component.html',
  styleUrls: ['./showUsers.component.css'],
  standalone: true, // If standalone, otherwise remove
  imports: [CommonModule], // Needed for *ngIf and *ngFor
})
export class ShowUsersComponent implements OnInit {
  allUsers: any[] = []; // array to store users
  isLoading: boolean = false; // loader flag

  userService = inject(UsersService);

  constructor() {}

  ngOnInit() {
    this.sendRequest();
  }

  sendRequest() {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (response: any) => {
        if (response.result) {
          this.allUsers = response.data.slice(0, 10);
        }
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        alert('Request failed: ' + (error?.error?.message || error.message || 'Unknown error'));
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}

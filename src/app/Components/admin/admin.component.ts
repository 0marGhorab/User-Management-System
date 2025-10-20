import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../Services/users.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- Needed for *ngIf and *ngFor

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [RouterLink, CommonModule], // <-- Added CommonModule for *ngIf and *ngFor
})
export class AdminComponent implements OnInit {
  allUsers: any[] = []; // <-- store users as array
  isLoading: boolean = false; // <-- loader flag

  userService = inject(UsersService);
  router = inject(Router);

  constructor() {}

  ngOnInit() {
    this.sendRequest();
  }

  sendRequest() {
    this.isLoading = true; // <-- start loader
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
        this.isLoading = false; // <-- stop loader
      },
    });
  }

  onDeleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.isLoading = true; // <-- start loader during delete
      this.userService.deleteUser(id).subscribe({
        next: (response: any) => {
          if (response.result) {
            alert(response.message);
            this.sendRequest();
          }
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          alert('Request failed: ' + (error?.error?.message || error.message || 'Unknown error'));
        },
        complete: () => {
          this.isLoading = false; // <-- stop loader
        },
      });
    }
  }
}

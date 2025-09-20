import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  //constants
  apiBaseURL: string = 'https://freeapi.miniprojectideas.com/api/User';
  // variables
  allUsers: any = {};
  // injections
  http = inject(HttpClient);

  constructor() {}

  getAllUsers() {
    return this.http.get(this.apiBaseURL + '/GetAllUsers');
  }

  getUserById(userId: number) {
    return this.http.get(this.apiBaseURL + '/GetUserByUserId?userId=' + userId);
  }

  updateUser(userForm: FormGroup) {
    return this.http.put(`${this.apiBaseURL}/UpdateUser`, userForm.value);
  }

  deleteUser(id: number) {
    return this.http.delete(this.apiBaseURL + '/DeleteUserById?userId=' + id);
  }
}

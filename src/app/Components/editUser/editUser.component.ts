import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../Services/users.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editUser',
  templateUrl: './editUser.component.html',
  styleUrls: ['./editUser.component.css'],
  imports: [ReactiveFormsModule],
})
export class EditUserComponent implements OnInit {
  // Variables
  userId!: number;
  userFormData: FormGroup = new FormGroup({
    userId: new FormControl(0),
    firstName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    middleName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    mobileNo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    altMobileNo: new FormControl('1234567890'),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  // injections
  userService = inject(UsersService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  location = inject(Location);

  constructor() {}

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.userService.getUserById(this.userId).subscribe({
      next: (response: any) => {
        if (response.result) {
          this.userFormData.patchValue(response.data);
        }
      },
      error: (err) => {
        console.log('Error Fetching : ' + err);
      },
    });
  }

  onEditConfirm() {
    if (this.userFormData.valid) {
      if (confirm('Are you sure you wnt to change these data?')) {
        this.userFormData.patchValue({ userId: this.userId });
        this.userService.updateUser(this.userFormData).subscribe({
          next: (response: any) => {
            console.log(response);

            if (response.result) {
              alert(response.message);
              this.router.navigateByUrl('/dashboard');
            } else {
              alert(response.message);
            }
          },
          error: (err) => console.error('Error updating user:', err),
        });
      }
    }
  }

  goBack() {
    this.location.back();
  }
}

import { AuthService } from './../../Services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, RouterLink],
})
export class RegisterComponent implements OnInit {
  // ---------- Variables ----------
  registerFormData: FormGroup = new FormGroup({
    userId: new FormControl(0),
    firstName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    middleName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    mobileNo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    altMobileNo: new FormControl('1234567890'),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  // ---------- injections ----------
  authService = inject(AuthService);
  router = inject(Router);

  constructor() {}

  ngOnInit() {}
  // ---------- Register (Submit button clicked) ----------
  onRegister() {
    this.authService.onRegisterService(this.registerFormData).subscribe({
      next: (response: any) => {
        if (response.result) {
          alert('New Account ' + response.message);
          this.router.navigateByUrl('/login');
        } else {
          alert(response.message);
        }
      },
      error: (error) => {
        console.error('Register error:', error);
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

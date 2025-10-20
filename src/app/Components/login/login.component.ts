import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, RouterLink],
})
export class LoginComponent implements OnInit {
  // ---------- Variables ----------
  loginFormData: FormGroup = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  loginData: any;

  // ---------- injections ----------
  router = inject(Router);
  authService = inject(AuthService);

  constructor() {}

  ngOnInit() {}
  //  Login button clicked( submit funtion )
  onLoginSubmit() {
    console.log('loginSubmit Clicked');

    this.authService.onLoginService(this.loginFormData).subscribe({
      next: (response: any) => {
        if (response.result) {
          alert(response.message);
          localStorage.setItem('Token', response.data.token);
          this.router.navigateByUrl('home');
        } else {
          alert(response.message);
        }
      },
      error: (error) => {
        console.error('Login error:', error);
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

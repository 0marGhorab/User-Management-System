import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Constants
  apiBaseURL: string = '/api/User';
  // injections
  http = inject(HttpClient);

  constructor() {}

  onLoginService(loginForm: FormGroup) {
    return this.http.post(`${this.apiBaseURL}/Login`, loginForm.value);
  }

  onRegisterService(registerForm: FormGroup) {
    return this.http.post(`${this.apiBaseURL}/CreateNewUser`, registerForm.value);
  }
}

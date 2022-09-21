import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { AuthorizationService } from './../authorization.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginRequest } from '../models/LoginRequest'

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() logged = new EventEmitter<void>();
  @Output() openRegister = new EventEmitter<void>();
  public form = new FormGroup({
      userName: this.fb.control(''),
      password: this.fb.control('')
  });

  constructor(
    private authSvc: AuthorizationService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    
  }

  loginName(user: LoginRequest) {
    this.authSvc.loginName(user)
      .subscribe((token: string) => {
        localStorage.setItem('authToken', token);
      });
  }

  public logIn(): void {
    const user: LoginRequest = {
      userName: this.form.get('userName')?.value,
      password: this.form.get('password')?.value
    }
    
    this.authSvc.loginUser(user)
    .subscribe(token => {
      localStorage.setItem('authToken', token);   
    });

    console.log(user);
    
  }
}

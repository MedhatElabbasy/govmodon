import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Routing } from 'src/app/modules/core/routes/app-routes';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  forgetPassword = `/${Routing.auth.module}/${Routing.auth.children.forgotPassword}`;
  message!: string | null;
error!:boolean;
  loginForm!: FormGroup;
  checked:boolean=false
  redirect: string = `/${Routing.dashboard.module}`;
  constructor(private fb: FormBuilder, private auth: AuthService,public lang: LangService, private router:Router) {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required,Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      password: [null, [Validators.required]],
    });
  }

  public get controls(): any {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.redirectToHome();
  }

  login() {
    if (this.loginForm.invalid) return;
    let model = this.loginForm.value;
    this.auth.login(model).subscribe(
      (res) => {
        if(res.governmentUser.isActive== false){
          this.error=true;
        }
      },
      (error: HttpErrorResponse) => {
        this.message = error.message;
      }
    );
  }

  redirectToHome() {
    if (localStorage.getItem('user')) {
      this.router.navigate([this.redirect]);
    }
  }
  change(event: any) {
    if (event.target?.checked) {
      this.checked = true;
      this.auth.autoLogin();
    }
  }


}

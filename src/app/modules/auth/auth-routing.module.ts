import { Token } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { AuthRoutes } from './routes/auth-routes.enum';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: AuthRoutes.login, pathMatch: 'full' },
      {
        path: AuthRoutes.login,
       canActivate:[LoginGuard],
        component: LoginComponent,
       

      },
      { path: AuthRoutes.forgotPassword, component: ForgetpasswordComponent },
      { path: AuthRoutes.resetPassword, component: ResetPasswordComponent },
    ],
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})



export class AuthRoutingModule { }

export const AuthDeclarations = [
  LoginComponent,
  ForgetpasswordComponent,
  ResetPasswordComponent,
  AuthComponent,
];

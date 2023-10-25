import { NgModule } from '@angular/core';
import { AuthDeclarations, AuthRoutingModule } from './auth-routing.module';
import { CoreModule } from '../core/core.module';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';



@NgModule({
  declarations: [
    AuthDeclarations,
  ],
  imports: [
    CoreModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }

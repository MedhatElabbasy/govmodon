import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { Routing } from 'src/app/modules/core/routes/app-routes';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
   
  changePasswordForm!: FormGroup;
  error!:any;
  id!: string;
  email!:any;
  outPut!:string;
 
  constructor( private fb: FormBuilder,private router:Router,public lang: LangService,private route: ActivatedRoute , private auth:AuthService) {
    this.changePasswordForm = this.fb.group({
      newPassword: [null, [Validators.required,Validators.minLength(6)]],
      confirmNewPassword:[null,[Validators.required,Validators.minLength(6)]]
    });
   //console.log(this.controls['newPassword']);
   
   }

   public get controls(): any {
    return this.changePasswordForm.controls;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id =params['key'];
  })
      
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
    
  }

  onSubmit(){
  
    if (this.changePasswordForm.invalid) return;
    if(this.changePasswordForm.controls['confirmNewPassword'].value == this.changePasswordForm.controls['newPassword'].value){
     this.error=false; 
     this.auth.confirmNewPassword(this.changePasswordForm.controls['newPassword'].value,this.id,this.email)
     this.router.navigate([`/${Routing.auth.module}/${Routing.auth.children.login}`]);
      }else{
        this.error=true;
      }

  }

}

import { Component, OnInit } from '@angular/core';
import { Routing } from 'src/app/modules/core/routes/app-routes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { Router } from '@angular/router';
import { LangService } from 'src/app/modules/core/services/lang.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
})
export class ForgetpasswordComponent implements OnInit {
  login = `/${Routing.auth.module}/${Routing.auth.children.login}`;
  errorMessage : string ='';
  modalID='email';

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
  constructor(private fb: FormBuilder,public lang:LangService,private _router:Router, private auth:AuthService , private modalService:ModalService) {}


  public get controls(): any {
    return this.form.controls;
  }
  ngOnInit(): void {}

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }




  sendEmail() {
    //console.log(this.form.controls['email'].value);
    this.auth.forgetPassword(this.form.controls['email'].value).subscribe(  
      res => {
        
    },
    error => {
      this.errorMessage = error.text;
      this.openModal(this.modalID);
     // console.error('There was an error!', this.errorMessage);
     
  });
    
  }
}

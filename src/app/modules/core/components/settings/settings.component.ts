import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInfo } from 'src/app/modules/auth/models/user-info';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserServicesService } from 'src/app/modules/users/services/user-services.service';
import { AcceptedExtension } from '../../data/accepted_extension';
import { AttachmentService } from '../../services/attachment.service';
import { CryptoService } from '../../services/crypto.service';
import { LangService } from '../../services/lang.service';
import { ModalService } from '../../services/modal.service';
import { OffcanvasService } from '../../services/offcanvas.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  oldPassowrdError=''
  canvasID = 'password-canvase';
  editCanvasID='edit-user';
  changePasswordForm!: FormGroup;
  updateUserForm!:FormGroup;
  profileImage!: string | null;
  user!: UserInfo;
  userInfo!:any;
  error!:boolean;
  errorMessage : string ='';
  modalID='send';
  response=''
  modalid="oldpassword"

  constructor(public modal: ModalService,
    private attachment: AttachmentService,
    private canvas: OffcanvasService,
    private crypto: CryptoService,
    private fb: FormBuilder,
    private auth: AuthService,
    public lang: LangService,
    private userService:UserServicesService,
    private modalService:ModalService

    ) {
      this.changePasswordForm = this.fb.group({
        oldPassword: [null, Validators.required],
        newPassword: [null, Validators.required],
        confirmNewPassword:[null,Validators.required]
      });


 
      this.updateUserForm=this.fb.group({
        firstName: [null,[
          Validators.required,
          Validators.pattern(`^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+(?:\s[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+)?$`),
        ]],
        middleName: [''],
        lastName: ['', [
          Validators.required,
          Validators.pattern(`^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+(?:\s[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+)?$`),
        ],],
        email: ['', [Validators.required,Validators.email]],
         photoId:[null,[Validators.required]],
         isActive:[''],
         appUserId:[''],
         changePassword:[''],
         userName:[''],
         idNumber:[''],
         idPhotoId:[''],
         id:[''],
         phoneNumer:['']
      })

      this.auth.userInfo.subscribe((res) => {
        if (res) {
          this.user = res;
      }
      });
    }

    public get controls(): any {
      return this.changePasswordForm.controls;
    }

    public get usercontroles():any{
      return this.updateUserForm.controls;
    }

  ngOnInit() {
  }

  openCanvas(id: string) {
    this.canvas.open(id);
  }

  closeCanvas(id: string) {
    this.canvas.close(id);
  }
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }


  onSubmit() {
    if (this.changePasswordForm.invalid) return;
   if(this.changePasswordForm.controls['confirmNewPassword'].value == this.changePasswordForm.controls['newPassword'].value){
    this.error=false; 
    let model = this.changePasswordForm.value;
    this.auth.changePassword(model).subscribe( 
      res => {
        console.log(res);
        this.openModal(this.modalID);
        this.closeCanvas(this.canvasID);
    },
    // error=>{
    //   this.oldPassowrdError=error.message
    //   this.openModal(this.modalid);
    // });
    )}
    else{
       this.error=true;
     }
  }



  onImageUpload(event: any) {
    let arr = event?.target?.files[0]?.name.split('.');
    const extension = arr[arr.length - 1].toLowerCase();

    if (!AcceptedExtension.includes(extension)) {
      (this.updateUserForm.controls['photoId'] as FormControl).setErrors({
        notValid: true,
      });
      this.profileImage = null;
      return;
    } else {
      let url = URL.createObjectURL(event.target.files[0]);
      (this.updateUserForm.controls['photoId'] as FormControl).setErrors({
        notValid: null,
      });
      
      this.attachment
        .uploadFile(event.target.files[0].name, event.target.files[0])
        .subscribe((res) => {
          if (res != null) {
            this.profileImage = url;
            this.updateUserForm.controls['photoId'].setValue(res);
          }
        });
    }
  }


  edit(){
    this.profileImage=this.user.photo.fullLink;
   // this.updateUserForm.controls['phoneNumer'].setValue(this.user.phoneNumer)
    this.updateUserForm.controls['photoId'].setValue(this.user.photo.id);
    this.updateUserForm.controls['idPhotoId'].setValue(this.user.idPhoto.id);
    this.updateUserForm.controls['id'].setValue(this.user.id);
    this.updateUserForm.controls['appUserId'].setValue(this.user.appUser.id)
    this.updateUserForm.patchValue(this.user);
   // console.log(this.user);
    this.openCanvas(this.editCanvasID);
  }

  updateUSer(user: UserInfo){
      // console.log("user");
   //this.user!= this.auth.snapshot.userInfo
    if(this.updateUserForm.invalid) return;
    let modal = this.updateUserForm.value;
   //console.log("update");
    this.userService.updateUser(modal).subscribe((res)=> console.log(res))
  }

}

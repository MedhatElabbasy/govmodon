import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from 'src/app/modules/auth/models/user-info';
import { AcceptedExtension } from 'src/app/modules/core/data/accepted_extension';
import { Sizes } from 'src/app/modules/core/data/page-sizes';
import { CountryCode } from 'src/app/modules/core/models/country-code';
import { AttachmentService } from 'src/app/modules/core/services/attachment.service';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { CustomValidators } from 'src/app/modules/core/validators/custom-validator';
import { Country } from '../../models/country';
import { UserData } from '../../models/user';
import { UserServicesService } from '../../services/user-services.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  users!: UserData[];
  canvasID = 'add-user';
  userForm!: FormGroup;
  profileImage!: string | null;
  idNumberPhoto!: string | null;
  codes!: any;
  code = new FormControl(null, [Validators.required]);
  pageNumber = 1;
  pageSize = 10;
  sizes = [...Sizes];
  active : string ='';
  language: string ='';
  errorMessage : string ='';
  modalID='error';
  searchKey!: string 
  canvasDetails='userDetails'
  selectedUser!:UserData|null
check!:boolean;
typingTimer!: any;                //timer identifier
doneTypingInterval = 1000;
key!: any;
total!:number
  constructor(
    private modalService: ModalService,
    private canvasServices: OffcanvasService,
    private route: ActivatedRoute,
    private userServices: UserServicesService,
    private fb: FormBuilder,
    private attachment: AttachmentService,

  ) {
    this.userForm = this.fb.group({
      userName: [null],
      firstName: [null, [Validators.required, Validators.pattern(`^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+(?:\s[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+)?$`)]],
      middleName: [null, [Validators.required, Validators.pattern(`^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+(?:\s[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+)?$`)]],
      lastName: [null, [Validators.required, Validators.pattern(`^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+(?:\s[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+)?$`)]],
      email: [null, [Validators.required, Validators.email]],
      phoneNumer: [null, Validators.required],
      isActive: false,
      idPhotoId: [null, Validators.required],
      photoId: [null, Validators.required],
      idNumber: [
        null,
        [Validators.required, Validators.pattern('[1-2][\\d]{9}')],
      ],
      changePassword: [false],
      defaultPassword: [
        null,
        [
          CustomValidators.noSpace,
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
    });
    this.phoneNumberValidationListener();
  }

  get userControls(): any {
    return this.userForm.controls;
  }

  public get phoneNumber(): FormControl {
    return this.userForm.get('phoneNumer') as FormControl;
  }

  ngOnInit(): void {
    this.getData();

    this.userServices.Updates.subscribe((res) => {
      this.users = res;
         console.log(this.users);
         
    });
  }

  getData() {
    let data: any = this.route.snapshot.data;
    this.users = data.initdata;
    this.codes = data.codes;
    this.initMobileCode();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  openCanvas(id: string) {
    this.canvasServices.open(id);
    this.userForm.reset();
  }

  closeCanvas(id: string) {
    this.canvasServices.close(id);
  }

  changeState(user: UserData, event: any) {

    if (event.checked) {
      this.userServices.active(user).subscribe((res) => {
        console.log(res);
        console.log(user);
        
        
      });
    } else {
      this.userServices.deActive(user).subscribe((res) => {
        console.log(res);
        console.log(user);
      });
    }
  }
  checkIDNumber(){
    this.userServices.checkNumberID(this.userForm.controls['idNumber'].value).subscribe((res)=>{
      if(res == true){
     this.check = true;
     this.userForm.setErrors({ 'invalid': true });
     console.log(this.check);
     
      }else{
        this.check=false;
        console.log(this.check);
      }
    })
  }
  addUser() {
    this. checkIDNumber();
    if (this.userForm.invalid) return;
    if(this.userForm.controls['isActive'].value == null){this.userForm.controls['isActive'].setValue("false");}
    this.userForm.controls['changePassword'].setValue('false');
    let model = this.userForm.value;
    
    console.log(model);
    
    model.userName = model.firstName + ' ' + model.lastName;
    let prefixCode = this.code.value;
    let number: string = model.phoneNumer;

    let phoneCountry: CountryCode = this.codes.find(
      (e: CountryCode) => e.prefixCode == prefixCode
    );

    if (number.startsWith('0')) {
      number = number.substring(1);
    }

    if (!model.phoneNumer.startsWith(phoneCountry.prefixCode)) {
      model.phoneNumer = phoneCountry.prefixCode + number;
    }
console.log(model);

    this.userServices.add(model).subscribe(
      res => {

      this.profileImage = null;
      this.form.resetForm();
      this.closeCanvas(this.canvasID);
      this.getUsers();
    },
  //   error => {
  //     this.errorMessage = error.message;
  //     this.openModal(this.modalID);
  //     console.error('There was an error!', this.errorMessage);
  // }
  );

  }

  onImageUpload(event: any) {
    let arr = event?.target?.files[0]?.name.split('.');
    const extension = arr[arr.length - 1].toLowerCase();

    if (!AcceptedExtension.includes(extension)) {
      (this.userControls['photoId'] as FormControl).setErrors({
        notValid: true,
      });
      this.profileImage = null;
      return;
    } else {
      let url = URL.createObjectURL(event.target.files[0]);
      (this.userControls['photoId'] as FormControl).setErrors({
        notValid: null,
      });
     
      this.attachment
        .uploadFile(event.target.files[0].name, event.target.files[0])
        .subscribe((res) => {
          this.profileImage = url;
          this.userControls['photoId'].setValue(res);
        });
    }
  }

  onIDImageUpload(event: any) {
    let arr = event?.target?.files[0]?.name.split('.');
    const extension = arr[arr.length - 1].toLowerCase();

    if (!AcceptedExtension.includes(extension)) {
      (this.userControls['idPhotoId'] as FormControl).setErrors({
        notValid: true,
      });
      this.idNumberPhoto = null;
      return;
    } else {
      let url = URL.createObjectURL(event.target.files[0]);
      (this.userControls['idPhotoId'] as FormControl).setErrors({
        notValid: null,
      });
      this.idNumberPhoto = url;
      this.attachment
        .uploadFile(event.target.files[0].name, event.target.files[0])
        .subscribe((res) => {
          this.userControls['idPhotoId'].setValue(res);
        });
    }
  }

  phoneNumberValidationListener() {
    this.code.valueChanges.subscribe((res) => {
      let code: CountryCode = this.codes.find(
        (e: CountryCode) => e.prefixCode == res
      );

      this.phoneNumber.clearValidators();
      this.phoneNumber.updateValueAndValidity();

      this.phoneNumber.addValidators([
        Validators.pattern(code.regex),
        Validators.required,
      ]);
      this.phoneNumber.updateValueAndValidity();
    });
  }

  initMobileCode() {
    this.codes = (this.route.snapshot.data as any).codes;
    let defaultCountry = this.codes.find((element: Country) => {
      return element.ioS2 === '+966';
    });

    this.code.setValue(defaultCountry.prefixCode);
  }

  getUsers() {
    this.userServices.getAllUsers()
    .subscribe((res) => {
      this.users = res;
      console.log(this.users);
      
      if (this.active == '') {
        this.users;
      } else if (this.active == 'active') {
        let all = this.users.filter((element: UserData) => {
          return element.isActive;
        });
        this.users = all;
        this.active=''
      } else {
        let all = this.users.filter((element: UserData) => {
          return !element.isActive;
        });
        this.users = all;
        this.active=''
      }
      if(this.language == ''){
        this.users;
      }else if (this.language == 'ascending') {
        var x = [];
        var y = [];

        const regex = /^[A-Z a-z]/;
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].firstName.match(regex)) {
            x.push(this.users[i]);
          } else {
            y.push(this.users[i]);
          }
        }
        this.users = [...x.sort(), ...y.sort()];
        x.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
        y.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
        this.users = [...x, ...y];
      } else{
        var x = [];
        var y = [];

        const regex = /^[ء-ي]/;
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].firstName.match(regex)) {
            x.push(this.users[i]);
          } else {
            y.push(this.users[i]);
          }
        }
        this.users = [...x.sort(), ...y.sort()];
        x.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
        y.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
        this.users = [...x, ...y];
      }
    }); 
  }

  reset(){
    this.profileImage = null;
    this.idNumberPhoto= null;
    this.userForm.reset();
  }

  onPageSizeChange(event: any) {
    this.pageSize = +event.target.value;
  }

  onPageChange(event: number) {
    this.pageNumber = event;
  }
  english(){
    this.language = 'ascending';
        this.getUsers();
  }

  arabic(){
    this.language = 'descending';
    this.getUsers();
  }

  filterActive(){
    this.active = 'active';
    this.getUsers();
  }

  filterDeActive(){
    this.active = 'deactive';
    this.getUsers();
  }

  clear(){
    this.language=''
    this.getUsers();
  }

  openDetails(user:UserData,event:any){
    event.stopImmediatePropagation();
    this.selectedUser=user
    this.canvasServices.open(this.canvasDetails)
  }


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AcceptedExtension } from 'src/app/modules/core/data/accepted_extension';
import { AttachmentService } from 'src/app/modules/core/services/attachment.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Country } from '../../model/country';
import { rasdUser } from '../../model/rasdUser';
import { CountriesService } from '../../services/countries.service';
import { RasdService } from '../../services/rasd.service';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit {
  selectUser!: rasdUser | null;
  @ViewChild('form') form!: FormGroupDirective;
  canvasID = 'rasd-crud';
  codes: any;
  code1 = new FormControl(null, [Validators.required]);
  code2 = new FormControl(null, [Validators.required]);
  profileImage!: string | null;
  userForm: FormGroup = this.fb.group({
    photoId: [null, [Validators.required]],
    firstName: [
      null,
      [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
    ],
    lastName: [
      null,

      [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
    ],
    middleName: [
      null,
      [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
    ],
    phoneNumber: [null, [Validators.required]],
    phoneNumber2: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    idNumber: [null, [Validators.required]],
    isActive: false,
  });
  constructor(
    private canvasServices: OffcanvasService,
    private fb: FormBuilder,
    private attachment: AttachmentService,
    private country: CountriesService,
    private RasdService: RasdService
  ) {}

  ngOnInit(): void {
    // this.codeListener();
    this.getData();
  }
  openCanvas(id: string) {
    this.canvasServices.open(id);
  }

  closeCanvas(id: string) {
    this.canvasServices.close(id);
  }
  addUser(userForm: FormGroup) {
    if (this.userForm.invalid) return;
    let model = this.userForm.value;
    let phone1 = this.code1.value;
    let phone2 = this.code2.value;
    let prrfix1 = this.codes.find((element: Country) => {
      return element.ioS2 == phone1;
    });
    let prrfix2 = this.codes.find((element: Country) => {
      return element.ioS2 == phone2;
    });
    let number1: string = model.phoneNumber;
    let number2: string = model.phoneNumber2;
    if (number1.startsWith('0')) {
      number1 = number1.substring(1);
    }
    if (number2.startsWith('0')) {
      number2 = number2.substring(1);
    }

    if (!model.phoneNumber?.startsWith(phone1)) {
      model.phoneNumber = prrfix1.prefixCode + number1;
    }

    if (!model.phoneNumber2?.startsWith(phone2)) {
      model.phoneNumber2 = prrfix2.prefixCode + number2;
    }
    this.RasdService.addUser(this.userForm.value, this.profileImage);
    this.form.resetForm();
    this.profileImage = null;
    this.closeCanvas(this.canvasID);
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
  onImageUpload(event: any) {
    let arr = event?.target?.files[0]?.name.split('.');
    const extension = arr[arr.length - 1].toLowerCase();

    if (!AcceptedExtension.includes(extension)) {
      (this.userForm.controls['photoId'] as FormControl).setErrors({
        notValid: true,
      });
      this.profileImage = null;
      return;
    } else {
      let url = URL.createObjectURL(event.target.files[0]);
      (this.userForm.controls['photoId'] as FormControl).setErrors({
        notValid: null,
      });
      
      this.attachment
        .uploadFile(event.target.files[0].name, event.target.files[0])
        .subscribe((res) => {
          if (res != null) {
            this.profileImage = url;
            this.userForm.controls['photoId'].setValue(res);
          }
        });
    }
  }

  getData() {
    this.country.getAllCountries().subscribe((res) => {
      this.codes = res;
      let defaultCountry = this.codes.find((element: Country) => {
        return element.ioS2 == '+966';
      });
      this.code1.setValue(defaultCountry.ioS2);
      this.code2.setValue(defaultCountry.ioS2);
    });
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './modules/auth/services/auth.service';
import { StorageKeys } from './modules/core/keys/storage-keys';
import { CryptoService } from './modules/core/services/crypto.service';
import { ErrorService } from './modules/core/services/error.service';
import { LangService } from './modules/core/services/lang.service';
import { ModalService } from './modules/core/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'gov-agent';
  message: string = '';
  modalId = 'error';

  constructor(private lang: LangService,
    private auth:AuthService , private router:Router , private _error:ErrorService, private modal:ModalService) {
    this.lang.checkLang();
    this.auth.autoLogin();
    router.canceledNavigationResolution = 'computed';
    this._error.error.subscribe((res) => {
      if(res){
      this.message = res;
      console.log(res);
      
      modal.open('error');
      }
    });
  }

}

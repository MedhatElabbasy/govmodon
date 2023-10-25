import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Languages } from '../enums/languages.enum';
import { StorageKeys } from '../keys/storage-keys';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  language!: BehaviorSubject<string>;
  currentLang!: string;
  public isAr!: BehaviorSubject<boolean>;

  constructor(private translate: TranslateService) {
    this.language = new BehaviorSubject<string>(Languages.default);
    this.isAr = new BehaviorSubject<boolean>(true);
  }

  checkLang() {
    let currentLang = localStorage.getItem(StorageKeys.lang);
    if (currentLang) {
      this.changeLang(currentLang);
    } else {
      this.changeLang(Languages.default);
    }
  }

  changeLang(lang: string) {
    let flag = lang == Languages.ar;
    this.translate.use(lang);
    this.language.next(lang);
    this.isAr.next(flag);
    this.currentLang = lang;
    localStorage.setItem(StorageKeys.lang, lang);
    this.changeDocumentAttr(lang);
  }

  changeDocumentAttr(lang: string) {
    let dir = lang === Languages.ar ? 'rtl' : 'ltr';

    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', dir);
    document.body.setAttribute('class', lang);
  }
}

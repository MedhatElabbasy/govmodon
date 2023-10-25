import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { StorageKeys } from '../keys/storage-keys';
import { Languages } from '../enums/languages.enum';
import { ErrorService } from '../services/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private messageServices: MessageService , private _error:ErrorService) {}
  errorMessage: string = ''
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> 
  {
    return next.handle(request).pipe(
      catchError((error) => {
      //  const message = this.setError(error);
      //     // let lang = localStorage.getItem(StorageKeys.lang)!;
      //     // this.messageServices.add({
      //     //   key: lang === Languages.ar ? 'tl' : 'tr',
      //     //   severity: 'error',
      //     //   summary: 'Error',
      //     //   detail: message,
      //     // });
      //   }
      if (request.url.includes('uploadFormFile')) {
        let lang = localStorage.getItem(StorageKeys.lang) ?? 'ar';
        this.errorMessage = lang == 'ar' ? 'هذا الملف اكبر من 2 ميجا بايت لا يمكن رفعه' : "this file size greater than 2 mb can't upload"
        const message = this.setError(error , request);
        //console.log(message);  
      }
      if (request.url.includes('ChangePassword')) {
        let lang = localStorage.getItem(StorageKeys.lang) ?? 'ar';
        this.errorMessage = lang == 'ar' ? 'كلمة المرور القديمه غير صحيحة' : "The old password is wrong"
        const message = this.setError(error , request);
        //console.log(message);  
      }
    
    

      const message = this.setError(error , request);
      let lang = localStorage.getItem(StorageKeys.lang)!;
      this.errorMessage=''
        return throwError(() => error.error);
  })
    
    );
    
  }

  setError(error: HttpErrorResponse , request:HttpRequest<unknown>) {
    console.log(error);
    if (!request.url.includes('ForgetPassword')) {
    let lang = localStorage.getItem(StorageKeys.lang) ?? 'ar';
    let message = lang == 'ar' ? 'حدث خطأ ما' : 'An Error Accrued';
        if (this.errorMessage == '') {
          if (error.error) {
            this.errorMessage = error.error.message;
          }else{
            this.errorMessage = message;
          }
              }else{
                this.errorMessage = this.errorMessage;
              }
    
    this._error.error.next(this.errorMessage);
    //return errorMessage;
            
  }
}
}

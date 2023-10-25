import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { IUser, User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CryptoService } from '../../core/services/crypto.service';
import { StorageKeys } from '../../core/keys/storage-keys';
import * as lt from 'long-timeout';
import { VerifyModel } from '../models/verify-model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Routing } from '../../core/routes/app-routes';
import { environment } from 'src/environments/environment';
import { Changepassword } from '../models/change-password';
import { UserInfo } from '../models/user-info';
import { loginResponse } from '../models/loginResponse';
import { mode } from 'crypto-js';
import { UserData } from '../../users/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = environment.apiUrl;

  private helper = new JwtHelperService();
  private tokenExpirationTimer!: any;

  user = new BehaviorSubject<User | null>(null);
  userInfo = new BehaviorSubject<UserInfo | null>(null);
message!:string;
  userData!: UserData;
   Email:any;
  snapshot!: {
    user: User | null;
    userInfo: UserInfo | null;
  };
  companies = `/${Routing.dashboard.module}`;
  changepassword!: Changepassword[];
  private passwordUpdate = new Subject<Changepassword[]>();

  disableButtonSubject = new BehaviorSubject<boolean>(false);
  disableButton$ = this.disableButtonSubject.asObservable();

  constructor(
    private http: HttpClient,
    private crypto: CryptoService,
    private router: Router
  ) {
    this.snapshot = {
      user: null,
      userInfo: null,
    };
  }

  login(model: VerifyModel) {
    return this.http
      .post<loginResponse>(this.url + `api/GovernmentUser/LogIn`, model)
      .pipe(
        tap((response) => {
          console.log(response.governmentUser);
          if(response.governmentUser.isActive== true){
          this.snapshot.userInfo = response.governmentUser;
          this.userInfo.next(response.governmentUser);
          this.handleToken(response.token, response.governmentUser.id);
          this.router.navigate([this.companies]);}
          else{
           
          }
        })
      );
  }

  handleToken(token: string, id: string) {
    const user = new User(token, id);
      
    this.snapshot.user = user;
    this.user.next(user);
    this.crypto.setEncryptedStorage(StorageKeys.uid, user);
    if (!this.snapshot.userInfo) {
      console.log("zzzzzzzzzz");
      
      this.getUserInfo(id);
    }

    let expiry = this.helper.getTokenExpirationDate(token)?.valueOf()!;
    let today = new Date().valueOf();
    expiry = expiry - today;
  }

  logout() {
    this.snapshot.user = null;
    this.user.next(null);
    this.crypto.deleteEncryptedStorageByKey(StorageKeys.uid);

    if (this.tokenExpirationTimer) {
      lt.clearTimeout(this.tokenExpirationTimer);
    }
    this.router.navigate([
      `/${Routing.auth.module}/${Routing.auth.children.login}`,
    ]);
  }

  autoLogin() {
    const token: IUser = this.crypto.getEncryptedStorage(StorageKeys.uid);

    if (!token) {
      return;
    } else {
      this.handleToken(token._token, token.id);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = lt.setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  getUserInfo(id: string) {
    this.http
      .get<UserInfo>(this.url + `api/GovernmentUser/Get?id=${id}`)
      .subscribe((response) => {
        this.snapshot.userInfo = response;
        this.userInfo.next(response);
      });
     
  }
  changePassword(model: Changepassword) {
    model.appuserId = this.snapshot.userInfo?.appUser.id!;
    model.userName = this.snapshot.userInfo?.appUser.userName!;
   return this.http
      .post<Changepassword>(
        this.url + `api/GovernmentUser/ChangePassword`,
        model
      )
      // .subscribe((res) => {
      //   console.log(res);
      // });
  }

  forgetPassword(email:any) {
   
    console.log(this.url+`api/GovernmentUser/ForgetPassword?userName=${email}`);
    
    return this.http.post(this.url+`api/GovernmentUser/ForgetPassword?userName=${email}`,null)
    
  }

  confirmNewPassword(password:string,key:string,email:string){
    console.log(password);
    console.log(key);
    console.log(email);
    
    
    this.http.post(this.url+`api/GovernmentUser/ForgetPasswordConfirm?userName=${email}&resetToken=${key}&Newpassword=${password}`,null).subscribe()
    
  }
}

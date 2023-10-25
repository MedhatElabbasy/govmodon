import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserInfo } from 'src/app/modules/auth/models/user-info';
import { UserData } from '../../models/user';
import { UserServicesService } from '../../services/user-services.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<UserData[]> {
  
  constructor(private userService:UserServicesService){}
  resolve(
    route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot)
     : Observable<UserData[]> {
    return this.userService.getAllUsers();
  }
}

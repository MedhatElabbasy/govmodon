import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../../auth/models/user-info';
import { UserData } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserServicesService {
  private readonly url = environment.apiUrl;
  private userUpdate = new Subject<UserData[]>();
  users!: UserData[];

  user!: UserData;

  constructor(private http: HttpClient) {}

  get Updates(): Observable<UserData[]> {
    return this.userUpdate.asObservable();
  }

  getAllUsers() {
    return this.http
      .get<UserData[]>(this.url + `api/GovernmentUser/GetAll`)
      .pipe(
        tap((response) => {
          this.users = response;
          this.userUpdate.next(response);
        })
      );
  }

  active(user: any) {
    return this.http.post<any>(
      this.url + `api/GovernmentUser/ActiveUser?Id=${user.appUser.id}`,
      null
    );
  }

  deActive(user: any) {
    return this.http.post<any>(
      this.url + `api/GovernmentUser/DeActiveUser?Id=${user.appUser.id}`,
      null
    );
  }

  add(model: UserData) {
    return this.http.post(this.url + `api/GovernmentUser/Add`, model);
  }

  updateUser(model: UserData) {
    console.log("moddel");
    
    return this.http.post<UserData>(
      this.url + `api/GovernmentUser/Update`,
      model
    );
  }

  checkNumberID(id : string){
    return this.http.post(this.url+`api/GovernmentUser/CheckIdNumber?Id=${id}` , null)
  }


  search(key:string , pageNumber: number,pageSize: number){
    return this.http.get(this.url+`api/TakidAdmin/GetAllSearch?searchkey=${key}&page=${pageNumber}&pageSize=${pageSize}`)
  }
 
}

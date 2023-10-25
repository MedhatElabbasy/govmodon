import { Client } from './../models/client';
import {Agent, CompanySecurityGuard } from './../models/company-security-guard';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject,tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from '../../core/models/pagination';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private readonly url = environment.apiUrl;
  private _updates = new Subject<Pagination<Company>>();
  companies!: Pagination<Company>;

constructor(private http: HttpClient) { }


public get updates(): Observable<Pagination<Company>> {
  return this._updates.asObservable();
}

getAllApproved(
  page: number,
  pageNumber: number
): Observable<Pagination<Company>> {
  return this.http
    .get<Pagination<Company>>(
      this.url +
        `api/SecurityCompany/GetAllApproved?page=${page}&pageSize=${pageNumber}`
    )
    .pipe(
      tap((response) => {
        this.companies = response;
        this._updates.next(this.companies);
      })
    );
}


getCompanyById(id: number) {
  return this.http.get<Company>(
    this.url + `api/SecurityCompany/GetById?id=${id}`
  );
}



getAllGuardsOnCompany(companyId: number) {
  return this.http.get<CompanySecurityGuard[]>(
    this.url +
      `api/GuardLocation/GetAllGuardOnCompanyById?companyId=${companyId}&IsSupervisor=false`
  );
}

getAllSupervisorsOnCompany(companyId: number) {
  return this.http.get<CompanySecurityGuard[]>(
    this.url +
      `api/GuardLocation/GetAllGuardOnCompanyById?companyId=${companyId}&IsSupervisor=true`
  );
}

getClientsBySecurityCompany(companyID: any,pageNumber: number, pageSize: number) {
  
  return this.http.get<Pagination<Client>>(
    this.url +
      `api/SecurityCompanyClients/GetAllbySecurityCompanyid?companyID=${companyID}&page=${pageNumber}&pageSize=${pageSize}`
  );
}

getAllAgentsOnCompany(companyId: number) {
  return this.http.get<Agent[]>(
    this.url +
      `api/Agent/GetAllApproveByCompanyId?companyId=${companyId}`
  );
}
CompanyValidEnrollment(companyID:number){
  return this.http.get(this.url+`api/CompanyPackageEnrollment/GetCompanyValidEnrollment?id=${companyID}`)
}


getClientByClientID(clientID : string){
  return this.http.get(this.url +`api/SecurityCompanyClients/GetById?Id=${clientID}`)
}

getAllClientSites(clientID : string){
  return this.http.get(this.url +`api/ClientSite/GetAllByClientId?id=${clientID}`)
}

getAllLocationsById(locationID:string){
  return this.http.get(this.url +`api/GuardLocation/GetAllByLocationId?LocationId=${locationID}`)
}

GetAttendanceStatsticLocationAndDayByCompanyId(companyID : number , firstDate:string ,lastDate:string ){
  return this.http.get(this.url+`api/Attendance/GetAttendanceStatsticLocationAndDay?CompanyId=${companyID}&StartDate=${firstDate}&EndDate=${lastDate}`)
}

GetAttendanceStatsticByCompanyId(companyID : number , firstDate:string ,lastDate:string ){
  return this.http.get(this.url+`api/Attendance/GetAttendanceStatsticByCompanyId?CompanyId=${companyID}&StartDate=${firstDate}&EndDate=${lastDate}`)
}

GetAttendanceStatsticByClientandLocationAndDay(companyID : number , firstDate:string ,lastDate:string , clientID:number){
  return this.http.get(this.url+`api/Attendance/GetAttendanceStatsticByClientandLocationAndDay?CompanyId=${companyID}&StartDate=${firstDate}&EndDate=${lastDate}&clientId=${clientID}`)
}

GetAttendanceStatsticByClientandLocation(companyID : number , firstDate:string ,lastDate:string , clientID:number){
 return this.http.get(this.url+`api/Attendance/GetAttendanceStatsticByClientandLocation?CompanyId=${companyID}&StartDate=${firstDate}&EndDate=${lastDate}&clientId=${clientID}`)
}


search(key:string , pageNumber: number, pageSize: number){
  return this.http.get(this.url+`api/SecurityCompany/GetAllSearch?SearchKey=${key}&page=${pageNumber}&pageSize=${pageSize}`,{headers:
    {'loader':'true'}})
}
}

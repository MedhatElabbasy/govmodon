import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Pagination } from 'src/app/modules/core/models/pagination';
import { Company } from '../../models/company';
import { CompaniesService } from '../../services/companies.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyDetailsResolver implements Resolve<Company> {
  constructor(private companies: CompaniesService){}

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
   Observable<Company> {
    return this.companies.getCompanyById(route.params['id']);
  }
}

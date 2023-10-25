import { ClientsCompanies } from './../../modules/core/models/clients-companies';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Pagination } from 'src/app/modules/core/models/pagination';
import { ClientsCompaniesService } from 'src/app/modules/core/services/clients-companies.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsCompaniesResolver
  implements Resolve<Pagination<ClientsCompanies>>
{
  constructor(private clientsService: ClientsCompaniesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Pagination<ClientsCompanies>> {
    return this.clientsService.getALlCompanies(1, 10);
  }
}

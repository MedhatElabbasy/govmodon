import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from '../../core/models/pagination';
import { ContractStatus, OptionSet } from '../enums/status.enum';
import { ClientModel } from '../models/client-model';
import { Contract } from '../models/contract';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private readonly url = environment.apiUrl;
  private _updates = new Subject<Pagination<Contract>>();
  contracts!: Pagination<Contract>;

  constructor(private http: HttpClient) {}

  public get updates(): Observable<Pagination<Contract>> {
    return this._updates.asObservable();
  }

  getAllContracts(
    pageNumber: number,
    pageSize: number
  ): Observable<Pagination<Contract>> {
    return this.http
      .get<Pagination<Contract>>(
        this.url +
          `api/ClientSecurityContract/GetAllByStatus?page=${pageNumber}&pageSize=${pageSize}&OptionSetName=${OptionSet.ContractStatus}&value=${ContractStatus.acceptedByTakid}`
      )
      .pipe(
        tap((response) => {
          this.contracts = response;
          this._updates.next(this.contracts);
        })
      );
  }

  updateContractStatus(id: string, value: number) {
    return this.http.get<Contract>(
      this.url +
        `api/ClientSecurityContract/UpdateOrderStatusType?contractid=${id}&optionsetname=ContractStatus&value=${value}`
    );
  }

  changeContractStatus(
    contractId: string,
    value: number,
    reason: string | null
  ) {
    return this.http.get(
      this.url +
        `api/ClientSecurityContract/UpdateOrderStatusType?contractId=${contractId}&optionSetName=${OptionSet.ContractStatus}&value=${value}&RejectReson=${reason}`
    );
  }

  updateOrderStatus(orderId: any, optionSetName: string, value: number) {
    return this.http.get(
      this.url +
        `api/ClientOrder/UpdateOrderStatusType?orderId=${orderId}&optionSetName=${optionSetName}&value=${value}`
    );
  }

  createClientUser(model: ClientModel) {
    return this.http.post(
      this.url + `api/SecurityCompanyClients/Create`,
      model
    );
  }

  isOldContract(id: string) {
    return this.http.get(
      this.url +
        `api/ClientSecurityContract/GetSecurityCompanyContract?contractId=${id}`
    );
  }
}

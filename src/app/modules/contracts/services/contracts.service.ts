import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContractStatus, OptionSet } from '../../core/enums/status.enum';
import { ClientModel } from '../../core/models/client-model';
import { Pagination } from '../../core/models/pagination';
import { Contract } from '../models/contract';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  private readonly url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(pageNumber: number, pageSize: number) {
    return this.http.get<Pagination<Contract>>(
      this.url +
        `api/ClientSecurityContract/GetAll?page=${pageNumber}&pageSize=${pageSize}`
    );
  }

  updateStatus(id: number, value: number) {
    return this.http.get(
      this.url +
        `api/ClientSecurityContract/UpdateOrderStatusType?contractId=${id}&optionSetName=${OptionSet.ContractStatus}&value=${value}`
    );
  }

  getAcceptedContracts(pageNumber: number, pageSize: number) {
    return this.http.get<Pagination<Contract>>(
      this.url +
        `api/ClientSecurityContract/GetAllByStatus?page=${pageNumber}&pageSize=${pageSize}&OptionSetName=${OptionSet.ContractStatus}&value=${ContractStatus.accepted}`
    );
  }

  getRejectedContracts(pageNumber: number, pageSize: number) {
    return this.http.get<Pagination<Contract>>(
      this.url +
        `api/ClientSecurityContract/GetAllByStatus?page=${pageNumber}&pageSize=${pageSize}&OptionSetName=${OptionSet.ContractStatus}&value=${ContractStatus.rejected}`
    );
  }

  getAllContractByStatus(pageNumber: number, pageSize: number, status: number) {
    return this.http.get<Pagination<Contract>>(
      this.url +
        `api/ClientSecurityContract/GetAllByStatus?page=${pageNumber}&pageSize=${pageSize}&OptionSetName=${OptionSet.ContractStatus}&value=${status}`
    );
  }

  getContractType(): Observable<any>{
    return this.http.get(this.url+`api/OptionSet/GetByName?name=contracttype`);
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
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Agent } from '../../security-companies/models/company-security-guard';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private readonly url = environment.apiUrl;
  agent!:Agent[];

  constructor(private _httpClient: HttpClient) { }

  getAllAgents(){
    return this._httpClient.get<Agent[]>(
      this.url+ `api/Agent/GetAll`
    );
  }


  getAllCompanyAgent(companyId: number) {
    return this._httpClient.get<Agent[]>(
      this.url +
        `api/Agent/GetAllCompanyAgent?companyId=${companyId}`
    );
  }
}

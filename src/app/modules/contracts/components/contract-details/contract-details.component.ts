import { Component, Input, OnInit } from '@angular/core';
import { Routing } from 'src/app/modules/core/routes/app-routes';
import { ContractService } from 'src/app/modules/core/services/contract.service';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { Contract } from '../../models/contract';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.scss'],
})
export class ContractDetailsComponent implements OnInit {
  @Input('contract') contract!: Contract;
  detailsLink = `/${Routing.companies.module}/${Routing.companies.children.companyDetails}`;

  constructor(public lang: LangService , private contractService:ContractService) {}

  ngOnInit() {}

  navigate(contract:Contract){
    if (contract.isOldContract) {
      window.open(contract.oldContractFile?.fullLink, '_blank');
    } else {
      this.contractService.isOldContract(contract.id).subscribe((res:any) => {  
        if(res.documentUrl){
          window.open(res.documentUrl, '_blank');
        }
      });
    }
  }
}

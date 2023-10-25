import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sizes } from 'src/app/modules/core/data/page-sizes';
import { Agent } from 'src/app/modules/security-companies/models/company-security-guard';
import { CompaniesService } from 'src/app/modules/security-companies/services/companies.service';

@Component({
  selector: 'app-company-agents',
  templateUrl: './company-agents.component.html',
  styleUrls: ['./company-agents.component.scss']
})
export class CompanyAgentsComponent implements OnInit {
  agents!: Agent[];
  searchKey = '';
  companyId:any;
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [...Sizes];

  constructor(private _companyService: CompaniesService,  private route: ActivatedRoute,) {
    this.route.parent?.params.subscribe((params)=>{
      this.companyId = params['id']
    })
  }

  ngOnInit(): void {
    this.getInitDate();
  }


  getInitDate() {
  this.getAgents();
  }

  
  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
  }


  getAgents() {
  this._companyService.getAllAgentsOnCompany(this.companyId).subscribe((res) => {
      this.agents = res;
    });
  }

}

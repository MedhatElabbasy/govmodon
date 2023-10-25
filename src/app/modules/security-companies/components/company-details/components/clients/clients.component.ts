import { ActivatedRoute, Router } from '@angular/router';
import { CompaniesService } from './../../../../services/companies.service';
import { Client } from './../../../../models/client';
import { Pagination } from './../../../../../core/models/pagination';
import { Component, OnInit } from '@angular/core';
import { Sizes } from 'src/app/modules/core/data/page-sizes';
import { Routing } from 'src/app/modules/core/routes/app-routes';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  sizes = [...Sizes];
  clientsList!: Pagination<Client>;
  searchKey = '';
  companyId:any

  constructor(
    private route: ActivatedRoute,
    private clientsServices: CompaniesService,
    private router: Router
  ) {
    this.route.parent?.params.subscribe((params)=>{
      this.companyId = params['id']
    })
  }

  ngOnInit(): void {
    this.getInitDate();
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
    this.getClients();
  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
    this.getClients();
  }

  getInitDate() {
    this.route.data.subscribe((res: any) => {
      this.clientsList = res['clients'];
    });
  }

  getClients() {
  this.clientsServices.getClientsBySecurityCompany(this.companyId,this.pageNumber, this.pageSize).subscribe((res) => {
      this.clientsList = res;
    });
  }
  openDetails(client: Client) {
    this.router.navigate([
      `/${Routing.companies.module}/${Routing.companies.children.clientDetails}`,client.id
    ]);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Pagination } from 'src/app/modules/core/models/pagination';
import { Routing } from 'src/app/modules/core/routes/app-routes';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Company } from '../../models/company';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  canvasID = 'filter-canvase';
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5, 10, 20, 30];
  companies!: Company[];
  selectedCompany!: Company;
  language: string = '';
  searchKey!: string;
  typingTimer!: any;                //timer identifier
  doneTypingInterval = 1000;
  key!: any;
  constructor(
    private canvas: OffcanvasService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private companiesService: CompaniesService
  ) {
    const currentValue = this.auth.disableButtonSubject.getValue();
    this.auth.disableButtonSubject.next(!currentValue);
  }

  ngOnInit() {
    this.getData();
    
  }

  getData() {
    let data: Pagination<Company> = this.route.snapshot.data['companies'];
    this.companies = data.data;
    this.total = data.totalCount;

    this.companiesService.updates.subscribe((res) => {
      this.companies = res.data;
      this.total = data.totalCount;
    });
  }

  getCompanies() {
    this.companiesService
      .getAllApproved(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        this.total = res.totalCount;
        this.companies = res.data;
        if(this.language == ''){
            this.companies
        }else if (this.language == 'ascending') {
          var x = [];
          var y = [];

        const regex = /^[A-Z a-z]/;
        for (let i = 0; i < this.companies.length; i++) {
          if (this.companies[i].name.match(regex)) {
            x.push(this.companies[i]);
          } else {
            y.push(this.companies[i]);
          }
        }
        this.companies = [...x.sort(), ...y.sort()];
        x.sort((a, b) => (a.name < b.name ? -1 : 1));
        y.sort((a, b) => (a.name < b.name ? -1 : 1));
        this.companies = [...x, ...y];
      } else {
        var x = [];
        var y = [];

        const regex = /^[ء-ي]/;
        for (let i = 0; i < this.companies.length; i++) {
          if (this.companies[i].name.match(regex)) {
            x.push(this.companies[i]);
          } else {
            y.push(this.companies[i]);
          }
        }
        this.companies = [...x.sort(), ...y.sort()];
        x.sort((a, b) => (a.name < b.name ? -1 : 1));
        y.sort((a, b) => (a.name < b.name ? -1 : 1));
        this.companies = [...x, ...y];
      }
      });
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;

    this.getCompanies();
  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
    this.getCompanies();
  }

  onPageChange(event: number) {
    this.pageNumber = event;

    this.getCompanies();
  }

  openCanvas(id: string) {
    this.canvas.open(id);
  }

  closeCanvas(id: string) {
    this.canvas.close(id);
  }

  openDetails(company: Company) {
    this.router.navigate([
      `/${Routing.companies.module}/${Routing.companies.children.companyDetails}`,
      company.id,
    ]);
  }
  english(){
    this.language = 'ascending';
    this.getCompanies();
  }

  arabic(){
    this.language = 'descending';
    this.getCompanies();
  }
  clear(){
    this.language=''
    this.getCompanies();
  }
 

  keyupFunction(event: any) {
    this.key = event.target.value;
    console.log(this.key);
     clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {this.doneTyping(this.key) }, this.doneTypingInterval);
  }

  keydownfunction() {
    clearTimeout(this.typingTimer);
    console.log(this.typingTimer);
  }

  doneTyping(key:string) {
    console.log(key);
    if(this.key == ""){
      this.getCompanies();
    }else{
      this.companiesService.search(this.key , this.pageNumber , this.pageSize).subscribe((res:any)=>{
        console.log(res);
        this.companies=res.data;
        this.total=res.totalCount;
        console.log(this.total);

        })
    }
  }

}

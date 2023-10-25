import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Company } from '../../models/company';
import { COMPANY_DETAILS_LIST } from '../../routes/security-companies-routes.enum';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  canvasID = 'filter-canvase';
  startDate!:Date
  endDate!:Date
  package!:any
  navbarLinks = [...COMPANY_DETAILS_LIST];
  isAr!: Observable<boolean>;
  selectedCompany!: Company;
  data!: Company;

  constructor(
    private canvas: OffcanvasService,
    private route: ActivatedRoute,
     public lang: LangService , private companiesService:CompaniesService
    ) {

      this.isAr = this.lang.isAr;
  
    }

  ngOnInit() {
    this.route.data.subscribe((res) => {

      this.data = res['company'];
        console.log(this.data.id);
        
    });
    this.getCompanyPackage();
  }


  openCanvas(id: string) {
    this.canvas.open(id);
  }

  closeCanvas(id: string) {
    this.canvas.close(id);
  }

  getCompanyPackage(){
    console.log(this.data.id);
    
    this.companiesService.CompanyValidEnrollment(this.data.id).subscribe((res)=>{
      this.package=res;
      console.log(this.package);
      console.log(this.package.start);
     let datyStart =this.package.start.split(" ")[0]
       const [day, month, year] = datyStart.split("-");
       this.startDate = new Date(+year, +month - 1, +day);
      let datyEnd=this.package.end.split(" ")[0]
      const [da, mont, yea] = datyEnd.split("-");
       this.endDate = new Date(+year, +month - 1, +day);
    })
  }


}

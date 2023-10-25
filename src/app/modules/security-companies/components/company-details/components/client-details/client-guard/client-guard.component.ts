import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityGuard } from 'src/app/modules/core/models/security-guard';
import { Routing } from 'src/app/modules/core/routes/app-routes';
import { ClientSite } from 'src/app/modules/security-companies/models/company';
import { CompaniesService } from 'src/app/modules/security-companies/services/companies.service';

@Component({
  selector: 'app-client-guard',
  templateUrl: './client-guard.component.html',
  styleUrls: ['./client-guard.component.scss']
})
export class ClientGuardComponent implements OnInit {
   id!:any
   sites!:ClientSite[]
  
  constructor(private company:CompaniesService , private route: ActivatedRoute ,  private router: Router, ) { }

  ngOnInit(): void {

    this.getData()
   // console.log(this.locationLink);
    
  }



  getData(){
    this.id=this.route.parent?.snapshot.params['id']
  //   let locationLink = `/${Routing.companies.module}/${Routing.companies.children.clientDetails}/${this.id}/${Routing.companies.children.clientGuard}/${Routing.companies.children.guardCard}`
  //  console.log(locationLink);
   
    this.company.getAllClientSites(this.id).subscribe((res:any)=>{
      this.sites=res;
      console.log(this.sites);
      
    })
  }
  Redirect(id:any , numberofGuards:number){
    this.router.navigate([
      `/${Routing.companies.module}/${Routing.companies.children.clientDetails}/${this.id}/${Routing.companies.children.clientGuard}/${Routing.companies.children.guardCard}`,id
    ]);
  }

  
}

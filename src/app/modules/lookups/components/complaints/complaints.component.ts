import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/modules/core/models/pagination';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { CompaniesService } from 'src/app/modules/security-companies/services/companies.service';
import { RasdInfraction } from '../../model/RasdInfraction';
import { ComplaintsService } from '../../services/complaints.service';
import { Routing } from 'src/app/modules/core/routes/app-routes';
@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {
  selected:boolean=true
  data: number = 0;
  allComplaints: any;
  allCompanies: any;
  status: string = '';
  arrangment: string = '';
  Complaints!: Pagination<RasdInfraction>;
  searchKey = '';
  pageSize = 10;
  pageNumber = 1;
  sizes = [5, 10, 20, 30];
  constructor(
    private _ComplaintsService: ComplaintsService,
    public lang: LangService,
    private _CompaniesService: CompaniesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAll();
    this.getAllCompanies();
  }
  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.getAll();
  }

  onPageChange(event: number) {
    this.pageNumber = event;
    this.getAll();
  }
  getAll() {
    this._ComplaintsService
      .getAll(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        this.allComplaints = res;
        console.log(this.allComplaints);

        if (this.status == '') {
          this.allComplaints;
        } else if (this.status == 'accepted') {
          let all = this.allComplaints.filter((element: any) => {
            return element.infractionStatus.nameEn == 'accepted';
          });
          this.allComplaints = all;
          this.status=''
        } else if (this.status == 'rejected') {
          let all = this.allComplaints.filter((element: any) => {
            return element.infractionStatus.nameEn == 'rejected';
          });
          this.allComplaints = all;
          this.status=''
        } else {
          let all = this.allComplaints.filter((element: any) => {
            return (
              element.infractionStatus.nameEn != 'rejected' &&
              element.infractionStatus.nameEn != 'accepted'
            );
          });
          this.allComplaints = all;
          this.status=''
        }
        if (this.arrangment == 'ascending') {
          this.allComplaints.sort((a: any, b: any) =>
            a.created < b.created ? -1 : 1
          );
          this.arrangment =''
        } else {
          this.allComplaints.sort((a: any, b: any) =>
            a.created > b.created ? -1 : 1
          );
          this.arrangment=''
        }
      });
  }
  filter1() {
    this.status = 'accepted';
    if (this.data == 0) {
      this.getAll();
    } else {
      this.onSelected(this.data);
    }
  }
  filter2() {
    this.status = 'rejected';
    if (this.data == 0) {
      this.getAll();
    } else {
      this.onSelected(this.data);
    }
  }
  filter3() {
    this.status = 'under review';
    if (this.data == 0) {
      this.getAll();
    } else {
      this.onSelected(this.data);
    }
  }
  ascending() {
    this.arrangment = 'ascending';
    if (this.data == 0) {
      this.getAll();
    } else {
      this.onSelected(this.data);
    }
  }
  descending() {
    this.arrangment = 'descending';
    if (this.data == 0) {
      this.getAll();
    } else {
      this.onSelected(this.data);
    }
  }
  getAllCompanies() {
    this._CompaniesService.getAllApproved(1, 2000).subscribe((res) => {
      this.allCompanies = res.data;
    });
  }
  onSelected(data: any) {
    this.data = data;
    this.selected=false
    this._ComplaintsService
      .getDataByCompany(this.pageNumber, this.pageSize, data)
      .subscribe((res) => {
        this.allComplaints = res.data;
        if (this.status == '') {
          this.allComplaints;
        } else if (this.status == 'accepted') {
          let all = this.allComplaints.filter((element: any) => {
            return element.infractionStatus.nameEn == 'accepted';
          });
          this.allComplaints = all;
        } else if (this.status == 'rejected') {
          let all = this.allComplaints.filter((element: any) => {
            return element.infractionStatus.nameEn == 'rejected';
          });
          this.allComplaints = all;
        } else {
          let all = this.allComplaints.filter((element: any) => {
            return (
              element.infractionStatus.nameEn != 'rejected' &&
              element.infractionStatus.nameEn != 'accepted'
            );
          });
          this.allComplaints = all;
        }
        if (this.arrangment == 'ascending') {
          this.allComplaints.sort((a: any, b: any) =>
            a.created < b.created ? -1 : 1
          );
        } else {
          this.allComplaints.sort((a: any, b: any) =>
            a.created > b.created ? -1 : 1
          );
        }
      });
  }
  openDetails(Complaint: any) {

      this.router.navigate([
        `/${Routing.lookups.module}/${Routing.lookups.children.infractionDetails}`,
        Complaint.id,
      ])

  }
  clear(){
    this.selected=true
    this.arrangment=''
    this.status=''
    this.data=0
    this.getAll();
  }
}

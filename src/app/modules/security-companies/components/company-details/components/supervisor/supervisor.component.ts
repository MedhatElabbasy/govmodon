import { LangService } from './../../../../../core/services/lang.service';
import { CompanySecurityGuard } from './../../../../models/company-security-guard';
import { Component, OnInit } from '@angular/core';
import { Sizes } from 'src/app/modules/core/data/page-sizes';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.scss']
})
export class SupervisorComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [...Sizes];
  guards: CompanySecurityGuard[] = [];
  searchKey = '';

  constructor(
    public lang: LangService,
    private route: ActivatedRoute,
 
  ) {}

  ngOnInit(): void {
    this.guards = this.route.snapshot.data['guards'];
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
  }

}

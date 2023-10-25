import { ActivatedRoute } from '@angular/router';
import { LangService } from './../../../../../core/services/lang.service';
import { CompanySecurityGuard } from './../../../../models/company-security-guard';
import { Component, OnInit } from '@angular/core';
import { Sizes } from 'src/app/modules/core/data/page-sizes';

@Component({
  selector: 'app-guards',
  templateUrl: './guards.component.html',
  styleUrls: ['./guards.component.scss']
})
export class GuardsComponent implements OnInit {
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

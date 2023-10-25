import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractStatus } from 'src/app/modules/core/enums/status.enum';
import { Pagination } from 'src/app/modules/core/models/pagination';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Contract } from '../../models/contract';
import { ContractsService } from '../../services/contracts.service';

@Component({
  selector: 'app-accepted-contracts',
  templateUrl: './accepted-contracts.component.html',
  styleUrls: ['./accepted-contracts.component.scss'],
})
export class AcceptedContractsComponent implements OnInit {
  contracts!: Contract[] ;
  searchKey = '';
  pageSize = 10;
  pageNumber = 1;
  sizes = [5, 10, 20, 30];
  canvasDetails = 'contract-details';
  selectedContract!: Contract;
  total!:number;
  items:any []=[];
  item : any;
  language!:string;

  constructor(
    private route: ActivatedRoute,
    public lang: LangService,
    private contractService: ContractsService,
    public canvas: OffcanvasService
  ) {}

  ngOnInit(): void {
    this.getInitData();
  }

  getInitData() {
    let data: Pagination<Contract> = this.route.snapshot.data['contracts'];
    this.contracts=data.data;
    this.total = data.totalCount;

    this.contractService.getContractType().subscribe((x)=>
      {//console.log(x);
        this.items=x.optionSetItems;
        this.items.forEach((ele)=>console.log(ele.color))
        
      });
  }

  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.getContracts();
  }

  onPageNumber(event: number) {
    this.pageNumber = event;
    this.getContracts();
  }

  toggleStatus(event: boolean, contractId: number) {
    if (event) {
      this.contractService
        .updateStatus(contractId, 3)
        .subscribe(() => this.getContracts());
    } else {
      this.contractService
        .updateStatus(contractId, 4)
        .subscribe(() => this.getContracts());
    }
  }

  getContracts() {
    this.contractService
      .getAcceptedContracts(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        this.contracts = res.data;

        if(this.item=='8'){
          let all=this.contracts.filter((ele)=>ele.contractType.value == this.item);
          this.contracts=all;
          this.item=''
        }else if(this.item=='1'){
          let all=this.contracts.filter((ele)=>ele.contractType.value == this.item);
          this.contracts=all;
          this.item=''
        }else{ 
          this.contracts;
        }
        if(this.language == ''){
          this.contracts;
        }else if (this.language == 'ascending') {
          var x = [];
          var y = [];

          const regex = /^[A-Z a-z]/;
          for (let i = 0; i < this.contracts.length; i++) {
            if (this.contracts[i].securityCompany.name.match(regex)) {
              x.push(this.contracts[i]);
            }else{
              y.push(this.contracts[i]);
            }
          }
          this.contracts = [...x.sort(),...y.sort()];
          x.sort((a, b) => (a.securityCompany.name < b.securityCompany.name ? -1 : 1));
          y.sort((a, b) => (a.securityCompany.name < b.securityCompany.name ? -1 : 1));
          this.contracts = [...x,...y];
          this.language=''
        } else {
          var x = [];
          var y = [];
          const regex = /^[ء-ي]/;
          for (let i = 0; i < this.contracts.length; i++) {
            if (this.contracts[i].securityCompany.name.match(regex)) {
              x.push(this.contracts[i]);
            }else{
              y.push(this.contracts[i]);
            }
          }
          this.contracts = [...x.sort(),...y.sort()];
          x.sort((a, b) => (a.securityCompany.name < b.securityCompany.name ? -1 : 1));
          y.sort((a, b) => (a.securityCompany.name < b.securityCompany.name ? -1 : 1));
          this.contracts = [...x,...y];
          this.language=''
        }

      });
  }

  openDetails(contract: Contract) {
    this.selectedContract = contract;
    this.canvas.open(this.canvasDetails);
  }

  reject(id: number) {
    this.contractService
      .updateStatus(id, ContractStatus.accepted)
      .subscribe(() => this.getContracts());
  }

 
  english() {
    this.language = 'ascending';
    this.getContracts();
  }
  arabic() {
    this.language = 'descending';
    this.getContracts();
  }
  filter(item : number){
   // this.contracts=this.contracts.filter((ele)=>ele.contractType.value == item);
    this.item=item;
    this.getContracts();
  }
  clear(){
    this.getContracts();
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  ContractStatus,
  OptionSet,
  OrderStatus,
} from 'src/app/modules/core/enums/status.enum';
import { ClientModel } from 'src/app/modules/core/models/client-model';
import { Pagination } from 'src/app/modules/core/models/pagination';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Contract } from '../../models/contract';
import { ContractsService } from '../../services/contracts.service';

@Component({
  selector: 'app-all-contracts',
  templateUrl: './all-contracts.component.html',
  styleUrls: ['./all-contracts.component.scss'],
})
export class AllContractsComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  contracts!: Contract[];
  searchKey = '';
  total!: number;
  pageSize = 10;
  pageNumber = 1;
  sizes = [5, 10, 20, 30];
  canvasDetails = 'contract-details';
  selectedContract!: Contract | null;
  status = ContractStatus;
  language : string ='';
  item : any;
  items:any []=[];
  refuseForm = new FormGroup({
    reason: new FormControl(null, [Validators.required]),
  });

  modalID = 'reject-modal';
  typingTimer!: any;                //timer identifier
  doneTypingInterval = 500;
  key!: any;
  constructor(
    private route: ActivatedRoute,
    public lang: LangService,
    private contractService: ContractsService,
    public canvas: OffcanvasService,
    private modal: ModalService
  ) {}

  get reason(): any {
    return this.refuseForm.get('reason');
  }

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

  getContracts() {
    this.contractService
      .getAllContractByStatus(
        this.pageNumber,
        this.pageSize,
        ContractStatus.acceptedByTakid
      )
      .subscribe((res) => {
        this.contracts = res.data;

        if(this.item=='8'){
          let all=this.contracts.filter((ele)=>ele.contractType.value == this.item);
          this.contracts=all;
        }else if(this.item=='1'){
          let all=this.contracts.filter((ele)=>ele.contractType.value == this.item);
          this.contracts=all;
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

  approve(contract: Contract) {
    this.contractService
      .updateOrderStatus(
        contract.clientOrderId,
        OptionSet.OrderStatus,
        OrderStatus.contractAccepted
      )
      .subscribe(() => {});

    this.contractService
      .updateContractStatus(contract.id, ContractStatus.accepted)
      .subscribe((response) => {
        this.getContracts();
      });

    this.createClientUserForCompany(contract);
  }

  reject(contract: Contract) {
    this.modal.open(this.modalID);
    this.selectedContract = contract;
  }

  rejectContract() {
    if (this.refuseForm.invalid) return;

    this.contractService
      .updateOrderStatus(
        this.selectedContract?.clientOrderId,
        OptionSet.OrderStatus,
        OrderStatus.contractRejected
      )
      .subscribe(() => {});

    this.contractService
      .changeContractStatus(
        this.selectedContract!.id,
        ContractStatus.rejected,
        this.reason.value
      )
      .subscribe(() => {
        this.selectedContract = null;
        this.form.resetForm();
        this.getContracts();
      });
  }

  createClientUserForCompany(contract: Contract) {
    let model: ClientModel = {
      clientCompanyId: contract.clientCompany.id,
      securityCompanyBranchId: contract.securityCompanyBranchId,
      securityCompanyId: contract.securityCompanyId,
    };

    this.contractService.createClientUser(model).subscribe(() => {});
  }


  english() {
    this.language = 'english';
    this.getContracts();
  }
  arabic() {
    this.language = 'arabic';
    this.getContracts();
  }
  filter(item : number){
   // this.contracts=this.contracts.filter((ele)=>ele.contractType.value == item);
    this.item=item;
    this.getContracts();
  }

  clear(){
    this.getContracts();}

    
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
      this.getContracts();
    }else{
      // this.contractService.search(this.key, this.pageNumber , this.pageSize).subscribe((res:any)=>{
      //   console.log(res);
      //   this.contracts=res.data;
      //   this.total=res.totalCount
      //    console.log(this.contracts);
         
      //   })
    }
  }



}

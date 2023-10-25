import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AgentService } from '../../services/agent.service';
import { Pagination } from 'src/app/modules/core/models/pagination';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { CompaniesService } from 'src/app/modules/security-companies/services/companies.service';
import { Company } from 'src/app/modules/security-companies/models/company';
import { Agent } from 'src/app/modules/security-companies/models/company-security-guard';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { agent } from '../../models/agent';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { LangService } from 'src/app/modules/core/services/lang.service';



@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit {
  canvasID='agent-details'
  agentDetails!:agent
  allCompanies!: any;
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5, 10, 20, 30];
  agents!: Agent[];
  searchKey!: string;
  language ='';
  modelID: string ="filter-agents";
  companys!:Company[];
  agentcompanies: any[] = [];
  optionSetIdContorl!: FormControl;
  companyID!:number;
  filterForm!: FormGroup;
  data!:any;
  active!:string;

  constructor(  private route: ActivatedRoute,public _canvas:OffcanvasService,private _CompaniesService: CompaniesService,private fb: FormBuilder, private _agentService:AgentService ,    private modalService: ModalService,private _companies:CompaniesService, public lang:LangService ){
    this.optionSetIdContorl = new FormControl(null, Validators.required);
    console.log((this.optionSetIdContorl.value));
    this.generateFilterForm();
    this.getAllCompanies();
   }


   get filterControls(): any {
    return this.filterForm.controls;
  }


  generateFilterForm() {
    this.filterForm = this.fb.group({
      filter:[false]
    });
  }

  getAllCompanies() {
    this._CompaniesService.getAllApproved(1, 2000).subscribe((res) => {
      this.allCompanies = res.data;
    });
  }


  ngOnInit(): void {
    this.getAgents();
    this.getcompanies();
    this.optionSetIdContorl.valueChanges.subscribe((res) => {console.log(res)
      this.companyID=res;
    })
  }

  getAgents(){
    this._agentService.getAllAgents().subscribe((res)=>{
      console.log(res);
      this.agents=res;
      
      if(this.language ==''){
        this.agents;   
      }else if (this.language == 'ascending') {
        var x = [];
        var y = [];

        const regex = /^[A-Z a-z]/;
        for (let i = 0; i < this.agents.length; i++) {
          if (this.agents[i].firstName.match(regex)) {
            x.push(this.agents[i]);
          } else {
            y.push(this.agents[i]);
          }
        }
        this.agents = [...x.sort(), ...y.sort()];
        x.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
        y.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
        this.agents = [...x, ...y];
      } else  {
        var x = [];
        var y = [];

        const regex = /^[ء-ي]/;
        for (let i = 0; i < this.agents.length; i++) {
          if (this.agents[i].firstName.match(regex)) {
            x.push(this.agents[i]);
          } else {
            y.push(this.agents[i]);
          }
        }
        this.agents = [...x.sort(), ...y.sort()];
        x.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
        y.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
        this.agents = [...x, ...y];
      }
        
    });
  }


  getcompanies(){
    this._companies.updates.subscribe((res)=>
      this.companys=res.data
    )}

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
    this.getAgents();
  }

  onPageChange(event: number) {
    this.pageNumber = event;
    this.getAgents();
  }


  english(){
   this.language="ascending";
   this.getAgents();
  }
  arabic(){
    this.language="descending";
   this.getAgents();
  }


  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  

  onSubmit(){
    console.log((this.optionSetIdContorl.value));
  }
  filter(){
       console.log(this.filterForm.controls['filter'].value);
       console.log(this.filterForm.value);
       
  }
  onSelected(data: any){
    this.data=data;
    console.log(this.data);
     this._agentService.getAllCompanyAgent(this.data).subscribe((res)=>{
      console.log(res);
      this.agents=res;
    })
    this.closeModal(this.modelID);
  }
  getAgentsState(){
    this._agentService.getAllAgents().subscribe((res)=>{
      console.log(res);
      this.agents=res;
      if (this.active == "") {
        this.agents;
       } else if(this.active == "true"){
         let all = this.agents.filter((element) => {
           return element.isActive;
         });
         this.agents = all;
       }
       else{
         let all = this.agents.filter((element) => {
           return !element.isActive;
         });
         this.agents = all;
         console.log(this.agents);
       }
  
    
    });
    this.closeModal(this.modelID);
  }

  filterActive(){
    console.log("active");
    this.active="true";
    this.getAgentsState();
    
  }
  filterDeactive(){
    console.log("deActive");
    this.active="false";
    this.getAgentsState();
  }

  clear(){
    this.language=''
    this.getAgents();
}

openDetails(agentDetails:agent){
  this.agentDetails=agentDetails
  this._canvas.open(this.canvasID)
  }

}

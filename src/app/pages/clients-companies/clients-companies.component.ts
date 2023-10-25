import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffcanvasComponent } from 'src/app/modules/core/components/offcanvas/offcanvas.component';
import { ClientsCompanies } from 'src/app/modules/core/models/clients-companies';
import { Pagination } from 'src/app/modules/core/models/pagination';
import { ClientsCompaniesService } from 'src/app/modules/core/services/clients-companies.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { UserServicesService } from 'src/app/modules/users/services/user-services.service';

@Component({
  selector: 'app-clients-companies',
  templateUrl: './clients-companies.component.html',
  styleUrls: ['./clients-companies.component.scss'],
})
export class ClientsCompaniesComponent implements OnInit {
  active:string=''
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5, 10, 20, 30];
  clients!: ClientsCompanies[];
  searchKey!: string;
  language: string ='';
  clientDetails:any
  canvasID="clientDetails"
  key!:any;
  typingTimer!: any;                //timer identifier
  doneTypingInterval = 1000;
  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsCompaniesService,
    private userServices: UserServicesService,
    public _canvas:OffcanvasService
  ) {}

  ngOnInit() {
    this.getInitData();
  }

  getInitData() {
    let data: Pagination<ClientsCompanies> = this.route.snapshot.data['clients'];
    console.log(data);
    this.clients=data.data;
    console.log(this.clients);

    this.total = data.totalCount;
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
    this.getClients();
  }

  onPageChange(event: number) {
    this.pageNumber = event;
    this.getClients();
  }

  getClients() {
    this.clientsService
      .getALlCompanies(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        this.clients = res.data;
        if (this.active == '') {
          this.clients;
        } else if (this.active == 'active') {
          let all = this.clients.filter((element) => {
            return element.isActive;
          });
          this.clients = all;
          this.active=''
        } else {
          let all = this.clients.filter((element) => {
            return !element.isActive;
          });
          this.clients = all;
          this.active=''
        }
        if(this.language ==''){
          this.clients
        }else if (this.language == 'ascending') {
          var x = [];
          var y = [];

        const regex = /^[A-Z a-z]/;
        for (let i = 0; i < this.clients.length; i++) {
          if (this.clients[i].name.match(regex)) {
            x.push(this.clients[i]);
          } else {
            y.push(this.clients[i]);
          }
        }
        this.clients = [...x.sort(), ...y.sort()];
        x.sort((a, b) => (a.name < b.name ? -1 : 1));
        y.sort((a, b) => (a.name < b.name ? -1 : 1));
        this.clients = [...x, ...y];
      } else {
        var x = [];
        var y = [];

        const regex = /^[ء-ي]/;
        for (let i = 0; i < this.clients.length; i++) {
          if (this.clients[i].name.match(regex)) {
            x.push(this.clients[i]);
          } else {
            y.push(this.clients[i]);
          }
        }
        this.clients = [...x.sort(), ...y.sort()];
        x.sort((a, b) => (a.name < b.name ? -1 : 1));
        y.sort((a, b) => (a.name < b.name ? -1 : 1));
        this.clients = [...x, ...y];
      }
      });
  }

  english() {
    this.language = 'ascending';
    this.getClients();
  }
  arabic() {
    this.language = 'descending';
    this.getClients();
  }
  filterActive(){
    this.active='active'
    this.getClients()
  }
  filterDeActive(){
    this.active='deactive'
   this.getClients()
  }

  clear(){
    this.language=''
    this.getClients();
  }

  details(item:ClientsCompanies,event: any){
    event.stopImmediatePropagation();
   this.clientDetails=item
   this._canvas.open(this.canvasID)
  }

  toggleState(item: ClientsCompanies, event: any) {
  
    if (event.checked) {
      this.clientsService.active(item.id);
    } else {
      this.clientsService.deactive(item.id);
    }
  }
  stopEvent(event:any){
    event.stopImmediatePropagation();
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
      this.getClients();
    }else{
      this.clientsService.search(this.key , this.pageNumber , this.pageSize).subscribe((res:any)=>{
        console.log(res);
        this.clients =res.data;
        this.total=res.totalCount;
        console.log(this.total);

        })
    }
  }

}

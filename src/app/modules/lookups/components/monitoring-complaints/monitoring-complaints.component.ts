import { Component, OnInit } from '@angular/core';
import { ComplaintsService } from '../../services/complaints.service';
declare var $: any;
@Component({
  selector: 'app-monitoring-complaints',
  templateUrl: './monitoring-complaints.component.html',
  styleUrls: ['./monitoring-complaints.component.scss'],
})
export class MonitoringComplaintsComponent implements OnInit {
  myData: any;
  pageSize = 10;
  pageNumber = 1;
  sizes = [5, 10, 20, 30];
  constructor(private _ComplaintsService: ComplaintsService) {}

  ngOnInit(): void {
    $(`#link1`).parent().addClass('myBorder');
  }
}

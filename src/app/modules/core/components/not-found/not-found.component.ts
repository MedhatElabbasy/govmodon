import { Component, OnInit } from '@angular/core';
import { Routing } from '../../routes/app-routes';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  link = `/${Routing.home}`;
  constructor() {}

  ngOnInit() {}
}

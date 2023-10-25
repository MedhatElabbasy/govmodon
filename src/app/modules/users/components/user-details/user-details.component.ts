import { Component, OnInit , Input } from '@angular/core';
import { UserData } from '../../models/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Input('user') userDetails!: UserData;
  constructor() { }

  ngOnInit(): void {
  }

}

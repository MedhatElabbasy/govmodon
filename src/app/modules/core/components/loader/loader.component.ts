import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  public loading!: BehaviorSubject<boolean>;
  constructor(private loader: LoaderService) {}

  ngOnInit() {
    this.loading = this.loader.isLoading;
  }
}

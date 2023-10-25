import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/modules/auth/models/user-info';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { SIDEBAR_LIST } from '../../data/sidebar-menu';
import { Languages } from '../../enums/languages.enum';
import { Routing } from '../../routes/app-routes';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  sidebarMenu = [...SIDEBAR_LIST];
  sidebarActive: boolean = true;
  routing = Routing;
  user!: UserInfo;
  constructor(public router: Router,
    private lang: LangService,
    private auth: AuthService
    ) {
      this.auth.userInfo.subscribe((res) => {
        if (res) {
          this.user = res;
        }
      });

    
    }

  ngOnInit() {
   
  }

  onLangChange() {
    if (this.lang.currentLang === Languages.ar) {
      this.lang.changeLang(Languages.en);
    } else {
      this.lang.changeLang(Languages.ar);
    }
  }
  logout(){
    this.auth.logout()
  }

}

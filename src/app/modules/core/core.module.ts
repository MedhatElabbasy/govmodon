import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PrimeNgModule } from './primeng.module';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { ModalComponent } from './components/modal/modal.component';
import { OffcanvasComponent } from './components/offcanvas/offcanvas.component';
import { AuthInterceptor } from '../auth/interceptors/auth.interceptor';
import {
  FormsModule,
  NG_VALIDATORS,
  ReactiveFormsModule,
} from '@angular/forms';
import { SanitizerPipe } from './pipes/sanitizer.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmptyComponent } from './components/empty/empty.component';
import { StatusBadgeComponent } from './components/status-badge/status-badge.component';
import { TabLayoutComponent } from './components/tab-layout/tab-layout.component';
import { CustomValidators } from './validators/custom-validator';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgApexchartsModule } from 'ng-apexcharts';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const declarations: any = [
  OffcanvasComponent,
  LayoutComponent,
  NotFoundComponent,
  HomeComponent,
  SettingsComponent,
  LoaderComponent,
  ModalComponent,
  EmptyComponent,
  SanitizerPipe,
  StatusBadgeComponent,
  TabLayoutComponent,
  
];

const references = [
  CommonModule,
  IonicModule.forRoot(),
  RouterModule,
  HttpClientModule,
  Ng2SearchPipeModule,
  AngularSvgIconModule.forRoot(),
  TranslateModule.forChild({
    loader: {
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [HttpClient],
    },
  }),
  PrimeNgModule,
  ReactiveFormsModule,
  FormsModule,
  NgxPaginationModule,
  InfiniteScrollModule,
  NgApexchartsModule
];

@NgModule({
  declarations: [declarations],
  imports: [references],
  exports: [declarations, references],
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: CustomValidators,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
export function loader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function convertDateToString(date: any) {
  return new Date(date)
    .toLocaleString('en-US', {
      day: 'numeric',
      year: 'numeric',
      month: 'numeric',
    })
    .replace('/', '-')
    .replace('/', '-');
}

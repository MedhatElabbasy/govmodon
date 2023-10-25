import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LookupsRoutingModule } from './lookups-routing.module';
import { MonitoringComplaintsComponent } from './components/monitoring-complaints/monitoring-complaints.component';
import { InfractionDetailsComponent } from './components/infraction-details/infraction-details.component';
import { CustomerManagementComponent } from './components/customer-management/customer-management.component';
import { CoreModule } from '../core/core.module';
import { RasdUsersComponent } from './components/rasd-users/rasd-users.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';

@NgModule({
  declarations: [
    MonitoringComplaintsComponent,
    InfractionDetailsComponent,
    CustomerManagementComponent,
    RasdUsersComponent,
    ComplaintsComponent,
  ],
  imports: [CommonModule, LookupsRoutingModule,CoreModule],
})
export class LookupsModule {}

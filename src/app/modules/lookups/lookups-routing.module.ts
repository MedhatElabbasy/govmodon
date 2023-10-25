import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerManagementComponent } from './components/customer-management/customer-management.component';
import { InfractionDetailsComponent } from './components/infraction-details/infraction-details.component';
import { MonitoringComplaintsComponent } from './components/monitoring-complaints/monitoring-complaints.component';
import { LookupsRoutes } from './routes/lookup-routes';

const routes: Routes = [
  {
    path:LookupsRoutes.customerManagement,
    component:CustomerManagementComponent,

  },
  {
    path:LookupsRoutes.infractionDetails+ '/:id',
    component:InfractionDetailsComponent,

  },
  {
    path:LookupsRoutes.MonitoringComplaints,
    component:MonitoringComplaintsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LookupsRoutingModule { }

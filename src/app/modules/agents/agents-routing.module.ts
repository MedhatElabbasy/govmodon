import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentsComponent } from './components/agents/agents.component';
import { AgentsRoutes } from './routes/agents-routes.enum';

const routes: Routes = [

  {
    path: '',
    redirectTo: AgentsRoutes.agents,
    pathMatch: 'full',
  },

  {
    path: AgentsRoutes.agents,
    component:AgentsComponent,
   
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentsRoutingModule { }

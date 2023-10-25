import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentsRoutingModule } from './agents-routing.module';
import { AgentsComponent } from './components/agents/agents.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    AgentsComponent
  ],
  imports: [
    CommonModule,
    AgentsRoutingModule,
    CoreModule
  ]
})
export class AgentsModule { }

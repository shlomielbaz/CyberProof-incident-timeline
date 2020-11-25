import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayIncidentComponent } from './components/display-incident/display-incident.component';
import { IncidentListComponent } from './components/incident-list/incident-list.component';


const routes: Routes = [
  {
    path: '',
    component: IncidentListComponent
  },
  {
    path: 'incident/:id',
    component: DisplayIncidentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

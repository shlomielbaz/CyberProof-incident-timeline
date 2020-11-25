import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayIncidentComponent } from './components/display-incident/display-incident.component';
import { DisplayTimelineComponent } from './components/display-timeline/display-timeline.component';
import { IncidentListComponent } from './components/incident-list/incident-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayIncidentComponent,
    DisplayTimelineComponent,
    IncidentListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

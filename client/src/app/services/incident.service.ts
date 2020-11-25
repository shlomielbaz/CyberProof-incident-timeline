import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IncidentModel } from '../models/incident.model';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {

  IncidentChange: Subject<IncidentModel> = new Subject<IncidentModel>();


  private incident: IncidentModel

  get Incident(): IncidentModel { return this.incident; }

  set Incident(incident: IncidentModel) {
    this.incident = incident;

    this.IncidentChange.next(this.incident);
  }

  constructor() { }

}

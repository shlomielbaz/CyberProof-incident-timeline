import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';


import { IncidentModel } from '../../models/incident.model';
import { IncidentService } from 'src/app/services/incident.service';

@Component({
  templateUrl: './display-incident.component.html',
  styleUrls: ['./display-incident.component.scss']
})

export class DisplayIncidentComponent implements OnInit {

  incident: IncidentModel = new IncidentModel({});

  countries: string[] = ["us", "cn", "de", "il"];
  priorities: string[] = ["Low", "Medium", "High", "Critical"];
  statuses: string[] = ["Open", "Closed"];

  constructor(private http: HttpClient, private route: ActivatedRoute, private incidentService: IncidentService) {
  }

  saveIncident() {
    const { id } = this.incident;
    this.http.put('/api/incident/' + id, this.incident).subscribe((data: any) => {
      this.incidentService.Incident = data;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.http.get('/api/incident/' + params.id).subscribe((data: any) => {
        this.incidentService.Incident = data;
      });
    });

    this.incidentService.IncidentChange.subscribe((data: any) => {
      this.incident = data;
    });
  }

}

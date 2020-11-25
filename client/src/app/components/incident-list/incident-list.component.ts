import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';


import { IncidentModel } from '../../models/incident.model';
import { IncidentService } from 'src/app/services/incident.service';

@Component({
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.scss']
})

export class IncidentListComponent implements OnInit {

  incidents: IncidentModel[];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  goIncident(incident: IncidentModel) {
    this.router.navigate(['/incident/', incident.id])
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.http.get('/api/incident/').subscribe((data: any) => {
        this.incidents = data;
      });
    });
  }

}

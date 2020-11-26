import { Component, OnInit } from '@angular/core';

import { IncidentModel } from '../../models/incident.model';
import { IncidentService } from 'src/app/services/incident.service';

@Component({
  selector: 'app-display-timeline',
  templateUrl: './display-timeline.component.html',
  styleUrls: ['./display-timeline.component.scss']
})

export class DisplayTimelineComponent implements OnInit {

  incident: IncidentModel;
  audits: any[];

  constructor(private incidentService: IncidentService) {
  }

  getDisplayTime(time: string) {
    const timestemp = new Date(time);
    const now = new Date();

    const t2 = now.getTime();
    const t1 = timestemp.getTime();

    const diff = Math.floor((t2 - t1) / (60 * 1000));

    if (diff < 60) {
      return 'a few seconds ago';
    }
    else if (diff == 60) {
      return 'a minute ago';
    }


    return `${Math.floor(diff / 60)} minutes ago`;
  }

  getFormatedMessage(audit: any) {

    let from, to;

    switch (audit.property) {
      case 'status':
        from = `<span class="status ${audit.from.toLowerCase()}">${audit.from}</span>`;
        to = `<span class="status ${audit.to.toLowerCase()}">${audit.to}</span>`;
        break;

      case 'priority':
        from = `<span class="priority ${audit.from.toLowerCase()}">${audit.from}</span>`;
        to = `<span class="priority ${audit.to.toLowerCase()}">${audit.to}</span>`;
        break;

      case 'country':
      case 'name':
        from = audit.from;
        to = audit.to;
        break;
    }

    return audit.message.replace(/\{1\}/, from).replace(/\{2\}/, to);
  }

  ngOnInit() {
    this.incidentService.IncidentChange.subscribe((data: any) => {
      this.audits = data['audits'] instanceof Array ? data['audits'] : [];
      this.incident = new IncidentModel(data);
    });
  }

}

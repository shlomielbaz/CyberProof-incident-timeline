export class IncidentModel {
  name: string;
  status: string;
  priority: string;
  country: string;
  id: number;
  audits?: any[];

  constructor(obj: any = null) {
    if (obj != null) {
      Object.assign(this, obj);
    }
  }
}

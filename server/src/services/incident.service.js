const IncidentModel = require("../models/incident.model");
let Validator = require('fastest-validator');


let audits = {};
let counter = 0;



const incidents = [
	{ "name": "Incident 1", "id": 1, "status": "Open", "priority": "Low", "country": "us" },
	{ "name": "Incident 2", "id": 2, "status": "Open", "priority": "Medium", "country": "cn" },
	{ "name": "Incident 3", "id": 3, "status": "Open", "priority": "High", "country": "de" },
	{ "name": "Incident 4", "id": 4, "status": "Closed", "priority": "Critical", "country": "il" },
	{ "name": "Incident 5", "id": 5, "status": "Closed", "priority": "Low", "country": "us" },
	{ "name": "Incident 6", "id": 6, "status": "Closed", "priority": "Medium", "country": "cn" },
	{ "name": "Incident 7", "id": 7, "status": "Open", "priority": "High", "country": "cn" },
];

/* create an instance of the validator */
let incidentValidator = new Validator();

/* use the same patterns as on the client to validate the request */
let namePattern = /([A-Za-z\-\’])*/;
let statusPattern = /^(Open|Closed)$/;
let priorityPattern = /^(Low|Medium|High|Critical)$/;

/* incident validator shema */
const incidentVSchema = {
	name: { type: "string", min: 1, max: 50, pattern: namePattern },
	status: { type: "string", min: 1, max: 50, pattern: statusPattern },
	priority: { type: "string", max: 75, pattern: priorityPattern },
	country: { type: "string", min: 2, max: 2 }
};

/* static incident service class */
class IncidentService {
	static create(data) {

		let { name, status, priority, country } = data;

		let incident = new IncidentModel(name, status, priority, country);

		incidents.push(incident);

		return incident;
	}

	static get() {
		return incidents;
	}

	static retrieve(id) {
		const incident = incidents.find(incident => incident.id == id)

		if (incident != null) {
			return incident;
		}
		else {
			throw new Error('Unable to retrieve a incident by (id:' + id + ')');
		}
	}

	static update(id, data) {
		const incident = incidents.find(incident => incident.id == id);

		if (incident.audits === undefined) {
			incident.audits = [];
		}

		if (data['status'] != incident['status']) {
			incident.audits.push({
				title: `incident ${data['status']}`,
				message: 'incident status from {1} to {2}',
				property: 'status',
				from: incident['status'],
				to: data['status'],
				updated: new Date()
			});

			incident['status'] = data['status'];
		}

		if (data['name'] != incident['name']) {
			incident.audits.push({
				title: `incident ${data['name']}`,
				message: 'incident name from {1} to {2}',
				property: 'name',
				from: incident['name'],
				to: data['name'],
				updated: new Date()
			});
			incident['name'] = data['name'];
		}

		if (data['priority'] != incident['priority']) {
			incident.audits.push({
				title: `incident ${data['priority']}`,
				message: 'incident priority from {1} to {2}',
				property: 'priority',
				from: incident['priority'],
				to: data['priority'],
				updated: new Date()
			});
			incident['priority'] = data['priority'];
		}

		if (data['country'] != incident['country']) {
			incident.audits.push({
				title: `incident ${data['country']}`,
				message: 'incident country from {1} to {2}',
				property: 'country',
				from: incident['country'],
				to: data['country'],
				updated: new Date()
			});
			incident['country'] = data['country'];
		}

		return incident;
	}

	static delete(id) {
		const idx = incidents.findIndex(incident => incident.id == id);
		delete incidents[idx];
	}
}

module.exports = IncidentService;
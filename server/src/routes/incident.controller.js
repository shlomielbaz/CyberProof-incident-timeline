var express = require('express');
var router = express.Router();
var IncidentService = require('../services/incident.service');


/* GET incident listing. */
router.get('/', async function (req, res, next) {
	const incidents = await IncidentService.get()
	res.json(incidents);
});

/* adds a new incident to the list */
router.post('/', async (req, res, next) => {
	const body = req.body;

	try {
		const incident = await IncidentService.create(body);

		if (body.id != null) {
			incident.id = body.id;
		}

		return res.status(201).json(incident);
	}
	catch (err) {
		if (err.name === 'ValidationError') {
			return res.status(400).json({ error: err.message });
		}

		// unexpected error
		return next(err);
	}
});

/* retrieves a incident by uid */
router.get('/:id', async (req, res, next) => {
	try {
		const incident = await IncidentService.retrieve(req.params.id);

		return res.json(incident);
	}
	catch (err) {
		// unexpected error
		return next(err);
	}
});

/* updates the incident by uid */
router.put('/:id', async (req, res, next) => {
	try {
		const incident = await IncidentService.update(req.params.id, req.body);

		return res.json(incident);
	}
	catch (err) {
		// unexpected error
		return next(err);
	}
});

/* removes the incident from the incident list by uid */
router.delete('/:id', async (req, res, next) => {
	try {
		const incident = await IncidentService.delete(req.params.id);

		return res.json({ success: true });
	}
	catch (err) {
		// unexpected error
		return next(err);
	}
});

module.exports = router;

const express = require('express');
const router = express.Router();

const FlowsController = new (require('../../Controllers/v1/flow'))();

// Retrieve all Flows
router.route('/').get(FlowsController.list);

// Create a new flow
router.route('/').post(FlowsController.add);

module.exports = router
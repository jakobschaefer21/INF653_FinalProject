const express = require('express');
const router = express.Router();
const verifyState = require('../middleware/verifyState');
const statesController = require('../controllers/statesController');

// Get routes
router.get('/', statesController.getAllStates);
router.get('/:state', verifyState, statesController.getState);
router.get('/:state/funfact', verifyState, statesController.getFunFact);
router.get('/:state/capital', verifyState, statesController.getCapital);
router.get('/:state/nickname', verifyState, statesController.getNickname);
router.get('/:state/population', verifyState, statesController.getPopulation);
router.get('/:state/admission', verifyState, statesController.getAdmission);

// Post routes
router.post('/:state/funfact', verifyState, statesController.postFunFact);
// Patch routes
router.patch('/:state/funfact', verifyState, statesController.patchFunFact);
// Delete routes
router.delete('/:state/funfact', verifyState, statesController.deleteFunFact);

module.exports = router;
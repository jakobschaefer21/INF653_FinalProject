const express = require('express');
const router = express.Router();
const verifyState = require('../middleware/verifyState');
const statesController = require('../controllers/statesController');

router.get('/', statesController.getAllStates);
router.get('/:state', verifyState, statesController.getState);
router.get('/:state/funfact', verifyState, statesController.getFunFact);
router.get('/:state/capital', verifyState, statesController.getCapital);
router.get('/:state/nickname', verifyState, statesController.getNickname);
router.get('/:state/population', verifyState, statesController.getPopulation);
router.get('/:state/admission', verifyState, statesController.getAdmission);

router.post('/:state/funfact', verifyState, statesController.postFunFact);
router.patch('/:state/funfact', verifyState, statesController.patchFunFact);
router.delete('/:state/funfact', verifyState, statesController.deleteFunFact);

module.exports = router;
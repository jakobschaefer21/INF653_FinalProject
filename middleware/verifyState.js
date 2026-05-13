const statesData = require('../models/statesData.json');

// Confirm that the state abbreviation is valid
// Accomodates both upper and lower case
// if invalid, return 404
// if valid, add state code to request object
const verifyState = (req, res, next) => {
    const stateCodes = statesData.map(s => s.code);
    const stateCode = req.params.state?.toUpperCase();

    if (!stateCodes.includes(stateCode)) {
        return res.status(404).json({ message: "Invalid state abbreviation parameter" });
    }

    req.code = stateCode;
    next();
};

module.exports = verifyState;
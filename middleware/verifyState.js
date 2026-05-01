const statesData = require('../models/statesData.json');

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
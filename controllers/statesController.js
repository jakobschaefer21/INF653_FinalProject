const stateData = require('../models/statesData.json');
const State = require('../models/States');

// Get all states
// return states data
// merges fun facts from MongoDB
const getAllStates = async (req, res) => {
    const { contig } = req.query;
    let states = [...stateData];

    if (contig === 'true') {
        // contiguous states Alaska and Hawaii
        states = states.filter(s => s.code !== 'AK' && s.code !== 'HI');
    }
    else if (contig === 'false') {
        // non contiguous states Alaska and Hawaii
        states = states.filter(s => s.code === 'AK' || s.code === 'HI');
    }

    // fetch fun facts from MongoDB
    const mongoStates = await State.find();
    states = states.map(s => {
        const found = mongoStates.find(m => m.stateCode === s.code);
        if (found?.funfacts?.length) {
            return { ...s, funfacts: found.funfacts };
        }

        return s;
    });

    res.json(states);
};

// get states/state
// return state data
const getState = async (req, res) => {
    const state = stateData.find(s => s.code === req.code);
    const mongoState = await State.findOne({ stateCode: req.code });
    if (mongoState) {
        return res.json({ ...state, funfacts: mongoState.funfacts });
    }
    res.json(state);
};

// get fun facts/state
// return random fun fact
const getFunFact = async (req, res) => {
    const state = stateData.find(s => s.code === req.code);
    const mongoState = await State.findOne({ stateCode: req.code });

    if (!mongoState?.funfacts?.length) {
        return res.status(404).json({ message: `No Fun Facts found for ${state.state}` });
    }

    const randomFact = mongoState.funfacts[Math.floor(Math.random() * mongoState.funfacts.length)];
    res.json({ funfact: randomFact });
};

// get capital/state
// return capital city
const getCapital = async (req, res) => {
    const state = stateData.find(s => s.code === req.code);
    res.json({ state: state.state, capital: state.capital_city });
};

// get nickname/state
// return nickname
const getNickname = async (req, res) => {
    const state = stateData.find(s => s.code === req.code);
    res.json({ state: state.state, nickname: state.nickname });
};

// get population/state
// return population
const getPopulation = async (req, res) => {
    const state = stateData.find(s => s.code === req.code);
    res.json({ state: state.state, population: state.population.toLocaleString('en-US') });
};

// get admission/state
// return admission date
const getAdmission = async (req, res) => {
    const state = stateData.find(s => s.code === req.code);
    res.json({ state: state.state, admitted: state.admission_date });
};

// post fun facts/state
// add fun fact to MongoDB
const postFunFact = async (req, res) => {
    const { funfacts } = req.body;

    if (!funfacts) {
        return res.status(400).json({ message: `State fun facts value required` });
    }
    if (!Array.isArray(funfacts)) {
        return res.status(400).json({ message: `State fun facts value must be an array` });
    }

    let mongoState = await State.findOne({ stateCode: req.code });

    if (mongoState) {
        mongoState.funfacts = [...mongoState.funfacts, ...funfacts];
        const result = await mongoState.save();
        return res.json(result);
    }

    const result = await State.create({ stateCode: req.code, funfacts });
    res.status(201).json(result);
};

// patch fun facts/state
// update fun fact in MongoDB
const patchFunFact = async (req, res) => {
    const { index, funfact } = req.body;
    const state = stateData.find(s => s.code === req.code);

    if (!index) {
        return res.status(400).json({ message: "State fun fact index value required" });
    }
    if (!funfact) {
        return res.status(400).json({ message: "State fun fact value required" });
    }

    const mongoState = await State.findOne({ stateCode: req.code });

    if (!mongoState || !mongoState.funfacts.length) {
        return res.status(404).json({ message: `No Fun Facts found for ${state.state}` });
    }
    if (!mongoState.funfacts[index - 1]) {
        return res.status(404).json({ message: `No Fun Fact found at that index for ${state.state}` });
    }

    mongoState.funfacts[index - 1] = funfact;
    const result = await mongoState.save();
    res.json(result);
};

// delete fun facts/state
// delete fun fact from MongoDB
const deleteFunFact = async (req, res) => {
    const { index } = req.body;
    const state = stateData.find(s => s.code === req.code);

    if (!index) {
        return res.status(400).json({ message: 'State fun fact index value required' });
    }

    const mongoState = await State.findOne({ stateCode: req.code });

    if (!mongoState || !mongoState.funfacts.length) {
        return res.status(404).json({ message: `No Fun Facts found for ${state.state}` });
    }
    if (!mongoState.funfacts[index - 1]) {
        return res.status(404).json({ message: `No Fun Fact found at that index for ${state.state}` });
    }

    mongoState.funfacts = mongoState.funfacts.filter((_, i) => i !== index -1);
    const result = await mongoState.save();
    res.json(result);
};

module.exports = {
    getAllStates,
    getState,
    getFunFact,
    getCapital,
    getNickname,
    getPopulation,
    getAdmission,
    postFunFact,
    patchFunFact,
    deleteFunFact,
};
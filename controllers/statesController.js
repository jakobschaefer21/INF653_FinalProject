const stateData = require('../models/statesData.json');
const State = require('../models/States');

const getAllStates = async (req, res) => {
    const { contig } = req.query;
    let states = [...stateData];

    if (contig === 'true') {
        states = states.filter(s => s.code !== 'AK' && s.code !== 'HI');
    }
    else if (contig === 'false') {
        states = states.filter(s => s.code === 'AK' || s.code === 'HI');
    }

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

const getState = async (req, res) => {
    const state = stateData.find(s => s.code === req.code);
    const mongoState = await State.findOne({ stateCode: req.code });
    if (mongoState?.funfacts?.length) {
        return res.json({ ...state, funfacts: mongoState.funfacts });
    }
    res.json({ ...state, funfacts: [] });
};

const getFunFact = async (req, res) => {
    const state = stateData.find(s => s.code === req.code);
    const mongoState = await State.findOne({ stateCode: req.code });

    if (!mongoState?.funfacts?.length) {
        return res.status(404).json({ message: `No Fun Facts found for ${state.state}` });
    }

    const randomFact = mongoState.funfacts[Math.floor(Math.random() * mongoState.funfacts.length)];
    res.json({ funfact: randomFact });
};

const getCapital = async (req, res) => {
    const state = stateData.find(s => s.code === req.code);
    res.json({ state: state.state, capital: state.capital_city });
};

const getNickname = async (req, res) => {
    const state = stateData.find(s => s.code === req.code);
    res.json({ state: state.state, nickname: state.nickname });
};

const getPopulation = async (req, res) => {
    const state = stateData.find(s => s.code === req.code);
    res.json({ state: state.state, population: state.population.toLocaleString('en-US') });
};

const getAdmission = async (req, res) => {
    const state = stateData.find(s => s.code === req.code);
    res.json({ state: state.state, admitted: state.admission_date });
};

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
        return res.status(404).json({ message: "No Fun Facts found for ${state.state}`);"});
    }
    if (!mongoState.funfacts[index - 1]) {
        return res.status(400).json({ message: "No fun fact found at that index for ${state.state}`);" });
    }

    mongoState.funfacts[index - 1] = funfact;
    const result = await mongoState.save();
    res.json(result);
};

const deleteFunFact = async (req, res) => {
    const { index } = req.body;
    const state = stateData.find(s => s.code === req.code);

    if (!index) {
        return res.status(400).json({ message: "State fun fact index value required" });
    }

    const mongoState = await State.findOne({ stateCode: req.code });

    if (!mongoState || !mongoState.funfacts.length) {
        return res.status(404).json({ message: "No Fun Facts found for ${state.state}`);"})
    }
    if (!mongoState.funfacts[index - 1]) {
        return res.status(400).json({ message: "No fun fact found at that index for ${state.state}`);" });
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
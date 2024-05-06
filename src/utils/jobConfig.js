// src/utils/jobConfig.js
const Attributes = require('../models/Attributes');

const jobConfigurations = {
    Warrior: {
        healthPoints: 20,
        attributes: new Attributes(10, 5, 5),
        attackModifier: (attrs) => attrs.strength * 0.8 + attrs.dexterity * 0.2,
        speedModifier: (attrs) => attrs.dexterity * 0.6 + attrs.intelligence * 0.2
    },
    Thief: {
        healthPoints: 15,
        attributes: new Attributes(4, 10, 4),
        attackModifier: (attrs) => attrs.strength * 0.25 + attrs.dexterity * 1.0 + attrs.intelligence * 0.25,
        speedModifier: (attrs) => attrs.dexterity * 0.8
    },
    Mage: {
        healthPoints: 12,
        attributes: new Attributes(5, 6, 10),
        attackModifier: (attrs) => attrs.strength * 0.2 + attrs.dexterity * 0.2 + attrs.intelligence * 1.2,
        speedModifier: (attrs) => attrs.dexterity * 0.4 + attrs.strength * 0.1
    }
};

module.exports = jobConfigurations;

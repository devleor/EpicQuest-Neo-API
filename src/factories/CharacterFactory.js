// src/factories/CharacterFactory.js
const Warrior = require('../models/warrior');
const Mage = require('../models/mage');
const Thief = require('../models/thief');

class CharacterFactory {
    static createCharacter(characterData) {
        switch(characterData.job) {
            case 'Warrior':
                return new Warrior(characterData.id, characterData.name);
            case 'Mage':
                return new Mage(characterData.id, characterData.name);
            case 'Thief':
                return new Thief(characterData.id, characterData.name);
            default:
                throw new Error('Unknown character type');
        }
    }
}

module.exports = CharacterFactory;

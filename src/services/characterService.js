// src/services/characterService.js
const jobConfigurations = require('../utils/jobConfig');
const Character = require('../models/Character');
const CharacterFactory = require('../factories/CharacterFactory');

class CharacterService {
    constructor() {
        this.characters = [];
        this.nextId = 1;
    }

    createCharacter(name, job) {
        const jobConfig = jobConfigurations[job];
        if (!jobConfig) {
            throw new Error(`Invalid job type: ${job}`);
        }

        const id = this.nextId++;
 
        const newCharacter = new Character(id, name, job);
        this.characters.push(newCharacter);
        return newCharacter;
    }

    updateCharacterJob(id, newJob) {
        const character = this.characters.find(char => char.id === parseInt(id, 10));
        if (!character) {
            throw new Error("Character not found");
        }
        const config = jobConfigurations[newJob];
        character.job = newJob;
        character.healthPoints = config.healthPoints
        character.attributes = config.attributes;
        character.attackModifier = config.attackModifier(config.attributes);
        character.speedModifier = config.speedModifier(config.attributes);
        return character;
    }

    updateCharacterStatus(id, isAlive, health) {
        const character = this.characters.find(char => char.id === id);
        if (character) {
            character.alive = isAlive;
            character.currentHealth = health;
        } else {
            throw new Error('Character not found');
        }
    }

    getCharacterById(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const character = this.characters.find(char => char.id === id);
                if (character) {
                    resolve(CharacterFactory.createCharacter(character));
                } else {
                    reject(new Error('Character not found'));
                }
            }, 2000); // 2 seconds delay
        });
    };
    getAllCharacters() {
        return this.characters;
    }
}

module.exports = new CharacterService(); // Export as a singleton

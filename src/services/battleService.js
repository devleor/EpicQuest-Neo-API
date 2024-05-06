const Battle = require('../models/Battle');
const characterService = require('./CharacterService');

class BattleService {
    constructor() {
        this.battles = [];
    }

    async startNewBattle(character1Id, character2Id) {
        const character1 = await characterService.getCharacterById(character1Id);
        const character2 = await characterService.getCharacterById(character2Id);

        if (!character1 || !character2) {
            throw new Error('One or both characters not found');
        }
        if (!character1.alive || !character2.alive) {
            throw new Error('One or both characters are deceased and cannot battle');
        }
        const newBattle = new Battle(character1, character2);
        newBattle.simulate();
        this.battles.push(newBattle);
        await characterService.updateCharacterStatus(character1.id, character1.alive, character1.healthPoints);
        await characterService.updateCharacterStatus(character2.id, character2.alive, character2.healthPoints);
        return newBattle.log;
    }
}

module.exports = new BattleService(); // Export as a singleton

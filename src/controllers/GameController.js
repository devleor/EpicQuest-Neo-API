const BattleService = require('../services/battleService');

class GameController {
    async startBattle(character1Id, character2Id) {
        const battleLog = await BattleService.startNewBattle(character1Id, character2Id);
        return battleLog;
    }
}

module.exports = GameController;

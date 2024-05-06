const BattleService = require('../../services/BattleService');
const CharacterService = require('../../services/characterService');

jest.mock('../../services/characterService');

describe('BattleService', () => {
    let battleService, character1, character2;

    beforeEach(() => {
        battleService = BattleService; // Use the exported instance

        character1 = { 
            id: 1, 
            name: 'Character 1', 
            job: 'Warrior', 
            healthPoints: 100, 
            alive: true
        };
        character2 = { 
            id: 2, 
            name: 'Character 2', 
            job: 'Mage', 
            healthPoints: 100, 
            alive: true
        };

        CharacterService.getCharacterById.mockImplementation((id) => {
            if (id === character1.id) return Promise.resolve(character1);
            if (id === character2.id) return Promise.resolve(character2);
            return Promise.resolve(null);
        });

        CharacterService.updateCharacterStatus.mockImplementation(() => Promise.resolve());
    });

    test('startNewBattle', async () => {
        const result = await battleService.startNewBattle(character1.id, character2.id);
        expect(result).toBeDefined();
        expect(CharacterService.getCharacterById).toHaveBeenCalledWith(character1.id);
        expect(CharacterService.getCharacterById).toHaveBeenCalledWith(character2.id);
        expect(CharacterService.updateCharacterStatus).toHaveBeenCalledWith(character1.id, character1.alive, character1.healthPoints);
        expect(CharacterService.updateCharacterStatus).toHaveBeenCalledWith(character2.id, character2.alive, character2.healthPoints);
    });

    // Add more tests as needed
});
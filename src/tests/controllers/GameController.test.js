const GameController = require('../../controllers/GameController');
const BattleService = require('../../services/BattleService');
const CharacterService = require('../../services/characterService');

jest.mock('../../services/BattleService');
jest.mock('../../services/characterService');

describe('GameController', () => {
    let gameController;

    beforeEach(() => {
        gameController = new GameController();
    });

    describe('handleStartBattle', () => {
        it('should handle a battle start request', async () => {
            const req = {
                body: { character1Id: 1, character2Id: 2 }
            };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis() // Chainable
            };

            CharacterService.getCharacterById
                .mockResolvedValueOnce({ id: 1, name: 'Hero' })
                .mockResolvedValueOnce({ id: 2, name: 'Villain' });

            BattleService.startBattle
                .mockResolvedValue({ winner: 'Hero' });

            await gameController.handleStartBattle(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                winner: 'Hero'
            }));
        });

        it('should return an error if the battle cannot be started', async () => {
            const req = {
                body: { character1Id: 1, character2Id: 2 }
            };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis() // Chainable
            };
            const error = new Error("Battle cannot be initiated");

            BattleService.startBattle.mockRejectedValue(error);

            await gameController.handleStartBattle(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: error.message });
        });
    });

});

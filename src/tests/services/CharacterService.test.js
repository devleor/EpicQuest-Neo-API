const CharacterService = require('../../services/characterService'); // Path to the CharacterService
const Character = require('../../models/Character'); // Path to the Character model
const { jobConfigurations } = require('../../utils/jobConfig'); // Assuming the job configurations are stored here

jest.mock('../../models/Character', () => {
    return jest.fn().mockImplementation((id, name, job) => ({ id, name, job }));
});


describe('CharacterService', () => {
    let service;

    beforeEach(() => {
        // Reset the character list and ID counter before each test
        service = CharacterService; // Use the exported instance
        service.characters = [];
        service.nextId = 1;
        Character.mockClear();  // Clear the mock's information before each test
    });

    describe('createCharacter', () => {
        it('should create a character with valid job', () => {
            const name = "Test Name";
            const job = "Warrior";  // Assuming "Warrior" is a valid job
            const character = service.createCharacter(name, job);

            expect(character.name).toBe(name);
            expect(character.job).toBe(job);
            expect(service.characters).toContain(character);
        });

        it('should throw an error with invalid job', () => {
            const name = "Test Name";
            const job = "InvalidJob";

            expect(() => service.createCharacter(name, job)).toThrow(`Invalid job type: ${job}`);
        });
    });

    describe('updateCharacterJob', () => {
        it('should update the job of an existing character', () => {
            const name = "Test Name";
            const job = "Warrior";
            const newJob = "Mage";

            // Create a character to update
            const character = service.createCharacter(name, job);
            const updatedCharacter = service.updateCharacterJob(character.id, newJob);

            expect(updatedCharacter.job).toBe(newJob);
        });

        it('should throw an error when character does not exist', () => {
            expect(() => service.updateCharacterJob(999, "Mage")).toThrow('Character not found');
        });
    });

    describe('getCharacterById', () => {
        it('should resolve with the character if found', async () => {
            const character = service.createCharacter("Test Name", "Warrior");
            await expect(service.getCharacterById(character.id)).resolves.toEqual(character);
        });

        it('should reject if the character is not found', async () => {
            await expect(service.getCharacterById(999)).rejects.toThrow('Character not found');
        });
    });
});

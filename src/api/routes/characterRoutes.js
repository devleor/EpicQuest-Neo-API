const express = require('express');
const router = express.Router();
const characterService = require('../../services/characterService');
const ApiError = require('../../utils/apiError');
const HttpStatusCode = require('../../utils/httpStatusCode');
const { characterValidationRules, validateCharacter } = require('../../utils/validation');

/**
 * @openapi
 * /characters:
 *   post:
 *     summary: Create a new character.
 *     tags:
 *       - Characters
 *     description: Adds a new character to the database with the specified name and job.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - job
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the character.
 *               job:
 *                 type: string
 *                 description: The job or class of the character (e.g., warrior, mage).
 *     responses:
 *       201:
 *         description: A new character is successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       400:
 *         description: Missing name or job in request body.
 */
router.post('/', characterValidationRules,
    validateCharacter, (req, res, next) => {
        try {
            const { name, job } = req.body;
            if (!name || !job) {
                throw new ApiError(HttpStatusCode.BAD_REQUEST, "Name and job are required fields.");
            }
            const character = characterService.createCharacter(name, job);
            res.status(HttpStatusCode.CREATED).json(character);
        } catch (error) {
            next(error);
        }
    });

/**
 * @openapi
 * /characters:
 *   get:
 *     summary: Retrieves all characters.
 *     tags:
 *       - Characters
 *     description: Returns a list of all characters in the database.
 *     responses:
 *       200:
 *         description: A list of characters.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Character'
 */
router.get('/', (req, res) => {
    try {
        const characters = characterService.getAllCharacters();
        res.json(characters);
    } catch (error) {
        next(new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, error.message));
    }
});

/**
 * @openapi
 * /characters/{id}:
 *   get:
 *     summary: Retrieves a character by ID.
 *     tags:
 *       - Characters
 *     description: Returns a single character by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the character to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detailed information about a character.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       404:
 *         description: No character found with the provided ID.
 */
router.get('/:id', async (req, res, next) => {
    try {
        const character = await characterService.getCharacterById(parseInt(req.params.id, 10));
        if (!character) {
            throw new ApiError(HttpStatusCode.NOT_FOUND, 'Character not found');
        }
        res.json(character);
    } catch (error) {
        next(error);
    }
});

/**
 * @openapi
 * /characters/{id}/job:
 *   put:
 *     summary: Update a character's job.
 *     description: Updates the job of the specified character by ID.
 *     tags:
 *       - Characters
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the character to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               job:
 *                 type: string
 *                 description: The new job of the character (e.g., Warrior, Thief, Mage).
 *                 enum:
 *                   - Warrior
 *                   - Thief
 *                   - Mage
 *     responses:
 *       200:
 *         description: The character's job was updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 job:
 *                   type: string
 *       400:
 *         description: Invalid input, object invalid.
 *       404:
 *         description: A character with the specified ID was not found.
 *       500:
 *         description: Unexpected error.
 */
router.put('/:id/job',
    (req, res) => {
        try {
            const { job } = req.body;
            const { id } = req.params;
            const updatedCharacter = characterService.updateCharacterJob(id, job);
            res.status(200).json(updatedCharacter);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
);


module.exports = router;

// Add the Character schema definition at an appropriate place in your Swagger documentation setup:
/**
 * @openapi
 * components:
 *   schemas:
 *     Character:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the character.
 *         name:
 *           type: string
 *           description: The name of the character.
 *         job:
 *           type: string
 *           description: The job or class of the character (e.g., warrior, mage).
 */

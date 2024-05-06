const express = require('express');
const GameController = require('../../controllers/GameController');
const router = express.Router();

const gameController = new GameController();

/**
 * @openapi
 * /game:
 *   post:
 *     summary: Start a battle between two characters.
 *     description: Initiates a battle between two characters and returns the battle log.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - character1Id
 *               - character2Id
 *             properties:
 *               character1Id:
 *                 type: integer
 *                 description: The ID of the first character.
 *               character2Id:
 *                 type: integer
 *                 description: The ID of the second character.
 *     responses:
 *       200:
 *         description: Battle successfully started.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 battleLog:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: Log entries describing each action in the battle.
 *       500:
 *         description: Error occurred during the battle.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   description: Error message describing what went wrong.
 */
router.post('/', async (req, res) => {
    try {
        const { character1Id, character2Id } = req.body;
        const battleLog = await gameController.startBattle(character1Id, character2Id);
        res.status(200).json({ success: true, battleLog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;

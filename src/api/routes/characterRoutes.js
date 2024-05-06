const express = require('express');
const router = express.Router();
const characterService = require('../../services/characterService');
const ApiError = require('../../utils/apiError');
const HttpStatusCode = require('../../utils/httpStatusCode');

router.post('/', (req, res, next) => {
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

router.get('/', (req, res) => {
    try {
        const characters = characterService.getAllCharacters();
        res.json(characters);
    } catch (error) {
        next(new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, error.message));
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const character = await characterService.getCharacterById(parseInt(req.params.id));
        if (!character) {
            throw new ApiError(HttpStatusCode.NOT_FOUND, 'Character not found');
        }
        res.json(character);
    } catch (error) {
        next(error);
    }
});

module.exports = router;

const { body, validationResult } = require('express-validator');

const characterValidationRules = [
    body('name')
        .isLength({ min: 4, max: 15 })
        .withMessage('Name must be between 4 and 15 characters long')
        .matches(/^[A-Za-z_]+$/)
        .withMessage('Name must contain only letters and underscores'),
    body('job')
        .isIn(['Warrior', 'Thief', 'Mage'])
        .withMessage('Job must be one of: Warrior, Thief, Mage')
];

const validateCharacter = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    characterValidationRules,
    validateCharacter
};

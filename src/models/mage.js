const Character = require('./character');
const jobConfigurations = require('../utils/jobConfig');

class Mage extends Character {
    constructor(id, name) {
        super(id, name, 'Mage');
        // Additional Mage-specific initialization, if necessary
    }

    castFireball() {
        const baseDamage = 3;
        const damage = baseDamage + this.getAttackModifier();
        return damage;
    }

    performSpecialMove() {
        return this.castFireball();
    }
}

module.exports = Mage;

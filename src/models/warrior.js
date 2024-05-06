const Character = require('./character');
const jobConfigurations = require('../utils/jobConfig');

class Warrior extends Character {
    constructor(id, name) {
        super(id, name, 'Warrior');
    }

    swingSword() {
        const baseDamage = 2;
        const damage = baseDamage + this.getAttackModifier();
        return damage;
    }

    performSpecialMove() {
        return this.swingSword();
    }
}

module.exports = Warrior;

const Character = require('./Character');

class Thief extends Character {
    constructor(id, name) {
        super(id, name, 'Thief');
    }

    swingKnife() {
        const baseDamage = 1;
        const damage = baseDamage + this.getAttackModifier();
        return damage;
    }

    performSpecialMove() {
        return this.swingKnife();
    }
}

module.exports = Thief;

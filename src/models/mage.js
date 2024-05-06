const Character = require('./Character');

class Mage extends Character {
    constructor(id, name) {
        super(id, name, 'Mage');
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

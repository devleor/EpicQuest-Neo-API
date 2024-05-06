
class Battle {
    constructor(character1, character2) {
        this.character1 = character1;
        this.character2 = character2;
        this.log = [
            `Battle between ${this.character1.name} (${this.character1.job}) - ${this.character1.healthPoints} HP and ${this.character2.name} (${this.character2.job}) - ${this.character2.healthPoints} HP begins!`
        ];
    }

    decideFirstAttacker() {
        let speed1 = this.character1.getSpeedModifier();
        let speed2 = this.character2.getSpeedModifier();

        if (speed1 > speed2) {
            this.log.push(`${this.character1.name} (${speed1} speed) was faster than ${this.character2.name} (${speed2} speed) and will begin this round.`);
            return this.character1;
        } else if (speed2 > speed1) {
            this.log.push(`${this.character2.name} (${speed2} speed) was faster than ${this.character1.name} (${speed1} speed) and will begin this round.`);
            return this.character2;
        } else {
            return Math.random() < 0.5 ? this.character1 : this.character2;  // Simplified tie-breaking
        }
    }

    attack(attacker, defender) {
        const attackValue = attacker.performSpecialMove();
        const newHP = Math.max(defender.healthPoints - attackValue, 0);
        defender.healthPoints = newHP;
        this.log.push(`${attacker.name} attacks ${defender.name} for ${attackValue} damage, ${defender.name} has ${newHP} HP remaining.`);

        if (newHP === 0) {
            this.log.push(`${attacker.name} wins the battle! ${attacker.name} still has ${attacker.healthPoints} HP remaining!`);
            defender.alive = false;
            return false; // Battle ends
        }
        return true; // Battle continues
    }

    simulate() {
        while (true) {
            let attacker = this.decideFirstAttacker();
            let defender = (attacker === this.character1) ? this.character2 : this.character1;

            if (!this.attack(attacker, defender)) break;
            [attacker, defender] = [defender, attacker]; // Switch roles
        }
        return this.log;
    }
}

module.exports = Battle;

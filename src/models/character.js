// src/models/character.js
const jobConfigurations = require('../utils/jobConfig');

class Character {
    constructor(id, name, job) {
        this.id = id;
        this.name = name;
        this.setJob(job);
        this.alive = true;
    }

    setJob(job) {
        const config = jobConfigurations[job];
        this.job = job;
        this.healthPoints = config.healthPoints;
        this.attributes = config.attributes;
    }

    getAttackModifier() {
        const config = jobConfigurations[this.job];
        return config.attackModifier(this.attributes);
    }

    getSpeedModifier() {
        const config = jobConfigurations[this.job];
        return config.speedModifier(this.attributes);
    }

    performSpecialMove() {
        return this.getAttackModifier();
    }

    changeJob(newJob) {
        this.setJob(newJob);
    }
}

module.exports = Character;

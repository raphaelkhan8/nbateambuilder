const { constants } = require("../helpers/constants");
const { team } = require("../objects/team");

const addPlayer = (player) => {
    const { maxMinutes } = constants;
    const { players, totalMinutesPlayed } = team;
    if (totalMinutesPlayed + player.minutes_played <= maxMinutes) {
        players.push(player);
        team.totalMinutesPlayed += player.minutes_played;
    }
    return team;
};

const checkPositionCount = (position) => {
    const { maxPositionCount } = constants;
    const { players } = team;
    let currentNumberOfPosition = players.reduce((acc, player) => {
        if (player.position === position) {
            acc++;
        }
        return acc;
    }, 0);
    return currentNumberOfPosition < maxPositionCount;
};

module.exports.addPlayer = addPlayer;
module.exports.checkPositionCount = checkPositionCount;

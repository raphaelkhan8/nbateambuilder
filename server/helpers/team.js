const { constants } = require("../helpers/constants");
const { team } = require("../objects/team");

const addPlayer = (player) => {
    const { maxMinutes } = constants;
    if (team.totalMinutesPlayed + player.minutes_played <= maxMinutes) {
        team.players.push(player);
        team.totalMinutesPlayed += player.minutes_played;
        team.totalWins += player.win_shares;
    }
    return team;
};

const checkPositionCount = (position) => {
    const { maxPositionCount } = constants;
    let currentNumberOfPosition = team.players.reduce((acc, player) => {
        if (player.position === position) {
            acc++;
        }
        return acc;
    }, 0);
    return currentNumberOfPosition < maxPositionCount;
};

module.exports.addPlayer = addPlayer;
module.exports.checkPositionCount = checkPositionCount;

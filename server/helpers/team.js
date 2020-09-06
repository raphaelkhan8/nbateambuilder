const { constants } = require("../helpers/constants");
const { team } = require("../objects/team");

const addPlayer = (player) => {
    const { maxMinutes } = constants;
    let numOfPlayers = team.players.length;
    if (team.totalMinutesPlayed + player.minutes_played <= maxMinutes) {
        team.players.push(player);
        team.totalMinutesPlayed += player.minutes_played;
        team.minutesAvailable = maxMinutes - team.totalMinutesPlayed;
        team.totalWins += player.win_shares;
        team.averageAge =
            (team.averageAge * numOfPlayers + player.age) / (numOfPlayers + 1);
    }
    return team;
};

const releasePlayer = (releasedPlayer) => {
    team.players = team.players.filter(
        (player) => player.name !== releasedPlayer.name
    );
    team.totalMinutesPlayed -= releasedPlayer.minutes_played;
    team.minutesAvailable += releasedPlayer.minutes_played;
    team.totalWins -= releasedPlayer.win_shares;
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
module.exports.releasePlayer = releasePlayer;
module.exports.checkPositionCount = checkPositionCount;

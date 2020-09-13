const { constants } = require("../helpers/constants");

const team = {
    players: [],
    totalMinutesPlayed: 0,
    totalWins: 0,
    averageAge: 0,
};

const addPlayer = (player, year) => {
    const { maxMinutes } = constants;
    let numOfPlayers = team.players.length;
    if (team.totalMinutesPlayed + player.minutes_played <= maxMinutes) {
        let season = `${year - 1}-${year} `;
        player = { ...player, season };
        team.players.push(player);
        team.totalMinutesPlayed += player.minutes_played;
        team.minutesAvailable =
            year !== 2020
                ? maxMinutes - team.totalMinutesPlayed
                : 15600 - team.totalMinutesPlayed;
        team.totalWins += player.win_shares;
        team.averageAge =
            (team.averageAge * numOfPlayers + player.age) / (numOfPlayers + 1);
    }
    return team;
};

const releasePlayer = (releasedPlayer) => {
    let numOfPlayers = team.players.length;
    team.players = team.players.filter(
        (player) => player.name !== releasedPlayer.name
    );
    team.totalMinutesPlayed -= releasedPlayer.minutes_played;
    team.minutesAvailable += releasedPlayer.minutes_played;
    team.totalWins -= releasedPlayer.win_shares;
    team.averageAge =
        numOfPlayers - 1
            ? (team.averageAge * numOfPlayers - releasedPlayer.age) /
              (numOfPlayers - 1)
            : 0;
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
module.exports.team = team;

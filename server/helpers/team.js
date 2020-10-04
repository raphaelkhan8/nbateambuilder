const { constants } = require("../helpers/constants");

const team = {
    players: [],
    totalMinutesPlayed: 0,
    offEfficiency: 0,
    defEfficiency: 0,
    totalWins: 0,
    averageAge: 0,
};

const adjustEfficiency = (stat, action, player, length) => {
    if (length > 0) {
        return action === "add"
            ? (team[`${stat}Efficiency`] * team.totalWins +
                  player[`${stat}_win_shares`]) /
                  (team.totalWins + player.win_shares)
            : (team[`${stat}Efficiency`] * team.totalWins -
                  player[`${stat}_win_shares`]) /
                  (team.totalWins - player.win_shares);
    } else {
        return (
            team.players[0][`${stat}_win_shares`] /
            (team.totalWins + player.win_shares)
        );
    }
};

const addPlayer = (player, year) => {
    const { maxMinutes } = constants;
    const numOfPlayers = team.players.length;
    const newTotalMinutesPlayed =
        team.totalMinutesPlayed + player.minutes_played;
    const season = `${year - 1}-${year} `;
    player = { ...player, season };
    team.players.push(player);
    team.totalShootingPercentage =
        numOfPlayers > 1
            ? (
                  (team.totalShootingPercentage * team.totalMinutesPlayed +
                      player.true_shooting_percentage * player.minutes_played) /
                  newTotalMinutesPlayed
              ).toFixed(3)
            : player.true_shooting_percentage;
    team.offEfficiency = adjustEfficiency("off", "add", player, numOfPlayers);
    team.defEfficiency = adjustEfficiency("def", "add", player, numOfPlayers);
    team.totalMinutesPlayed = newTotalMinutesPlayed;
    team.minutesAvailable =
        year !== 2020
            ? maxMinutes - team.totalMinutesPlayed
            : 17280 - team.totalMinutesPlayed;
    team.totalWins += player.win_shares;
    team.averageAge =
        (team.averageAge * numOfPlayers + player.age) / (numOfPlayers + 1);
    return team;
};

const releasePlayer = (releasedPlayer) => {
    const newTotalMinutesPlayed =
        team.totalMinutesPlayed - releasedPlayer.minutes_played;
    team.players = team.players.filter(
        (player) => player.name !== releasedPlayer.name
    );
    const numOfPlayers = team.players.length;
    team.totalShootingPercentage =
        numOfPlayers > 1
            ? (
                  (team.totalShootingPercentage * team.totalMinutesPlayed -
                      releasedPlayer.true_shooting_percentage *
                          releasedPlayer.minutes_played) /
                  newTotalMinutesPlayed
              ).toFixed(3)
            : numOfPlayers > 0
            ? team.players[0].true_shooting_percentage
            : 0;
    team.totalMinutesPlayed = newTotalMinutesPlayed;
    team.minutesAvailable += releasedPlayer.minutes_played;
    team.offEfficiency =
        numOfPlayers > 0
            ? adjustEfficiency("off", "subtract", releasedPlayer, numOfPlayers)
            : 0;
    team.defEfficiency =
        numOfPlayers > 0
            ? adjustEfficiency("def", "subtract", releasedPlayer, numOfPlayers)
            : 0;
    team.totalWins -= releasedPlayer.win_shares;
    team.averageAge = numOfPlayers
        ? (team.averageAge * (numOfPlayers + 1) - releasedPlayer.age) /
          numOfPlayers
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

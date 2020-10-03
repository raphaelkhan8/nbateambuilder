const { constants } = require("../helpers/constants");

const team = {
    players: [],
    totalMinutesPlayed: 0,
    totalWins: 0,
    averageAge: 0,
};

const addPlayer = (player, year) => {
    const { maxMinutes } = constants;
    const numOfPlayers = team.players.length;
    const newTotalMinutesPlayed =
        team.totalMinutesPlayed + player.minutes_played;
    const newWins = team.totalWins + player.win_shares;
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
    team.offEfficiency =
        numOfPlayers > 0
            ? (team.offEfficiency * team.totalWins +
                  player.offensive_win_shares) /
              newWins
            : player.offensive_win_shares / player.win_shares;
    team.defEfficiency =
        numOfPlayers > 0
            ? (team.defEfficiency * team.totalWins +
                  player.defensive_win_shares) /
              newWins
            : player.defensive_win_shares / player.win_shares;
    team.totalMinutesPlayed = newTotalMinutesPlayed;
    team.minutesAvailable =
        year !== 2020
            ? maxMinutes - team.totalMinutesPlayed
            : 17280 - team.totalMinutesPlayed;
    team.totalWins = newWins;
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
    const newWins = team.totalWins - releasedPlayer.win_shares;
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
        numOfPlayers > 1
            ? (team.offEfficiency * team.totalWins -
                  releasedPlayer.offensive_win_shares) /
              newWins
            : numOfPlayers > 0
            ? team.players[0].offensive_win_shares / newWins
            : 0;
    team.defEfficiency =
        numOfPlayers > 1
            ? (team.defEfficiency * team.totalWins -
                  releasedPlayer.defensive_win_shares) /
              newWins
            : numOfPlayers > 0
            ? team.players[0].defensive_win_shares / newWins
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

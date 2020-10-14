const team = {
    players: [],
    totalMinutesPlayed: 0,
    pointsPG: 0,
    assistsPG: 0,
    stealsPG: 0,
    turnoversPG: 0,
    offensiveReboundsPG: 0,
    defensiveReboundsPG: 0,
    twoPtMade: 0,
    twoPtAttempt: 0,
    threePtMade: 0,
    threePtAttempt: 0,
    offEfficiency: 0,
    defEfficiency: 0,
    totalWins: 0,
    averageAge: 0,
};

const addPlayerToTeam = (player) => {
    let { year } = player;
    year = Number(year);
    const numOfPlayers = team.players.length;
    const newTotalMinutesPlayed =
        team.totalMinutesPlayed + player.minutesPlayed;
    const season = `${year - 1}-${year} `;
    player = { ...player, season };
    team.players.push(player);
    team.pointsPG = addPGstats('points', player);
    team.assistsPG = addPGstats('assists', player);
    team.stealsPG = addPGstats('steals', player);
    team.turnoversPG = addPGstats('turnovers', player);
    team.offensiveReboundsPG = addPGstats('offensiveRebounds', player);
    team.defensiveReboundsPG = addPGstats('defensiveRebounds', player);
    team.twoPtMade += player.twoPtMade;
    team.twoPtAttempt += player.twoPtAttempt;
    team.threePtMade += player.threePtMade;
    team.threePtAttempt += player.threePtAttempt;
    team.totalShootingPercentage =
        numOfPlayers > 1
            ? (
                  (team.totalShootingPercentage * team.totalMinutesPlayed +
                      player.trueShootingPercentage * player.minutesPlayed) /
                  newTotalMinutesPlayed
              )
            : player.trueShootingPercentage;
    team.offEfficiency = adjustEfficiency("off", "add", player);
    team.defEfficiency = adjustEfficiency("def", "add", player);
    team.totalMinutesPlayed = newTotalMinutesPlayed;
    team.minutesAvailable =
        year !== 2020
            ? 19680 - team.totalMinutesPlayed
            : 17280 - team.totalMinutesPlayed;
    team.totalWins += player.winShares;
    team.averageAge =
        (team.averageAge * numOfPlayers + player.age) / (numOfPlayers + 1);
    return team;
};

const releasePlayerFromTeam = (releasedPlayer) => {
    const newTotalMinutesPlayed =
        team.totalMinutesPlayed - releasedPlayer.minutesPlayed;
    team.players = team.players.filter(
        (player) => player.name !== releasedPlayer.name
    );
    const numOfPlayers = team.players.length;
    team.pointsPG = reducePGstats('points', releasedPlayer);
    team.assistsPG = reducePGstats('assists', releasedPlayer);
    team.stealsPG = reducePGstats('steals', releasedPlayer);
    team.turnoversPG = reducePGstats('turnovers', releasedPlayer);
    team.offensiveReboundsPG = reducePGstats('offensiveRebounds', releasedPlayer);
    team.defensiveReboundsPG = reducePGstats('defensiveRebounds', releasedPlayer);
    team.twoPtMade -= releasedPlayer.twoPtMade;
    team.twoPtAttempt -= releasedPlayer.twoPtAttempt;
    team.threePtMade -= releasedPlayer.threePtMade;
    team.threePtAttempt -= releasedPlayer.threePtAttempt;
    team.totalShootingPercentage =
        numOfPlayers > 1
            ? (
                  (team.totalShootingPercentage * team.totalMinutesPlayed -
                      releasedPlayer.trueShootingPercentage *
                          releasedPlayer.minutesPlayed) /
                  newTotalMinutesPlayed
              )
            : numOfPlayers > 0
            ? team.players[0].trueShootingPercentage
            : 0;
    team.totalMinutesPlayed = newTotalMinutesPlayed;
    team.minutesAvailable += releasedPlayer.minutesPlayed;
    team.offEfficiency =
        numOfPlayers > 0
            ? adjustEfficiency("off", "subtract", releasedPlayer)
            : 0;
    team.defEfficiency =
        numOfPlayers > 0
            ? adjustEfficiency("def", "subtract", releasedPlayer)
            : 0;
    team.totalWins -= releasedPlayer.winShares;
    team.averageAge = numOfPlayers
        ? (team.averageAge * (numOfPlayers + 1) - releasedPlayer.age) /
          numOfPlayers
        : 0;
    return team;
};

const addPGstats = (stat, player) => {
    const totalGames = (player.year === '2020') ? 72 : 82;
    return team[`${stat}PG`] += (player[stat] / totalGames);
}

const reducePGstats = (stat, player) => {
    const totalGames = (player.year === '2020') ? 72 : 82;
    return (team.players.length) ? team[`${stat}PG`] -= (player[stat] / totalGames) : 0;
}

const adjustEfficiency = (stat, action, player) => {
    const numOfPlayers = team.players.length;
    if (numOfPlayers > 0) {
        return action === "add"
            ? ((parseFloat((team[`${stat}Efficiency`] * team.totalWins).toFixed(12)) +
                  player[`${stat}WinShares`]) /
                  parseFloat((team.totalWins + player.winShares)).toFixed(12))
            : ((parseFloat((team[`${stat}Efficiency`] * team.totalWins).toFixed(12)) -
                  player[`${stat}WinShares`]) /
                  parseFloat((team.totalWins - player.winShares)).toFixed(12));
    } else {
        return (
            parseFloat((team.players[0][`${stat}WinShares`] /
            (team.totalWins + player.winShares)).toFixed(12))
        );
    }
};

export { addPlayerToTeam, releasePlayerFromTeam }
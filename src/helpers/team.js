const addPlayerToTeam = (player, teamInfo) => {
    let { year } = player;
    year = Number(year);
    const numOfPlayers = teamInfo.team.length;
    const newTotalMinutesPlayed =
        teamInfo.totalMinutesPlayed + player.minutesPlayed;
    const season = `${year - 1}-${year} `;
    player = { ...player, season };
    teamInfo.team.push(player);
    teamInfo.pointsPG = addPGstats('points', player, teamInfo);
    teamInfo.assistsPG = addPGstats('assists', player, teamInfo);
    teamInfo.stealsPG = addPGstats('steals', player, teamInfo);
    teamInfo.turnoversPG = addPGstats('turnovers', player, teamInfo);
    teamInfo.offRPG = addPGstats('offR', player, teamInfo);
    teamInfo.defRPG = addPGstats('defR', player, teamInfo);
    teamInfo.twoPtMade += player.twoPtMade;
    teamInfo.twoPtAttempt += player.twoPtAttempt;
    teamInfo.threePtMade += player.threePtMade;
    teamInfo.threePtAttempt += player.threePtAttempt;
    teamInfo.totalShootingPercentage =
        numOfPlayers > 1
            ? (
                  (teamInfo.totalShootingPercentage * teamInfo.totalMinutesPlayed +
                      player.trueShootingPercentage * player.minutesPlayed) /
                  newTotalMinutesPlayed
              )
            : player.trueShootingPercentage;
    teamInfo.offEfficiency = adjustEfficiency("off", "add", player, teamInfo);
    teamInfo.defEfficiency = adjustEfficiency("def", "add", player, teamInfo);
    teamInfo.totalMinutesPlayed = newTotalMinutesPlayed;
    teamInfo.teamMinutesLeft =
        year !== 2020
            ? 19680 - teamInfo.totalMinutesPlayed
            : 17280 - teamInfo.totalMinutesPlayed;
    teamInfo.teamWins += player.winShares;
    teamInfo.averageAge =
        (teamInfo.averageAge * numOfPlayers + player.age) / (numOfPlayers + 1);
    return teamInfo;
};

const releasePlayerFromTeam = (releasedPlayer, teamInfo) => {
    const newTotalMinutesPlayed =
        teamInfo.totalMinutesPlayed - releasedPlayer.minutesPlayed;
    teamInfo.team = teamInfo.team.filter(
        (player) => player.name !== releasedPlayer.name
    );
    const numOfPlayers = teamInfo.team.length;
    teamInfo.pointsPG = reducePGstats('points', releasedPlayer, teamInfo);
    teamInfo.assistsPG = reducePGstats('assists', releasedPlayer, teamInfo);
    teamInfo.stealsPG = reducePGstats('steals', releasedPlayer, teamInfo);
    teamInfo.turnoversPG = reducePGstats('turnovers', releasedPlayer, teamInfo);
    teamInfo.offRPG = reducePGstats('offR', releasedPlayer, teamInfo);
    teamInfo.defRPG = reducePGstats('defR', releasedPlayer, teamInfo);
    teamInfo.twoPtMade -= releasedPlayer.twoPtMade;
    teamInfo.twoPtAttempt -= releasedPlayer.twoPtAttempt;
    teamInfo.threePtMade -= releasedPlayer.threePtMade;
    teamInfo.threePtAttempt -= releasedPlayer.threePtAttempt;
    teamInfo.totalShootingPercentage =
        numOfPlayers > 1
            ? (
                  (teamInfo.totalShootingPercentage * teamInfo.totalMinutesPlayed -
                      releasedPlayer.trueShootingPercentage *
                          releasedPlayer.minutesPlayed) /
                  newTotalMinutesPlayed
              )
            : numOfPlayers > 0
            ? teamInfo.team[0].trueShootingPercentage
            : 0;
    teamInfo.totalMinutesPlayed = newTotalMinutesPlayed;
    teamInfo.teamMinutesLeft += releasedPlayer.minutesPlayed;
    teamInfo.offEfficiency =
        numOfPlayers > 0
            ? adjustEfficiency("off", "subtract", releasedPlayer, teamInfo)
            : 0;
    teamInfo.defEfficiency =
        numOfPlayers > 0
            ? adjustEfficiency("def", "subtract", releasedPlayer, teamInfo)
            : 0;
    teamInfo.teamWins -= releasedPlayer.winShares;
    teamInfo.averageAge = numOfPlayers
        ? (teamInfo.averageAge * (numOfPlayers + 1) - releasedPlayer.age) /
          numOfPlayers
        : 0;
    return teamInfo;
};

const addPGstats = (stat, player, teamInfo) => {
    const totalGames = (player.year === '2020') ? 72 : 82;
    return teamInfo[`${stat}PG`] += (player[stat] / totalGames);
}

const reducePGstats = (stat, player, teamInfo) => {
    const totalGames = (player.year === '2020') ? 72 : 82;
    return (teamInfo.team.length) ? teamInfo[`${stat}PG`] -= (player[stat] / totalGames) : 0;
}

const adjustEfficiency = (stat, action, player, teamInfo) => {
    const numOfPlayers = teamInfo.team.length;
    if (numOfPlayers > 0) {
        return action === "add"
            ? parseFloat((teamInfo[`${stat}Efficiency`] * teamInfo.teamWins +
                  player[`${stat}WinShares`]) /
                  (teamInfo.teamWins + player.winShares)).toFixed(12)
            : parseFloat((teamInfo[`${stat}Efficiency`] * teamInfo.teamWins -
                  player[`${stat}WinShares`]) /
                  (teamInfo.teamWins - player.winShares)).toFixed(12);
    } else {
        return (
            parseFloat(teamInfo.team[0][`${stat}WinShares`] /
            (teamInfo.teamWins + player.winShares)).toFixed(12)
        );
    }
};

export { addPlayerToTeam, releasePlayerFromTeam }
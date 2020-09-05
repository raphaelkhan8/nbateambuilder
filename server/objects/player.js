const playerData = require("../data/2019-2020_advanced_player_season_totals.json");
const _ = require("lodash");

const generatePlayerObj = (
    name,
    team,
    position,
    age,
    minutes_played,
    win_shares,
    win_shares_per_48_minutes,
    value
) => {
    const player = {};
    player.name = name;
    player.team = team;
    player.position = position;
    player.age = age;
    player.minutes_played = minutes_played;
    player.win_shares = win_shares;
    player.win_shares_per_48_minutes = win_shares_per_48_minutes;
    player.value = value;
    return player;
};

const playersArr = playerData.map((player) =>
    generatePlayerObj(
        player.name,
        player.team,
        player.positions[0].replace(/\s+/g, "_"),
        player.age,
        player.minutes_played,
        player.win_shares,
        player.win_shares_per_48_minutes,
        player.value
    )
);

const playersByPosition = _.groupBy(playersArr, "position");

module.exports.playersByPosition = playersByPosition;

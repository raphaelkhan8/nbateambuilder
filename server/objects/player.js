const playerData = require("../data/2019-2020_advanced_player_season_totals.json");
const _ = require("lodash");

class Player {
    constructor(
        name,
        team,
        position,
        age,
        minutes_played,
        win_shares,
        win_shares_per_48_minutes,
        value_over_replacement_player
    ) {
        this.name = name;
        this.team = team;
        this.position = position;
        this.age = age;
        this.minutes_played = minutes_played;
        this.win_shares = win_shares;
        this.win_shares_per_48_minutes = win_shares_per_48_minutes;
        this.value_over_replacement_player = value_over_replacement_player;
    }
}

const playersArr = playerData.map(
    (player) =>
        new Player(
            player.name,
            player.team,
            player.positions[0].replace(/\s+/g, "_"),
            player.age,
            player.minutes_played,
            player.win_shares,
            player.win_shares_per_48_minutes,
            player.value_over_replacement_player
        )
);

const playersByPosition = _.groupBy(playersArr, "position");

module.exports.playersByPosition = playersByPosition;

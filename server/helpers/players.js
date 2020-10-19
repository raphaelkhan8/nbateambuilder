const AWS = require("aws-sdk");
const _ = require("lodash");
const { bucket, S3_KEY, S3_SECRET } = process.env;

const S3 = new AWS.S3({
    accessKeyId: S3_KEY,
    secretAccessKey: S3_SECRET,
});

const getPlayers = async (year) => {
    try {
        const { Body } = await S3.getObject({
            Bucket: bucket,
            Key: `${year}_season_totals.json`,
        }).promise();        
        return JSON.parse(Body.toString("utf-8"));
    } catch (err) {
        console.error(err);
    }
};

const groupPlayers = (playerArr) => {
    return _.chain(playerArr)
        .map((player) => {
            return {
                age: player.age,
                name: player.name,
                lastName: player.name.slice(player.name.indexOf(" ")),
                team: player.team,
                gamesPlayed: player.games_played,
                position: player.positions.replace(/\s+/g, "_"),
                minutesPlayed: player.minutes_played,
                points: player.points,
                assists: player.assists,
                steals: player.steals,
                blocks: player.blocks,
                turnovers: player.turnovers,
                personalFouls: player.personal_fouls,
                rebounds: player.offensive_rebounds + player.defensive_rebounds,
                offR: player.offensive_rebounds,
                defR: player.defensive_rebounds,
                twoPtMade: player.made_field_goals,
                twoPtAttempt: player.attempted_field_goals || 1,
                twoPointPercentage: player.made_field_goals / player.attempted_field_goals || 1,
                threePtMade: player.made_three_point_field_goals,
                threePtAttempt: player.attempted_three_point_field_goals || 1, 
                threePointPercentage: player.made_three_point_field_goals / player.attempted_three_point_field_goals || 1,
                trueShootingPercentage: player.advanced_stats.true_shooting_percentage,
                winShares: player.advanced_stats.win_shares,
                defWinShares: player.advanced_stats.defensive_win_shares,
                offWinShares: player.advanced_stats.offensive_win_shares,
            };
        })
        .groupBy("position")
        .value();
};

module.exports.getPlayers = getPlayers;
module.exports.groupPlayers = groupPlayers;

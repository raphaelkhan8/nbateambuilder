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
                team: player.team,
                gamesPlayed: player.games_played,
                position: player.positions.replace(/\s+/g, "_"),
                minutesPlayed: player.minutes_played,
                points: player.points,
                assists: player.assists,
                steals: player.steals,
                blocks: player.blocks,
                turnovers: player.turnovers,
                offensiveRebounds: player.offensive_rebounds,
                defensiveRebounds: player.defensive_rebounds,
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

const AWS = require("aws-sdk");
const _ = require("lodash");
const { bucket, S3_KEY, S3_SECRET } = process.env;

const S3 = new AWS.S3({
    accessKeyId: S3_KEY,
    secretAccessKey: S3_SECRET,
});

const getPlayers = async (year) => {
    const yearStart = year - 1;
    try {
        const { Body } = await S3.getObject({
            Bucket: bucket,
            Key: `${yearStart}-${year}_advanced_player_season_totals.json`,
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
                position: player.positions[0].replace(/\s+/g, "_"),
                minutes_played: player.minutes_played,
                true_shooting_percentage: player.true_shooting_percentage,
                win_shares: player.win_shares,
                def_win_shares: player.defensive_win_shares,
                off_win_shares: player.offensive_win_shares,
            };
        })
        .groupBy("position")
        .value();
};

module.exports.getPlayers = getPlayers;
module.exports.groupPlayers = groupPlayers;

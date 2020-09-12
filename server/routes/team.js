const express = require("express");
const {
    checkPositionCount,
    addPlayer,
    releasePlayer,
    team,
} = require("../helpers/team");

const router = new express.Router();

router.get("/getTeam", (req, res) => {
    res.send(team);
});

router.post("/addPlayer", (req, res) => {
    const { player, year } = req.body;
    if (checkPositionCount(player.position)) {
        addPlayer(player, Number(year));
    }
    res.send(team);
});

router.post("/releasePlayer", (req, res) => {
    const { player } = req.body;
    releasePlayer(player);
    res.send(team);
});

module.exports.teamRouter = router;

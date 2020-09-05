const express = require("express");
const { checkPositionCount, addPlayer } = require("../helpers/team");
const { team } = require("../objects/team");

const router = new express.Router();

router.get("/getTeam", (req, res) => {
    res.send(team);
});

router.post("/addPlayer", (req, res) => {
    const { player } = req.body;
    if (checkPositionCount(player.position)) {
        addPlayer(player);
    }
    res.send(team);
});

module.exports.teamRouter = router;

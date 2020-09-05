const express = require("express");
const { playersByPosition } = require("../objects/player");

const router = new express.Router();

router.get("/getPlayers", (req, res) => {
    res.send(playersByPosition);
});

module.exports.playerRouter = router;

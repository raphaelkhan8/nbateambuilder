const express = require("express");
const { getPlayers, groupPlayers } = require("../helpers/players");

const router = new express.Router();

router.get("/getPlayers/:year", async (req, res) => {
    const { year } = req.params;
    const players = await getPlayers(Number(year));
    const groupedPlayers = groupPlayers(players);
    res.send(groupedPlayers);
});

module.exports.playerRouter = router;

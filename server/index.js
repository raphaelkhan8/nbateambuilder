require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const publicPath = path.join(__dirname, "../build");

const { playerRouter } = require("../server/routes/players");
const { teamRouter } = require("./routes/team");

app.use(cors());
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(playerRouter);
app.use(teamRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

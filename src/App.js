import React, { Component } from "react";
import {
    Centers,
    PointGuards,
    PowerForwards,
    SmallForwards,
    ShootingGuards,
    Team,
} from "./Components/index";
import "./App.css";
import axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            centers: [],
            power_forwards: [],
            small_forwards: [],
            shooting_guards: [],
            point_guards: [],
            team: [],
            teamWins: 0,
            teamMinutesLeft: 0,
            averageAge: 0,
        };
    }

    componentDidMount() {
        this.getPlayerList();
    }

    getPlayerList = () => {
        return axios
            .get("/getPlayers")
            .then((playerList) => {
                const { data } = playerList;
                this.setState({
                    centers: data.CENTER,
                    power_forwards: data.POWER_FORWARD,
                    small_forwards: data.SMALL_FORWARD,
                    shooting_guards: data.SHOOTING_GUARD,
                    point_guards: data.POINT_GUARD,
                });
            })
            .catch((err) => console.error(err));
    };

    getTeam = () => {
        let ctx = this;
        axios
            .get("/getTeam")
            .then((team) => {
                ctx.setState({ team });
            })
            .catch((err) => console.error(err));
    };

    addPlayer = (selectedPlayer) => {
        axios
            .post("/addPlayer", { player: selectedPlayer })
            .then((res) => {
                const { position, name } = selectedPlayer;
                let pos = position.toLowerCase() + "s";
                console.log(res);
                this.setState({
                    team: res.data.players,
                    teamWins: res.data.totalWins.toFixed(1),
                    teamMinutesLeft: res.data.minutesAvailable,
                    averageAge: Number.isInteger(res.data.averageAge)
                        ? res.data.averageAge
                        : res.data.averageAge.toFixed(2),
                    [pos]: this.state[pos].filter(
                        (player) => player.name !== name
                    ),
                });
            })
            .catch((err) => console.error(err));
    };

    releasePlayer = (selectedPlayer) => {
        axios
            .post("/releasePlayer", { player: selectedPlayer })
            .then((res) => {
                console.log(selectedPlayer);
                let pos = selectedPlayer.position.toLowerCase() + "s";
                console.log("POS", pos);
                this.setState({
                    team: res.data.players,
                    teamWins: res.data.totalWins.toFixed(1),
                    teamMinutesLeft: res.data.minutesAvailable,
                    [pos]: this.state[pos].concat(selectedPlayer),
                });
            })
            .catch((err) => console.error(err));
    };

    render() {
        const {
            centers,
            power_forwards,
            small_forwards,
            shooting_guards,
            point_guards,
            team,
            teamWins,
            teamMinutesLeft,
            averageAge,
        } = this.state;

        return (
            <div className="App">
                <h2>My Team</h2>
                {team.length ? (
                    <div id="team">
                        <h3>Wins: {teamWins}</h3>
                        <h4>Number of Players: {team.length}</h4>
                        <h4>Average Age: {averageAge}</h4>
                        <h4>Minutes Left: {teamMinutesLeft}</h4>
                        {team.map((player) => (
                            <Team
                                player={player}
                                releasePlayer={this.releasePlayer}
                            />
                        ))}
                    </div>
                ) : (
                    <div>Add a player to your team</div>
                )}
                <h1>Player List</h1>
                {Object.keys(centers).length ? (
                    <div id="players">
                        <h2>CENTERS</h2>
                        {centers.map((center) => (
                            <Centers
                                player={center}
                                addPlayer={this.addPlayer}
                            />
                        ))}
                        <h2>POWER FORWARDS</h2>
                        {power_forwards.map((powerForward) => (
                            <PowerForwards
                                player={powerForward}
                                addPlayer={this.addPlayer}
                            />
                        ))}
                        <h2>SMALL FORWARDS</h2>
                        {small_forwards.map((smallForward) => (
                            <SmallForwards
                                player={smallForward}
                                addPlayer={this.addPlayer}
                            />
                        ))}
                        <h2>SHOOTING GUARDS</h2>
                        {shooting_guards.map((shootingGuard) => (
                            <ShootingGuards
                                player={shootingGuard}
                                addPlayer={this.addPlayer}
                            />
                        ))}
                        <h2>POINT GUARDS</h2>
                        {point_guards.map((pointGuard) => (
                            <PointGuards
                                player={pointGuard}
                                addPlayer={this.addPlayer}
                            />
                        ))}
                    </div>
                ) : (
                    <div>
                        <h2>No List Items Found</h2>
                    </div>
                )}
            </div>
        );
    }
}

export default App;

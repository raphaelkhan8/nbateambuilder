import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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
            inputYear: "",
            nbaYear: "",
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
        // this.getPlayerList();
    }

    handleChange = (event) => {
        this.setState({ inputYear: event.target.value });
    };

    getPlayerList = (year) => {
        return axios
            .get(`/getPlayers/${year}`)
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

    handleSubmit = (event) => {
        alert(
            "Player data from " + this.state.inputYear + " is being fetched."
        );
        event.preventDefault();
        this.getPlayerList(this.state.inputYear);
        this.setState({
            nbaYear: this.state.inputYear,
            inputYear: "",
        });
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
            .post("/addPlayer", {
                player: selectedPlayer,
                year: this.state.nbaYear,
            })
            .then((res) => {
                const { position, name } = selectedPlayer;
                let pos = position.toLowerCase() + "s";
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
                let pos = selectedPlayer.position.toLowerCase() + "s";
                this.setState({
                    team: res.data.players,
                    teamWins: res.data.totalWins.toFixed(1),
                    teamMinutesLeft: res.data.minutesAvailable,
                    averageAge: Number.isInteger(res.data.averageAge)
                        ? res.data.averageAge
                        : res.data.averageAge.toFixed(2),
                    [pos]: this.state[pos].concat(selectedPlayer),
                });
            })
            .catch((err) => console.error(err));
    };

    render() {
        const {
            inputYear,
            nbaYear,
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
                                id={uuidv4()}
                                player={player}
                                releasePlayer={this.releasePlayer}
                            />
                        ))}
                    </div>
                ) : (
                    <div>Add a player to your team</div>
                )}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        NBA Season:
                        <textarea
                            value={inputYear}
                            onChange={this.handleChange}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                {Object.keys(centers).length ? (
                    <div id="players">
                        <h1>
                            Players from the {nbaYear - 1}-{nbaYear} Season
                        </h1>
                        <Router>
                            <div>
                                <div>
                                    <Link
                                        to="/centers"
                                        style={{ marginRight: 20 }}
                                    >
                                        Centers
                                    </Link>
                                    <Link
                                        to="/power_forwards"
                                        style={{ marginRight: 20 }}
                                    >
                                        Power Forwards
                                    </Link>
                                    <Link
                                        to="/small_forwards"
                                        style={{ marginRight: 20 }}
                                    >
                                        Small Forwards
                                    </Link>
                                    <Link
                                        to="/shooting_guards"
                                        style={{ marginRight: 20 }}
                                    >
                                        Shooting Guards
                                    </Link>
                                    <Link
                                        to="/point_guards"
                                        style={{ marginRight: 20 }}
                                    >
                                        Point Guards
                                    </Link>
                                </div>

                                <Switch>
                                    <Route path="/centers">
                                        <h2>CENTERS</h2>
                                        <Centers
                                            players={centers}
                                            addPlayer={this.addPlayer}
                                        />
                                    </Route>
                                    <Route path="/power_forwards">
                                        <h2>POWER FORWARDS</h2>
                                        <PowerForwards
                                            players={power_forwards}
                                            addPlayer={this.addPlayer}
                                        />
                                    </Route>
                                    <Route path="/small_forwards">
                                        <h2>SMALL FORWARDS</h2>
                                        <SmallForwards
                                            players={small_forwards}
                                            addPlayer={this.addPlayer}
                                        />
                                    </Route>
                                    <Route path="/shooting_guards">
                                        <h2>SHOOTING GUARDS</h2>
                                        <ShootingGuards
                                            players={shooting_guards}
                                            addPlayer={this.addPlayer}
                                        />
                                    </Route>
                                    <Route path="/point_guards">
                                        <h2>SMALL FORWARDS</h2>
                                        <SmallForwards
                                            players={small_forwards}
                                            addPlayer={this.addPlayer}
                                        />
                                    </Route>
                                    <h2>POINT GUARDS</h2>
                                    <PointGuards
                                        players={point_guards}
                                        addPlayer={this.addPlayer}
                                    />
                                </Switch>
                            </div>
                        </Router>
                    </div>
                ) : (
                    <div>
                        <h2>
                            Input a year to get the list of players from that
                            NBA season
                        </h2>
                    </div>
                )}
            </div>
        );
    }
}

export default App;

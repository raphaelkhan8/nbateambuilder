import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Button } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

import { Players, Team, Nav } from "./Components/index";
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
            showTeam: false,
        };
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
        event.preventDefault();
        const { inputYear } = this.state;
        console.log(Number(inputYear));
        if (Number(inputYear) >= 2000 && Number(inputYear) <= 2020) {
            Swal.fire(
                `${inputYear - 1}-${inputYear} player data is being fetched.`
            );
            this.getPlayerList(inputYear);
            this.setState({
                nbaYear: inputYear,
                inputYear: "",
            });
        } else {
            Swal.fire("Please enter a valid year (2000-2020)");
            this.setState({
                inputYear: "",
            });
        }
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

    toggleShowTeam = () => {
        this.setState({
            showTeam: !this.state.showTeam,
        });
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
            showTeam,
        } = this.state;

        return (
            <div className="App">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        NBA Season:
                        <textarea
                            placeholder="Input season end-year (2000 - 2020)"
                            value={inputYear}
                            onChange={this.handleChange}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <h2>My Team</h2>
                {team.length ? (
                    <div id="team">
                        <h3>Wins: {teamWins}</h3>
                        <h4>Number of Players: {team.length}</h4>
                        <h4>Average Age: {averageAge}</h4>
                        <h4>Minutes Left: {teamMinutesLeft}</h4>
                        {showTeam ? (
                            <div>
                                <Button onClick={this.toggleShowTeam}>
                                    Hide My Team
                                </Button>
                                {team.map((player) => (
                                    <Team
                                        id={uuidv4()}
                                        player={player}
                                        releasePlayer={this.releasePlayer}
                                    />
                                ))}
                            </div>
                        ) : (
                            <Button onClick={this.toggleShowTeam}>
                                Show My Team
                            </Button>
                        )}
                    </div>
                ) : (
                    <div>You don't have any players :/</div>
                )}
                {Object.keys(centers).length ? (
                    <div id="players">
                        <h1>
                            {nbaYear - 1}-{nbaYear} NBA season stats
                        </h1>
                        <div>
                            <Nav />

                            <Switch>
                                <Route path="/centers">
                                    <h2>CENTERS</h2>
                                    <Players
                                        players={centers}
                                        addPlayer={this.addPlayer}
                                    />
                                </Route>
                                <Route path="/power_forwards">
                                    <h2>POWER FORWARDS</h2>
                                    <Players
                                        players={power_forwards}
                                        addPlayer={this.addPlayer}
                                    />
                                </Route>
                                <Route path="/small_forwards">
                                    <h2>SMALL FORWARDS</h2>
                                    <Players
                                        players={small_forwards}
                                        addPlayer={this.addPlayer}
                                    />
                                </Route>
                                <Route path="/shooting_guards">
                                    <h2>SHOOTING GUARDS</h2>
                                    <Players
                                        players={shooting_guards}
                                        addPlayer={this.addPlayer}
                                    />
                                </Route>
                                <Route path="/point_guards">
                                    <h2>POINT GUARDS</h2>
                                    <Players
                                        players={point_guards}
                                        addPlayer={this.addPlayer}
                                    />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        );
    }
}

export default App;

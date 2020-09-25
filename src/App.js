import React, { Component } from "react";
import { Button } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import axios from "axios";

import { Team, Nav } from "./Components/index";
import "./App.css";

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
            teamMinutesLeft: 19680,
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
        if (Number(inputYear) >= 2000 && Number(inputYear) <= 2020) {
            Swal.fire({
                text: `${
                    inputYear - 1
                }-${inputYear} player data is being fetched.`,
            });
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
        if (this.state.teamMinutesLeft - selectedPlayer.minutes_played >= 0) {
            axios
                .post("/addPlayer", {
                    player: selectedPlayer,
                    year: this.state.nbaYear,
                })
                .then((res) => {
                    const { name, position } = selectedPlayer;
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
        } else {
            Swal.fire(`Not enough minutes to add ${selectedPlayer.name}`);
        }
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
                <form id="inputForm" onSubmit={this.handleSubmit}>
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
                        <Nav
                            nbaYear={nbaYear}
                            point_guards={point_guards}
                            shooting_guards={shooting_guards}
                            small_forwards={small_forwards}
                            power_forwards={power_forwards}
                            centers={centers}
                            addPlayer={this.addPlayer}
                        />
                    </div>
                ) : (
                    <div className="instructions">
                        Enter a year (2000 through 2020) to get the NBA players
                        from that season
                    </div>
                )}
            </div>
        );
    }
}

export default App;

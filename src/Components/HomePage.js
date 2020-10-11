import React, { Component } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import { InputForm, Team, Players, Nav } from "./index";

class HomePage extends Component {
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
            offEfficiency: 0,
            defEfficiency: 0,
            teamMinutesLeft: 19680,
            totalShootingPercentage: 0,
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
        const enoughMintues =
            this.state.teamMinutesLeft - selectedPlayer.minutes_played >= 0;
        if (enoughMintues) {
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
                        offEfficiency: res.data.offEfficiency,
                        defEfficiency: res.data.defEfficiency,
                        teamMinutesLeft: res.data.minutesAvailable,
                        totalShootingPercentage:
                            res.data.totalShootingPercentage,
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
                    offEfficiency: res.data.offEfficiency,
                    defEfficiency: res.data.defEfficiency,
                    teamMinutesLeft: res.data.minutesAvailable,
                    totalShootingPercentage: res.data.totalShootingPercentage,
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
            offEfficiency,
            defEfficiency,
            teamMinutesLeft,
            totalShootingPercentage,
            averageAge,
            showTeam,
        } = this.state;

        return (
            <div className="Home">
                <InputForm
                    inputYear={inputYear}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
                <h2>My Team</h2>
                {team.length ? (
                    <div>
                        <Team
                            team={team}
                            teamWins={teamWins}
                            offEfficiency={offEfficiency}
                            defEfficiency={defEfficiency}
                            teamMinutesLeft={teamMinutesLeft}
                            totalShootingPercentage={totalShootingPercentage}
                            averageAge={averageAge}
                            showTeam={showTeam}
                            toggleShowTeam={this.toggleShowTeam}
                            releasePlayer={this.releasePlayer}
                        />
                    </div>
                ) : (
                    <div>You don't have any players :/</div>
                )}
                {Object.keys(centers).length ? (
                    <div id="players">
                        <h1>
                            {nbaYear - 1}-{nbaYear} NBA season stats
                        </h1>

                        <Nav />

                        <Players
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

export default HomePage;

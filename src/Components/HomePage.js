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
            pointsPG: 0,
            assistsPG: 0,
            stealsPG: 0,
            turnoversPG: 0,
            offRPG: 0,
            defRPG: 0,
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
        if (Number(inputYear) >= 1998 && Number(inputYear) <= 2020) {
            this.getPlayerList(inputYear);
            this.setState({
                nbaYear: inputYear,
                inputYear: "",
            });
        } else {
            Swal.fire("Please enter a valid year (1998-2020)");
            this.setState({
                inputYear: "",
            });
        }
    };

    handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            this.handleSubmit(event);
        }
    }

    addPlayer = (selectedPlayer) => {
        const enoughMintues =
            this.state.teamMinutesLeft - selectedPlayer.minutesPlayed >= 0;
        if (enoughMintues) {
            selectedPlayer.year = this.state.nbaYear;
            axios
                .post("/addPlayer", {
                    player: selectedPlayer,
                })
                .then((res) => {
                    const { name, position } = selectedPlayer;
                    let pos = position.toLowerCase() + "s";
                    this.setState({
                        team: res.data.players,
                        teamWins: res.data.totalWins,
                        offEfficiency: res.data.offEfficiency,
                        defEfficiency: res.data.defEfficiency,
                        teamMinutesLeft: res.data.minutesAvailable,
                        totalShootingPercentage: res.data.totalShootingPercentage,
                        averageAge: res.data.averageAge,
                        pointsPG: res.data.pointsPG,
                        assistsPG: res.data.assistsPG,
                        stealsPG: res.data.stealsPG,
                        turnoversPG: res.data.turnoversPG,
                        offRPG: res.data.offensiveReboundsPG,
                        defRPG: res.data.defensiveReboundsPG,
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
                    teamWins: res.data.totalWins,
                    offEfficiency: res.data.offEfficiency,
                    defEfficiency: res.data.defEfficiency,
                    teamMinutesLeft: res.data.minutesAvailable,
                    totalShootingPercentage: res.data.totalShootingPercentage,
                    averageAge: res.data.averageAge,
                    pointsPG: res.data.pointsPG,
                    assistsPG: res.data.assistsPG,
                    stealsPG: res.data.stealsPG,
                    turnoversPG: res.data.turnoversPG,
                    offRPG: res.data.offensiveReboundsPG,
                    defRPG: res.data.defensiveReboundsPG,
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
            pointsPG,
            assistsPG,
            stealsPG,
            turnoversPG,
            offRPG,
            defRPG,
            averageAge,
            showTeam,
        } = this.state;

        return (
            <div className="Home">
                <InputForm
                    inputYear={inputYear}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    handleEnterKey={this.handleEnterKey}
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
                            pointsPG={pointsPG}
                            assistsPG={assistsPG}
                            stealsPG={stealsPG}
                            turnoversPG={turnoversPG}
                            offRPG={offRPG}
                            defRPG={defRPG}
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
                        Enter a year (1998 through 2020) to get the player stats
                        from that season
                    </div>
                )}
            </div>
        );
    }
}

export default HomePage;

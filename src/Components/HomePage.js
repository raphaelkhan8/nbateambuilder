import React, { Component } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import { InputForm, Team, Players, Nav } from "./index";
import { addPlayerToTeam, releasePlayerFromTeam } from "../helpers/team";

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
            totalMinutesPlayed: 0,
            totalShootingPercentage: 0,
            twoPtMade: 0,
            twoPtAttempt: 0,
            threePtMade: 0,
            threePtAttempt: 0,
            pointsPG: 0,
            assistsPG: 0,
            stealsPG: 0,
            blocksPG: 0,
            turnoversPG: 0,
            personalFoulsPG: 0,
            offRPG: 0,
            defRPG: 0,
            averageAge: 0,
            showTeam: false,
            sorted: false,
        };
    }

    componentDidMount() {
        const savedState = JSON.parse(localStorage.getItem('savedState')) || {};
        if (Object.keys(savedState).length) {
            for (let key in savedState) {
                this.setState({
                    [key]: savedState[key],
                    showTeam: false
                })
            }
        }
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

    sortPlayers = (stat, position) => {
        const pos = position.toLowerCase() + "s";
        (this.state.sorted === false) ?
        this.setState({
            [pos]: this.state[pos].sort((a, b) => (a[stat] > b[stat]) ? -1 : 1),
            sorted: true
        }) :  
        this.setState({
            [pos]: this.state[pos].sort((a, b) => (a[stat] > b[stat]) ? 1 : -1),
            sorted: false
        })
    }

    addPlayer = (selectedPlayer) => {
        const { name, position } = selectedPlayer;
        const numOfSamePosition = this.state.team.filter(player => player.position === position).length;
        const enoughMintues = this.state.teamMinutesLeft - selectedPlayer.minutesPlayed >= 0;
        if (numOfSamePosition >= 4) {
            Swal.fire(`You can not add any more ${selectedPlayer.position.replace("_", " ")}S (Max: 4)`);
            return;
        }
        if (!enoughMintues) {
            Swal.fire(`Not enough minutes to add ${selectedPlayer.name}`);
            return;
        }
        selectedPlayer.year = this.state.nbaYear;
        let pos = position.toLowerCase() + "s";
        const team = addPlayerToTeam(selectedPlayer, this.state);
        for (let key in team) {
            this.setState({
                [key]: team[key],
                [pos]: this.state[pos].filter(
                    (player) => player.name !== name
                ),
            });
        }
    };

    releasePlayer = (selectedPlayer) => {
        let pos = selectedPlayer.position.toLowerCase() + "s";
        const team = releasePlayerFromTeam(selectedPlayer, this.state);
        for (let key in team) {
            this.setState({
                [key]: team[key],
                [pos]: this.state[pos].concat(selectedPlayer),
            });
        }
    };

    toggleShowTeam = () => {
        this.setState({
            showTeam: !this.state.showTeam,
        });
    };

    saveTeam = () => {
        localStorage.setItem('savedState', JSON.stringify(this.state));
        Swal.fire('Your team has been saved');
    }

    clearTeam = () => {
        Swal.fire({
            title: 'Are you sure you want to let everyone go?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, fire everybody!'
        }).then((result) => {
            localStorage.removeItem('savedState');
            if (result.isConfirmed) {
                Swal.fire('Your entire team quit :('
                ).then(() => {
                    window.location.reload(false);
                })
            }
        })
    }

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
            twoPtMade,
            twoPtAttempt,
            threePtMade,
            threePtAttempt,
            pointsPG,
            assistsPG,
            stealsPG,
            blocksPG,
            turnoversPG,
            personalFoulsPG,
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
                            twoPtMade={twoPtMade}
                            twoPtAttempt={twoPtAttempt}
                            threePtMade={threePtMade}
                            threePtAttempt={threePtAttempt}
                            pointsPG={pointsPG}
                            assistsPG={assistsPG}
                            stealsPG={stealsPG}
                            blocksPG={blocksPG}
                            turnoversPG={turnoversPG}
                            personalFoulsPG={personalFoulsPG}
                            offRPG={offRPG}
                            defRPG={defRPG}
                            averageAge={averageAge}
                            showTeam={showTeam}
                            saveTeam={this.saveTeam}
                            clearTeam={this.clearTeam}
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
                            sortPlayers={this.sortPlayers}
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

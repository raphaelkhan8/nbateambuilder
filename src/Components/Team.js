import React, { Component } from "react";

class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalWins: 0,
        };
    }

    render() {
        const { player, totalWins } = this.props;
        return (
            <table>
                <tbody>
                    <tr>
                        <td>
                            <em>{player.name}</em>
                        </td>
                        <td>Team: {player.team}</td>
                        <td>Age: {player.age}</td>
                        <td>Minutes Played: {player.minutes_played}</td>
                        <td>Win Shares: {player.win_shares}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default Team;

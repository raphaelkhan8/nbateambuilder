import React, { Component } from "react";

class SmallForwards extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { player, addPlayer } = this.props;
        return (
            <table>
                <tbody>
                    <tr>
                        <td>Name: {player.name}</td>
                        <td>Team: {player.team}</td>
                        <td>Position: {player.position}</td>
                        <td>Age: {player.age}</td>
                        <td>Minutes Played: {player.minutes_played}</td>
                        <td>Win Shares: {player.win_shares}</td>
                    </tr>
                    <button
                        onClick={() => {
                            addPlayer(player);
                        }}
                    >
                        Add Player
                    </button>
                </tbody>
            </table>
        );
    }
}

export default SmallForwards;

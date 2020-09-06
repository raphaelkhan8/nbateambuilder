import React from "react";

const Centers = (props) => {
    const { player, addPlayer } = props;
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
};

export default Centers;

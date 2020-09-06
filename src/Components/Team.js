import React from "react";

const Team = (props) => {
    const { player, releasePlayer } = props;
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
                <button
                    onClick={() => {
                        releasePlayer(player);
                    }}
                >
                    Release Player
                </button>
            </tbody>
        </table>
    );
};

export default Team;

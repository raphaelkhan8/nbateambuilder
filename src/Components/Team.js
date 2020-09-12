import React from "react";
import { Button } from "reactstrap";

const Team = (props) => {
    const { player, releasePlayer, id } = props;
    return (
        <table>
            <tbody>
                <tr key={id}>
                    <td>
                        <em>{player.name}</em>
                    </td>
                    <td>Team: {player.team}</td>
                    <td>Age: {player.age}</td>
                    <td>Minutes Played: {player.minutes_played}</td>
                    <td>Win Shares: {player.win_shares}</td>
                    <td>
                        <Button
                            onClick={() => {
                                releasePlayer(player);
                            }}
                        >
                            Release Player
                        </Button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default Team;

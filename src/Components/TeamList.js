import React from "react";
import { Button } from "reactstrap";

const TeamList = (props) => {
    const { player, releasePlayer, id } = props;
    return (
        <table className="team__table">
            <tbody>
                <tr key={id}>
                    <td>
                        <em>{player.name}</em>
                    </td>
                    <td>
                        Team: {player.season}
                        {player.team.split(" ").slice(-1)[0]}
                    </td>
                    <td>Age: {player.age}</td>
                    <td>Position: {player.position.replace("_", " ")}</td>
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

export default TeamList;
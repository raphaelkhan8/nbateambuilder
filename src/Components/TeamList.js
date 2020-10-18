import React from "react";
import { Button } from "reactstrap";
import { positions } from "../helpers/constants";

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
                    <td>Position: {positions[player.position]}</td>
                    <td>Minutes Played: {player.minutesPlayed}</td>
                    <td>Games Played: {player.gamesPlayed}</td>
                    <td>PPG: {(player.points / player.gamesPlayed).toFixed(2)}</td>
                    <td>APG: {(player.assists / player.gamesPlayed).toFixed(2)}</td>
                    <td>RPG: {((player.offR + player.defR) / player.gamesPlayed).toFixed(2)}</td>
                    <td>Win Shares: {player.winShares}</td>
                    <td>
                        <Button
                            title="Released player will reappear at bottom of the player list"
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

import React from "react";
import { Button } from "reactstrap";
import { positions } from "../helpers/constants";
import { v4 as uuidv4 } from "uuid";

const TeamList = (props) => {
    const { players, releasePlayer } = props;
    return (
        <table className="team__table">
            <thead className="bg-green">
                <tr>
                    <th>Name</th>
                    <th>Team</th>
                    <th>Age</th>
                    <th>Position</th>
                    <th title="Minutes played during season">Minutes</th>
                    <th title="Games played during season">Games</th>
                    <th title="Points Per Game">PPG</th>
                    <th title="Assists Per Game">APG</th>
                    <th title="Rebounds Per Game">RPG</th>
                    <th title="Field Goal Percentage">2P%</th>
                    <th title="3pt Field Goal Percentage">3P%</th>
                    <th title="True Shooting Percentage">TS%</th>
                    <th title="Total Win Shares">Total WS</th>
                </tr>
            </thead>
            <tbody>
            {players.map(player => {
                return (
                    <tr key={uuidv4()}>
                    <td>
                        <em>{player.name}</em>
                    </td>
                    <td>{player.season} {player.team.split(" ").slice(-1)[0]}</td>
                    <td>{player.age}</td>
                    <td>{positions[player.position]}</td>
                    <td>{player.minutesPlayed}</td>
                    <td>{player.gamesPlayed}</td>
                    <td>{(player.points / player.gamesPlayed).toFixed(2)}</td>
                    <td>{(player.assists / player.gamesPlayed).toFixed(2)}</td>
                    <td>{((player.offR + player.defR) / player.gamesPlayed).toFixed(2)}</td>
                    <td>{(player.twoPtMade / player.twoPtAttempt * 100).toFixed(1)}%</td>
                    <td>{(player.threePtMade / player.threePtAttempt * 100).toFixed(1)}%</td>
                    <td>{(player.trueShootingPercentage * 100).toFixed(1)}%</td>
                    <td title={`Offensive Win Shares: ${player.offWinShares} \nDefensive Win Shares: ${player.defWinShares}`}>
                        {player.winShares}
                    </td>
                    <td>
                        <Button
                            title="Released player will reappear at bottom of the player list"
                            onClick={() => { releasePlayer(player); }}
                        >Release Player</Button>
                    </td>
                </tr>
            )})}
            </tbody>
        </table>
    );
};

export default TeamList;

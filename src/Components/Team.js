import React from "react";
import { Button } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import TeamList from "./TeamList";

const Team = (props) => {
    const {
        team,
        teamWins,
        averageAge,
        pointsPG,
        assistsPG,
        stealsPG,
        turnoversPG,
        offRPG,
        defRPG,
        offEfficiency,
        defEfficiency,
        teamMinutesLeft,
        totalShootingPercentage,
        showTeam,
        toggleShowTeam,
        releasePlayer,
    } = props;
    return (
        <div>
            <div className="team__stats">
                <h3>Wins: {teamWins.toFixed(1)}</h3>
                <h4>Number of Players: {team.length}</h4>
                <h4>Avg Age: {Number.isInteger(averageAge) ? averageAge : averageAge.toFixed(2)}</h4>
                <h4 title="Points Per Game">
                    PPG: {pointsPG.toFixed(2)}
                </h4>
                <h4 title="Assists Per Game">
                    APG: {assistsPG.toFixed(2)}
                </h4>
                <h4 title={`Total Rebounds Per Game: \nOffensive RPG = ${offRPG.toFixed(2)} \nDefensive RPG = ${defRPG.toFixed(2)}`}>
                    RPG: {(defRPG + offRPG).toFixed(2)}
                </h4>
                <h4 title="Steals Per Game">
                    SPG: {stealsPG.toFixed(2)}
                </h4>
                <h4 title="Turnovers Per Game">
                    TOPG: {turnoversPG.toFixed(2)}
                </h4>
                <h4 title="True Shooting Percentage">
                    TS%: {(totalShootingPercentage * 100).toFixed(1)}%
                </h4>
                <h4 title="Percentage that Offense has contributed to win total">
                    Off Efficiency: {(offEfficiency * 100).toFixed(1)}%
                </h4>
                <h4 title="Percentage that Defense has contributed to win total">
                    Def Efficiency: {(defEfficiency * 100).toFixed(1)}%
                </h4>
                <h4 title="Minutes left for adding players (based on 82 game season except 2020-21 (72 games))">
                    Minutes Left: {teamMinutesLeft}
                </h4>
            </div>
            {showTeam ? (
                <div>
                    <Button onClick={toggleShowTeam}>Hide My Team</Button>
                    {team.map((player) => (
                        <TeamList
                            id={uuidv4()}
                            player={player}
                            releasePlayer={releasePlayer}
                        />
                    ))}
                </div>
            ) : (
                <Button onClick={toggleShowTeam}>Show My Team</Button>
            )}
        </div>
    );
};

export default Team;

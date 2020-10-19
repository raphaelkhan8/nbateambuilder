import React from "react";
import { Button } from "reactstrap";
import TeamList from "./TeamList";

const Team = (props) => {
    const {
        team,
        teamWins,
        averageAge,
        pointsPG,
        assistsPG,
        blocksPG,
        stealsPG,
        turnoversPG,
        personalFoulsPG,
        offRPG,
        defRPG,
        offEfficiency,
        defEfficiency,
        teamMinutesLeft,
        twoPtMade,
        twoPtAttempt,
        threePtMade,
        threePtAttempt,
        totalShootingPercentage,
        showTeam,
        saveTeam,
        clearTeam,
        toggleShowTeam,
        releasePlayer,
    } = props;
    
    return (
        <div>
            <div className="team__stats">
                <h3 title="Total Team Wins">
                    Wins: {teamWins.toFixed(1)}
                </h3>
                <h4 title="Number of Players">
                    # of Players: {team.length}
                </h4>
                <h4 title="Average Age of Team">
                    Avg Age: {Number.isInteger(averageAge) ? averageAge : averageAge.toFixed(2)}
                </h4>
                <h4 title="Points Per Game">
                    PPG: {pointsPG.toFixed(2)}
                </h4>
                <h4 title="Assists Per Game">
                    APG: {assistsPG.toFixed(2)}
                </h4>
                <h4 title={`Total Rebounds Per Game: \nOffensive RPG = ${offRPG.toFixed(2)} \nDefensive RPG = ${defRPG.toFixed(2)}`}>
                    RPG: {(defRPG + offRPG).toFixed(2)}
                </h4>
                <h4 title="Blocks Per Game">
                    BPG: {blocksPG.toFixed(2)}
                </h4>
                <h4 title="Steals Per Game">
                    SPG: {stealsPG.toFixed(2)}
                </h4>
                <h4 title="Turnovers Per Game">
                    TOPG: {turnoversPG.toFixed(2)}
                </h4>
                <h4 title="Personal Fouls Per Game">
                    PFPG: {personalFoulsPG.toFixed(2)}
                </h4>
                <h4 title="2pt FG Percentage">
                    2FG%: {(twoPtMade / twoPtAttempt * 100).toFixed(1)}%
                </h4>
                <h4 title="3pt FG Percentage">
                    3FG%: {(threePtMade / threePtAttempt * 100).toFixed(1)}%
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
                <h4 title={`Based on 82 game season: 19,680 total mins \nNOTE: 2020 season exception: 72 games; 17,280 mins`}>
                    Minutes Left: {teamMinutesLeft}
                </h4>
            </div>
            {showTeam ? (
                <div>
                    <Button className="team-buttons" onClick={saveTeam}>Save Team</Button>
                    <Button className="team-buttons" onClick={toggleShowTeam}>Hide Team</Button>
                    <Button className="team-buttons" onClick={clearTeam}>Clear Team</Button>
                    {<TeamList
                        players={team}
                        releasePlayer={releasePlayer}
                    />}
                </div>
            ) : (
                <div>
                    <Button className="team-buttons" onClick={toggleShowTeam}>Show Team</Button>
                    <Button className="team-buttons" onClick={saveTeam}>Save Team</Button>
                </div>
            )}
        </div>
    );
};

export default Team;

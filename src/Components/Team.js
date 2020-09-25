import React from "react";
import { Button } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import TeamList from "./TeamList";

const Team = (props) => {
    const {
        team,
        teamWins,
        averageAge,
        teamMinutesLeft,
        showTeam,
        toggleShowTeam,
        releasePlayer,
    } = props;
    return (
        <div>
            <div className="team__stats">
                <h3>Wins: {teamWins}</h3>
                <h4>Number of Players: {team.length}</h4>
                <h4>Average Age: {averageAge}</h4>
                <h4>Minutes Left: {teamMinutesLeft}</h4>
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

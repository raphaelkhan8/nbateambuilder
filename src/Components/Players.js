import React from "react";
import { Switch, Route } from "react-router-dom";
import PlayersList from "./PlayersList";

const Players = (props) => {
    const {
        point_guards,
        shooting_guards,
        small_forwards,
        power_forwards,
        centers,
        addPlayer,
    } = props;
    return (
        <div>
            <Switch>
                <Route path="/point_guards">
                    <h2>POINT GUARDS</h2>
                    <PlayersList players={point_guards} addPlayer={addPlayer} />
                </Route>
                <Route path="/shooting_guards">
                    <h2>SHOOTING GUARDS</h2>
                    <PlayersList
                        players={shooting_guards}
                        addPlayer={addPlayer}
                    />
                </Route>
                <Route path="/small_forwards">
                    <h2>SMALL FORWARDS</h2>
                    <PlayersList
                        players={small_forwards}
                        addPlayer={addPlayer}
                    />
                </Route>
                <Route path="/power_forwards">
                    <h2>POWER FORWARDS</h2>
                    <PlayersList
                        players={power_forwards}
                        addPlayer={addPlayer}
                    />
                </Route>
                <Route path="/centers">
                    <h2>CENTERS</h2>
                    <PlayersList List={centers} addPlayer={addPlayer} />
                </Route>
            </Switch>
        </div>
    );
};

export default Players;

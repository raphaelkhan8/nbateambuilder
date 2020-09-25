import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import Players from "./Players";

const Nav = (props) => {
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
            <Link to="/point_guards" style={{ marginRight: 20 }}>
                Point Guards
            </Link>
            <Link to="/shooting_guards" style={{ marginRight: 20 }}>
                Shooting Guards
            </Link>
            <Link to="/small_forwards" style={{ marginRight: 20 }}>
                Small Forwards
            </Link>
            <Link to="/power_forwards" style={{ marginRight: 20 }}>
                Power Forwards
            </Link>
            <Link to="/centers" style={{ marginRight: 20 }}>
                Centers
            </Link>
            <Switch>
                <Route path="/point_guards">
                    <h2>POINT GUARDS</h2>
                    <Players players={point_guards} addPlayer={addPlayer} />
                </Route>
                <Route path="/shooting_guards">
                    <h2>SHOOTING GUARDS</h2>
                    <Players players={shooting_guards} addPlayer={addPlayer} />
                </Route>
                <Route path="/small_forwards">
                    <h2>SMALL FORWARDS</h2>
                    <Players players={small_forwards} addPlayer={addPlayer} />
                </Route>
                <Route path="/power_forwards">
                    <h2>POWER FORWARDS</h2>
                    <Players players={power_forwards} addPlayer={addPlayer} />
                </Route>
                <Route path="/centers">
                    <h2>CENTERS</h2>
                    <Players players={centers} addPlayer={addPlayer} />
                </Route>
            </Switch>
        </div>
    );
};

export default Nav;

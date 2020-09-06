import React, { Component } from "react";
import Centers from "./Components/Centers";
import "./App.css";
import axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            centers: [],
            powerForwards: [],
            smallForwards: [],
            shootingGuards: [],
            pointGuards: [],
        };
    }

    componentDidMount() {
        this.getPlayerList();
    }

    getPlayerList = () => {
        return axios
            .get("/getPlayers")
            .then((playerList) => {
                const { data } = playerList;
                this.setState({
                    centers: data.CENTER,
                    powerForwards: data.POWER_FORWARD,
                    smallForwards: data.SMALL_FORWARD,
                    shootingGuards: data.SHOOTING_GUARD,
                    pointGuards: data.POINT_GUARD,
                });
            })
            .catch((err) => console.error(err));
    };

    render() {
        const { centers } = this.state;

        return (
            <div className="App">
                <h1>Player List</h1>
                {Object.keys(centers).length ? (
                    <div id="players">
                        <h2>CENTERS</h2>
                        {centers.map((center) => (
                            <Centers
                                player={center}
                                addPlayer={this.addPlayer}
                            />
                        ))}
                    </div>
                ) : (
                    <div>
                        <h2>No List Items Found</h2>
                    </div>
                )}
            </div>
        );
    }
}

export default App;

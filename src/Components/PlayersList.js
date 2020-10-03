import React from "react";
import { Container, Col, Row, Table, Button } from "reactstrap";
import { v4 as uuidv4 } from "uuid";

const PlayersList = (props) => {
    const { players, addPlayer } = props;
    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <Table
                        text-align="center"
                        responsive
                        hover
                        color="black"
                        bordered
                        size="md"
                        sm={{ size: 12 }}
                        md={{ size: 10, offset: 1 }}
                    >
                        <thead className="bg-green">
                            <tr>
                                <th>Name</th>
                                <th>Team</th>
                                <th title="Player's age during season">Age</th>
                                <th title="Minutes played during season">
                                    Minutes Played
                                </th>
                                <th title="True Shooting %">TS Percentage</th>
                                <th title="Offensive Win Shares">Off WS</th>
                                <th title="Defensive Win Shares">Def WS</th>
                                <th title="Total Win Shares">Total WS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player) => {
                                return (
                                    <tr key={uuidv4()}>
                                        <td>{player.name}</td>
                                        <td>{player.team}</td>
                                        <td>{player.age}</td>
                                        <td>{player.minutes_played}</td>
                                        <td>
                                            {(
                                                player.true_shooting_percentage *
                                                100
                                            ).toFixed(1)}
                                            %
                                        </td>
                                        <td>{player.offensive_win_shares}</td>
                                        <td>{player.defensive_win_shares}</td>
                                        <td>{player.win_shares}</td>
                                        <td>
                                            <Button
                                                className="float-right mb-4 btn-custom"
                                                size="sm"
                                                color="success"
                                                onClick={() =>
                                                    addPlayer(player)
                                                }
                                            >
                                                Add Player
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default PlayersList;

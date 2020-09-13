import React from "react";
import { Container, Col, Row, Table, Button } from "reactstrap";
import { v4 as uuidv4 } from "uuid";

const Players = (props) => {
    const { players, addPlayer } = props;
    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <Table
                        text-align="center"
                        responsive
                        hover
                        color="white"
                        bordered
                        size="md"
                        sm={{ size: 12 }}
                        md={{ size: 10, offset: 1 }}
                    >
                        <thead className="bg-green">
                            <tr>
                                <th className="th-sm th-text">Name</th>
                                <th className="th-sm th-text">Team</th>
                                <th className="th-sm th-text">Age</th>
                                <th className="th-sm th-text">
                                    Minutes Played
                                </th>
                                <th className="th-sm th-text">Win Shares</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player) => {
                                return (
                                    <tr key={uuidv4()}>
                                        <td className="td-sm td-text">
                                            {player.name}
                                        </td>
                                        <td className="td-sm td-text">
                                            {player.team}
                                        </td>
                                        <td className="td-sm td-text">
                                            {player.age}
                                        </td>
                                        <td className="td-sm td-text">
                                            {player.minutes_played}
                                        </td>
                                        <td className="td-sm td-text">
                                            {player.win_shares}
                                        </td>
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

export default Players;

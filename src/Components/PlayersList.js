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
                                <th title="Minutes played during season">Minutes</th>
                                <th title="Games played during season">Games</th>
                                <th title="Points Per Game">PPG</th>
                                <th title="Assists Per Game">APG</th>
                                <th title="Rebounds Per Game">RPG</th>
                                <th title="Field Goal Percentage">2P%</th>
                                <th title="3pt Field Goal Percentage">3P%</th>
                                <th title="True Shooting Percentage">TS%</th>
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
                                        <td>{player.minutesPlayed}</td>
                                        <td>{player.gamesPlayed}</td>
                                        <td>{(player.points / player.gamesPlayed).toFixed(2)}</td>
                                        <td>{(player.assists / player.gamesPlayed).toFixed(2)}</td>
                                        <td>{((player.offensiveRebounds + player.defensiveRebounds) / player.gamesPlayed).toFixed(2)}</td>
                                        <td>{(player.twoPtMade / player.twoPtAttempt * 100).toFixed(1)}%</td>
                                        <td>{(player.threePtMade / player.threePtAttempt * 100).toFixed(1)}%</td>
                                        <td>{(player.trueShootingPercentage * 100).toFixed(1)}%</td>
                                        <td>{player.offWinShares}</td>
                                        <td>{player.defWinShares}</td>
                                        <td>{player.winShares}</td>
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

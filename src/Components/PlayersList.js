import React from "react";
import { Container, Col, Row, Table, Button } from "reactstrap";
import { v4 as uuidv4 } from "uuid";

const PlayersList = (props) => {
    const { players, addPlayer, sortPlayers } = props;
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
                                <th onClick={() => sortPlayers("lastName", players[0].position)}>Name</th>
                                <th onClick={() => sortPlayers("team", players[0].position)}>Team</th>
                                <th title="Player's age during season" onClick={() => sortPlayers( "age", players[0].position)}>Age</th>
                                <th title="Minutes played during season" onClick={() => sortPlayers( "minutesPlayed", players[0].position)}>Minutes</th>
                                <th title="Games played during season" onClick={() => sortPlayers( "gamesPlayed", players[0].position)}>Games</th>
                                <th title="Points Per Game" onClick={() => sortPlayers( "points", players[0].position)}>PPG</th>
                                <th title="Assists Per Game" onClick={() => sortPlayers( "assists", players[0].position)}>APG</th>
                                <th title="Rebounds Per Game" onClick={() => sortPlayers( "rebounds", players[0].position)}>RPG</th>
                                <th title="Field Goal Percentage" onClick={() => sortPlayers( "twoPointPercentage", players[0].position)}>2P%</th>
                                <th title="3pt Field Goal Percentage" onClick={() => sortPlayers( "threePointPercentage", players[0].position)}>3P%</th>
                                <th title="True Shooting Percentage" onClick={() => sortPlayers( "trueShootingPercentage", players[0].position)}>TS%</th>
                                <th title="Offensive Win Shares" onClick={() => sortPlayers( "offWinShares", players[0].position)}>Off WS</th>
                                <th title="Defensive Win Shares" onClick={() => sortPlayers( "defWinShares", players[0].position)}>Def WS</th>
                                <th title="Total Win Shares" onClick={() => sortPlayers( "winShares", players[0].position)}>Total WS</th>
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
                                        <td>{((player.offR + player.defR) / player.gamesPlayed).toFixed(2)}</td>
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

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
                                <th title="Player's age during season" onClick={() => sortPlayers("age", players[0].position)}>Age</th>
                                <th title="Minutes played during season" onClick={() => sortPlayers("minutesPlayed", players[0].position)}>Minutes</th>
                                <th title="Games played during season" onClick={() => sortPlayers("gamesPlayed", players[0].position)}>Games</th>
                                <th title="Points Per Game" onClick={() => sortPlayers("points", players[0].position)}>PPG</th>
                                <th title="Assists Per Game" onClick={() => sortPlayers("assists", players[0].position)}>APG</th>
                                <th title="Rebounds Per Game" onClick={() => sortPlayers("rebounds", players[0].position)}>RPG</th>
                                <th title="Blocks Per Game" onClick={() => sortPlayers("blocks", players[0].position)}>BPG</th>
                                <th title="Steals Per Game" onClick={() => sortPlayers("steals", players[0].position)}>SPG</th>
                                <th title="Turnovers Per Game" onClick={() => sortPlayers("turnovers", players[0].position)}>TOPG</th>
                                <th title="Field Goal Percentage" onClick={() => sortPlayers("twoPointPercentage", players[0].position)}>2P%</th>
                                <th title="3pt Field Goal Percentage" onClick={() => sortPlayers("threePointPercentage", players[0].position)}>3P%</th>
                                <th title="True Shooting Percentage" onClick={() => sortPlayers("trueShootingPercentage", players[0].position)}>TS%</th>
                                <th title="Offensive Win Shares" onClick={() => sortPlayers("offWinShares", players[0].position)}>Off WS</th>
                                <th title="Defensive Win Shares" onClick={() => sortPlayers("defWinShares", players[0].position)}>Def WS</th>
                                <th title="Total Win Shares" onClick={() => sortPlayers("winShares", players[0].position)}>Total WS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player) => {
                                return (
                                    <tr key={uuidv4()}>
                                        <td>{player.name}</td>
                                        <td>{player.team}</td>
                                        <td title="Player age">{player.age}</td>
                                        <td title="Minutes played">{player.minutesPlayed}</td>
                                        <td title="Games played">{player.gamesPlayed}</td>
                                        <td title="Points per game">{(player.points / player.gamesPlayed).toFixed(2)}</td>
                                        <td title="Assists per game">{(player.assists / player.gamesPlayed).toFixed(2)}</td>
                                        <td title="Rebounds per game">{((player.offR + player.defR) / player.gamesPlayed).toFixed(2)}</td>
                                        <td title="Blocks per game">{(player.blocks / player.gamesPlayed).toFixed(2)}</td>
                                        <td title="Steals per game">{(player.steals / player.gamesPlayed).toFixed(2)}</td>
                                        <td title="TOs per game">{(player.turnovers / player.gamesPlayed).toFixed(2)}</td>
                                        <td title="2pt FG%">{(player.twoPtMade / player.twoPtAttempt * 100).toFixed(1)}%</td>
                                        <td title="3pt FG%">{(player.threePtMade / player.threePtAttempt * 100).toFixed(1)}%</td>
                                        <td title="True Shooting %">{(player.trueShootingPercentage * 100).toFixed(1)}%</td>
                                        <td title="Off Win Shares">{player.offWinShares}</td>
                                        <td title="Def Win Shares">{player.defWinShares}</td>
                                        <td title="Total Win Shares">{player.winShares}</td>
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

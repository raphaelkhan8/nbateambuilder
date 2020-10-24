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
                                <th>Name <i className="fas fa-sort" onClick={() => sortPlayers("lastName", players[0].position)}></i></th>
                                <th>Team <i className="fas fa-sort" onClick={() => sortPlayers("team", players[0].position)}></i></th>
                                <th title="Player's age during season">Age<i className="fas fa-sort" onClick={() => sortPlayers("age", players[0].position)}></i></th>
                                <th title="Minutes played during season">Mins<i className="fas fa-sort" onClick={() => sortPlayers("minutesPlayed", players[0].position)}></i></th>
                                <th title="Games played during season">Games<i className="fas fa-sort" onClick={() => sortPlayers("gamesPlayed", players[0].position)}></i></th>
                                <th title="Points Per Game">PPG<i className="fas fa-sort" onClick={() => sortPlayers("points", players[0].position)}></i></th>
                                <th title="Assists Per Game">APG<i className="fas fa-sort" onClick={() => sortPlayers("assists", players[0].position)}></i></th>
                                <th title="Rebounds Per Game">RPG<i className="fas fa-sort" onClick={() => sortPlayers("rebounds", players[0].position)}></i></th>
                                <th title="Blocks Per Game">BPG<i className="fas fa-sort" onClick={() => sortPlayers("blocks", players[0].position)}></i></th>
                                <th title="Steals Per Game">SPG<i className="fas fa-sort" onClick={() => sortPlayers("steals", players[0].position)}></i></th>
                                <th title="Turnovers Per Game">TOPG<i className="fas fa-sort" onClick={() => sortPlayers("turnovers", players[0].position)}></i></th>
                                <th title="Field Goal Percentage">2P%<i className="fas fa-sort" onClick={() => sortPlayers("twoPointPercentage", players[0].position)}></i></th>
                                <th title="3pt Field Goal Percentage">3P%<i className="fas fa-sort" onClick={() => sortPlayers("threePointPercentage", players[0].position)}></i></th>
                                <th title="True Shooting Percentage">TS%<i className="fas fa-sort" onClick={() => sortPlayers("trueShootingPercentage", players[0].position)}></i></th>
                                <th title="Offensive Win Shares">Off WS<i className="fas fa-sort" onClick={() => sortPlayers("offWinShares", players[0].position)}></i></th>
                                <th title="Defensive Win Shares">Def WS<i className="fas fa-sort" onClick={() => sortPlayers("defWinShares", players[0].position)}></i></th>
                                <th title="Total Win Shares">Total WS<i className="fas fa-sort" onClick={() => sortPlayers("winShares", players[0].position)}></i></th>
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

import React, { Component } from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import Header from '../Header/Header';
import { possibilityChopMove } from '../../utils/functions/possibilityChopMove';
import Table from './Table';
import damesPossibilityChopMove from '../../utils/functions/damesPossibilityChopMove';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
// import possibilityMoves from '../../utils/functions/possibilityMoves';

export default class GameContainer extends Component {
    static move(x, y, color, gameData, activeCell) {
        const newGameData = gameData;
        if (x !== activeCell[0] && y !== activeCell[1]) {
            newGameData[y][x] = newGameData[activeCell[1]][activeCell[0]];
            newGameData[activeCell[1]][activeCell[0]] = 0;
        }

        return newGameData;
    }

    static activateCell(x, y, activeColor, gameData) {
        let activeCell = [];
        const canActivate = (activeColor % 2 === 0
            && gameData[y][x] % 2 === 0 && gameData[y][x] !== 0)
            || ((activeColor % 2 !== 0) && (gameData[y][x] % 2 !== 0));

        if (canActivate) {
            activeCell = [x, y];
        }

        return activeCell;
    }

    static shouldChopCheck(gameData, activeColor) {
        const moveWithChopCoordinates = [];
        const damesActiveColor = activeColor === 1 ? 3 : activeColor === 2 ? 4 : null;
        gameData.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === activeColor) {
                    let coordinates = [];
                    coordinates = possibilityChopMove(gameData, [x, y]);
                    if (coordinates.length > 0) {
                        coordinates.forEach((el) => (
                            moveWithChopCoordinates.push(el.moveCoordinate)
                        ));
                    }
                } else
                if (cell === damesActiveColor) {
                    let coordinates = [];
                    coordinates = damesPossibilityChopMove([x, y], activeColor, gameData);

                    if (coordinates.length > 0) {
                        coordinates.forEach((el) => {
                            if (el.possibilityMoves.length > 0) {
                                moveWithChopCoordinates.push([...el.possibilityMoves]);
                            }
                        });
                    }
                }
            });
        });
        return moveWithChopCoordinates;
    }

    static damesFinding(x, y, activeColor, gameData) {
        const newGameData = gameData;
        if (newGameData[y][x] === activeColor) {
            if (activeColor === 1 && y <= 0) {
                newGameData[y][x] = 3;
            } else if (activeColor === 2 && y >= 7) {
                newGameData[y][x] = 4;
            }
        }
        return newGameData;
    }

    constructor(props) {
        super(props);
        const initialState = JSON.parse(window.localStorage.getItem('chess')) || {};
        this.state = {
            id: Date.now(),
            player1: initialState.player1,
            player1Points: 0,
            player2: initialState.player2,
            player2Points: 0,
            gameData: [
                [0, 2, 0, 2, 0, 2, 0, 2],
                [2, 0, 2, 0, 2, 0, 2, 0],
                [0, 2, 0, 2, 0, 2, 0, 2],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0],
            ],
            activeCell: [],
        };
        this.data = {
            activeColor: 1,
            moveWithChopCoordinates: [],
            dameMoveWithChopCoordinates: [],
        };
        this.onClickCell = this.onClickCell.bind(this);
        this.restart = this.restart.bind(this);
        this.writeResults = this.writeResults.bind(this);
    }

    onClickCell(x, y) {
        const {
            player1Points,
            player2Points,
            activeCell,
            gameData,
        } = this.state;
        let newGameData = gameData.map((el) => [...el]);

        let newActiveCell = [];
        let newPlayer1Points = player1Points;
        let newPlayer2Points = player2Points;

        if (activeCell.length > 0) {
            const isDame = activeCell.length > 0 && newGameData[activeCell[1]][activeCell[0]] > 2;

            const isShouldChop = GameContainer.shouldChopCheck(newGameData, this.data.activeColor).length > 0;

            if (!isDame) {
                const isCellEmpty = gameData[y][x] === 0;
                const isMoveForward = (this.data.activeColor === 1 && y < activeCell[1]) || (this.data.activeColor === 2 && y > activeCell[1]);
                const isMoveOneCell = Math.abs(activeCell[1] - y) === 1;
                const canMove = isCellEmpty && isMoveForward && isMoveOneCell;

                this.data.moveWithChopCoordinates = possibilityChopMove(newGameData, activeCell);
                const canMoveWithChop = this.data.moveWithChopCoordinates.some((el) => (el.moveCoordinate[0] === x && el.moveCoordinate[1] === y));

                if (canMove && !isShouldChop) {
                    newGameData = GameContainer.move(x, y, this.data.activeColor, gameData, activeCell);
                    newGameData = GameContainer.damesFinding(x, y, this.data.activeColor, newGameData);
                    this.data.activeColor = this.data.activeColor === 1 ? 2 : 1;
                } else if (canMoveWithChop) {
                    newGameData = GameContainer.move(x, y, this.data.activeColor, gameData, activeCell);
                    this.data.moveWithChopCoordinates.forEach((el) => {
                        if (x === el.moveCoordinate[0] && y === el.moveCoordinate[1]) {
                            newGameData[el.enemy[1]][el.enemy[0]] = 0;
                        }
                    });

                    if (this.data.activeColor === 1) {
                        newPlayer1Points += 1;
                    } else if (this.data.activeColor === 2) {
                        newPlayer2Points += 1;
                    }

                    newGameData = GameContainer.damesFinding(x, y, this.data.activeColor, newGameData);

                    const canNextMove = possibilityChopMove(newGameData, [x, y]);
                    if (canNextMove.length === 0) {
                        this.data.activeColor = this.data.activeColor === 1 ? 2 : 1;
                    }
                }
            } else {
                const isCellEmpty = gameData[y][x] === 0;
                const isDiagonalMove = Math.abs(activeCell[0] - x) === Math.abs(activeCell[1] - y);
                const canMove = isCellEmpty && !isShouldChop && isDiagonalMove;

                this.data.dameMoveWithChopCoordinates = damesPossibilityChopMove(activeCell, this.data.activeColor, newGameData);
                const canMoveWithChop = this.data.dameMoveWithChopCoordinates.some((direction) => direction.possibilityMoves.some((el) => el[0] === x && el[1] === y));

                if (canMove) {
                    newGameData = GameContainer.move(x, y, this.data.activeColor, gameData, activeCell);
                    this.data.activeColor = this.data.activeColor === 1 ? 2 : 1;
                } else if (canMoveWithChop) {
                    newGameData = GameContainer.move(x, y, this.data.activeColor, gameData, activeCell);
                    this.data.dameMoveWithChopCoordinates.forEach((direction) => {
                        if (direction.possibilityMoves.some((el) => x === el[0] && y === el[1])) {
                            newGameData[direction.enemy[1]][direction.enemy[0]] = 0;
                        }
                    });

                    if (this.data.activeColor === 1) {
                        newPlayer1Points += 1;
                    } else if (this.data.activeColor === 2) {
                        newPlayer2Points += 1;
                    }

                    const canNextMove = damesPossibilityChopMove([x, y], this.data.activeColor, newGameData);
                    if (canNextMove.every((el) => el.possibilityMoves.length === 0)) {
                        this.data.activeColor = this.data.activeColor === 1 ? 2 : 1;
                    }
                }
            }
        } else {
            newActiveCell = GameContainer.activateCell(x, y, this.data.activeColor, gameData);
        }
        this.setState({
            activeCell: newActiveCell,
            gameData: newGameData,
            player1Points: newPlayer1Points,
            player2Points: newPlayer2Points,
        });
    }

    restart() {
        this.writeResults();

        this.setState({
            id: Date.now(),
            player1Points: 0,
            player2Points: 0,
            gameData: [
                [0, 2, 0, 2, 0, 2, 0, 2],
                [2, 0, 2, 0, 2, 0, 2, 0],
                [0, 2, 0, 2, 0, 2, 0, 2],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0],
            ],
            activeCell: [],
        });

        this.data.activeColor = 1;
        this.data.moveWithChopCoordinates = [];
        this.data.dameMoveWithChopCoordinates = [];
    }

    writeResults() {
        const {
            id,
            player1,
            player1Points,
            player2,
            player2Points,
        } = this.state;
        const results = JSON.parse(window.localStorage.getItem('chessResults')) || [];

        const date = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        };

        if (results.every((el) => el.id !== id)) {
            results.push({
                id,
                date: date.toLocaleString('ru', options),
                player1,
                player1Points,
                player2,
                player2Points,
            });
        }
        window.localStorage.setItem('chessResults', JSON.stringify(results));
        // return <Redirect to="/result" />;
    }

    render() {
        const {
            player1,
            player1Points,
            player2,
            player2Points,
            gameData,
            activeCell,
        } = this.state;

        if (typeof window.localStorage.getItem('chess') !== 'string') {
            return <Redirect to="/" />;
        }
        return (
            <Container>
                <Link to="/">Назад</Link>
                <Header
                    player1={player1}
                    player1Points={player1Points}
                    player2Points={player2Points}
                    player2={player2}
                />
                <Table
                    activeCell={activeCell}
                    data={gameData}
                    onClickCell={this.onClickCell}
                />
                <Button onClick={this.restart}>Restart</Button>
                <Button onClick={this.writeResults}><Link to="/result">To complete</Link></Button>
            </Container>
        );
    }
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../common/Button/Button';

export default class StartScreen extends Component {
    static checkColor(state, player) {
        const newData = { player1: { ...state.player1 }, player2: { ...state.player2 } };
        const { player1: { chessColor: color1 }, player2: { chessColor: color2 } } = newData;

        if (color1 === 'black' && player === 'player1') {
            newData.player2.chessColor = 'white';
        }
        if (color1 === 'white' && player === 'player1') {
            newData.player2.chessColor = 'black';
        }
        if (color2 === 'black' && player === 'player2') {
            newData.player1.chessColor = 'white';
        }
        if (color2 === 'white' && player === 'player2') {
            newData.player1.chessColor = 'black';
        }
        return newData;
    }

    constructor(props) {
        super(props);
        this.state = {
            player1: {
                name: '',
                chessColor: 'white',
            },
            player2: {
                name: '',
                chessColor: 'black',
            },
        };
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleOnGo = this.handleOnGo.bind(this);
    }

    handleChangeInput(player, input, value) {
        const { player1, player2 } = this.state;
        let newState = { player1: { ...player1 }, player2: { ...player2 } };

        newState[player][input] = value;
        newState = StartScreen.checkColor(newState, player);
        this.setState({ ...newState });
    }

    handleOnGo() {
        window.localStorage.setItem('chess', JSON.stringify(this.state));
    }

    render() {
        const { player1, player2 } = this.state;

        return (
            <Container>
                <Title>Supper Pupper Chess</Title>
                <Block>
                    <Player>
                        <PlayerTitle>Player 1</PlayerTitle>
                        <Name
                            type="text"
                            placeholder="your name"
                            onChange={(e) => this.handleChangeInput('player1', 'name', e.target.value)}
                            value={player1.name}
                        />
                        <Color
                            name="color1"
                            type="radio"
                            value="white"
                            checked={player1.chessColor === 'white'}
                            onChange={(e) => this.handleChangeInput('player1', 'chessColor', e.target.value)}
                        />
                        White
                        <Color
                            name="color1"
                            type="radio"
                            value="black"
                            checked={player1.chessColor === 'black'}
                            onChange={(e) => this.handleChangeInput('player1', 'chessColor', e.target.value)}
                        />
                        Black
                    </Player>
                    <Player>
                        <PlayerTitle>Player 2</PlayerTitle>
                        <Name
                            type="text"
                            placeholder="your name"
                            onChange={(e) => this.handleChangeInput('player2', 'name', e.target.value)}
                            value={player2.name}
                        />
                        <Color
                            name="color2"
                            type="radio"
                            value="white"
                            checked={player2.chessColor === 'white'}
                            onChange={(e) => this.handleChangeInput('player2', 'chessColor', e.target.value)}
                        />
                        White
                        <Color
                            name="color2"
                            type="radio"
                            value="black"
                            checked={player2.chessColor === 'black'}
                            onChange={(e) => this.handleChangeInput('player2', 'chessColor', e.target.value)}
                        />
                        Black
                    </Player>
                </Block>
                <Link to="/game"><Button onClick={this.handleOnGo}>Go go go</Button></Link>
            </Container>
        );
    }
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    color: #474545;
`;

const Title = styled.div`
    font-size: 40px;
`;

const Block = styled.div`
    display: flex;
    justify-content: space-around;

    width: 80%;
    margin-top: 50px;
`;

const Player = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 300px;
    height: 300px;
    border: 1px solid #7a7878;
    border-radius: 30px;
`;

const PlayerTitle = styled.div`
    margin-bottom: 30px;
    font-size: 30px;
`;

const Name = styled.input`
    width: 250px;
    height: 60px;
    padding: 0 10px;
`;

// const ChessColor = styled.select`
//     width: 250px;
//     height: 60px;
//     padding: 0 10px;
//     margin-top: 20px;
// `;

const Color = styled.input`

`;

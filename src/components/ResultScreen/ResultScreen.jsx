import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../common/Button/Button';

export default class ResultScreen extends Component {
    static renderResult() {
        const results = JSON.parse(window.localStorage.getItem('chessResults')) || [];

        return results.map((result, index) => {
            const winner = result.player1Points > result.player2Points ? result.player1.chessColor : result.player2.chessColor;
            return (
                <Row key={index.toString()}>
                    <Cell>{result.date}</Cell>
                    <Cell>{`${result.player1.name} : ${result.player1.chessColor} - ${result.player1Points}`}</Cell>
                    <Cell>{`${result.player2.name} : ${result.player2.chessColor} - ${result.player2Points}`}</Cell>
                    <Cell>{`Winner is ${winner}`}</Cell>
                </Row>
            );
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            reRender: false,
        };
        this.onCleanHistory = this.onCleanHistory.bind(this);
    }

    onCleanHistory() {
        window.localStorage.removeItem('chessResults');
        this.setState((state) => (
            { reRender: !state.rerender }
        ));
    }

    render() {
        return (
            <Container>
                <Title>Results</Title>
                <Table>
                    {ResultScreen.renderResult()}
                </Table>
                <Clean onClick={this.onCleanHistory}>Clean History</Clean>
                <Link to="/game"><Button>Back to game</Button></Link>
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

const Title = styled.div`
    font-size: 40px;
`;

const Table = styled.div`
    width: 500px;
    margin-top: 100px;
    padding: 20px;

    border: 1px dashed;
    border-radius: 20px;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;
    margin-top: 10px;
    border-bottom: 1px solid;

    :hover{
        background: #b8b3b3;
    }
`;

const Cell = styled.div`
    text-align: center;
`;

const Clean = styled.div`
    color: blue;
    cursor: pointer;
`;

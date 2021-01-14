import React, { Component } from 'react';
import styled from 'styled-components';

export default class Header extends Component {
    render() {
        const {
            player1,
            player2,
            player1Points,
            player2Points,
        } = this.props;
        return (
            <Container>
                <Player>
                    <Color color={player1.chessColor} />
                    <Name>{player1.name}</Name>
                    ---
                    <Amount>{player1Points}</Amount>
                </Player>
                <Player>
                    <Color color={player2.chessColor} />
                    <Name>{player2.name}</Name>
                    ---
                    <Amount>{player2Points}</Amount>
                </Player>
            </Container>
        );
    }
}

const Container = styled.div``;

const Player = styled.div`
    display: flex;
`;

const Color = styled.div`
    width: 20px;
    height: 20px;

    background: ${({ color }) => (color === 'white' ? '#FFFFFF' : '#000000')};

    border-radius: 50%;
    border: 1px solid;
`;

const Name = styled.div`
    font-size: 20px;
`;

const Amount = styled.div`
    font-size: 20px;
`;

import React, { Component } from 'react';
import styled from 'styled-components';
import StartScreen from '../../components/StartScreen/StartScreen';

export default class Start extends Component {
    render() {
        return (
            <Container>
                <StartScreen />
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

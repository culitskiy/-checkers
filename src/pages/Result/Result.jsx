import React, { Component } from 'react';
import styled from 'styled-components';
import ResultScreen from '../../components/ResultScreen/ResultScreen';

export default class Result extends Component {
    render() {
        return (
            <Container>
                <ResultScreen />
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

import React, { Component } from 'react';
import styled from 'styled-components';
import GameContainer from '../../components/GameContainer/GameContainer';

export default class Game extends Component {
    render() {
        return (
            <Root>
                <GameContainer />
            </Root>
        );
    }
}

const Root = styled.div`
`;

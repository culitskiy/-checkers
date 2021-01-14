import React, { Component } from 'react';
import styled from 'styled-components';
import Cell from './Cell';

export default class Row extends Component {
    static cellRender(self) {
        const {
            data,
            y,
            activeCell,
            onClickCell,
        } = self.props;
        return data.map((el, index) => (
            <Cell
                key={index.toString()}
                data={el}
                y={y}
                x={index}
                activeCell={activeCell}
                onClickCell={onClickCell}
            />
        ));
    }

    render() {
        return (
            <Container>
                {Row.cellRender(this)}
            </Container>
        );
    }
}

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

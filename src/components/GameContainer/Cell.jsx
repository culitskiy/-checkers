import React, { Component } from 'react';
import styled from 'styled-components';

export default class Cell extends Component {
    static handleActivateCell(self) {
        const { x, y, onClickCell } = self.props;
        const black = (y % 2 === 0 && x % 2 !== 0) || (y % 2 !== 0 && x % 2 === 0);
        if (black) {
            onClickCell(x, y);
        }
    }

    shouldComponentUpdate(nextProps) {
        const {
            x: oldX,
            y: oldY,
            activeCell: oldActiveCell,
            data: oldData,
        } = this.props;
        const {
            x,
            y,
            activeCell,
            data,
        } = nextProps;

        if ((x === activeCell[0] && y === activeCell[1])
            || (oldX === oldActiveCell[0] && oldY === oldActiveCell[1])
            || data !== oldData) {
            return true;
        }
        return false;
    }

    render() {
        const {
            x,
            y,
            data,
            activeCell,
        } = this.props;

        const isActive = (x === activeCell[0]) && (y === activeCell[1]);
        console.log('cell');
        return (
            <Container
                black={(y % 2 === 0 && x % 2 !== 0) || (y % 2 !== 0 && x % 2 === 0)}
                onClick={() => Cell.handleActivateCell(this)}
            >
                {data !== 0 && <Checker data={data} isActive={isActive} />}
            </Container>
        );
    }
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 60px;
    height: 60px;

    border: 1px solid #8a8585;

    background: ${({ black }) => (black ? '#777171' : '#FFFFFF')};
`;

const Checker = styled.div`
    width: ${({ data }) => (data > 2 ? '55px' : '40px')};
    height: ${({ data }) => (data > 2 ? '55px' : '40px')};

    border-radius: 50%;
    background-color: ${({ data }) => ((data === 1 || data === 3) ? '#FFFFFF' : '#000000')};
    opacity: ${({ isActive }) => (isActive ? 0.5 : 1)};
`;

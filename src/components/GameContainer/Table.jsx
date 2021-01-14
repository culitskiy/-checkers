import React, { Component } from 'react';
import styled from 'styled-components';
import Row from './Row';

export default class Table extends Component {
    static columnRender(self) {
        const { data, activeCell, onClickCell } = self.props;
        return data.map((el, index) => (
            <Row
                key={index.toString()}
                data={el}
                y={index}
                activeCell={activeCell}
                onClickCell={onClickCell}
            />
        ));
    }

    render() {
        return (
            <Container>
                {Table.columnRender(this)}
            </Container>
        );
    }
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

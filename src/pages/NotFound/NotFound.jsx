import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Font } from '../../utils/fonts';

class NotFound extends Component {
    render() {
        const { className } = this.props;

        return (
            <Root className={className}>
                <Content>
                    <Header>
                        Страница не найдена
                    </Header>
                    <Description>
                        Возможно вы ввели неверный адрес страницы, или этой страницы не существует
                    </Description>
                    <ButtonLink to="/">
                        На главную страницу
                    </ButtonLink>
                </Content>
                <NotFoundImage src="https://www.sber.ru/portalserver/content/api/contentstream-id/3ec90c48-4d31-4419-adfd-8d07b67bfdeb/428aa2b9-9661-4a43-acd9-3106c58747c6?&_=1598273418563" />
            </Root>
        );
    }
}

const Root = styled.div`
    ${Font.SBSansText};
    margin-top: 125px;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 411px;
    margin: 0 auto;
`;

const Header = styled.h1`
    margin-top: 0;
    font-size: 32px;
    line-height: 1.25;
`;

const Description = styled.p`
    margin-top: 20px;
    font-size: 17px;
    line-height: 1.41;
    text-align: center;
`;

const ButtonLink = styled(Link)`
    margin-top: 32px;
    font-weight: 600;
    margin-top: 25px;
    padding: 16px 32px;
    color: #fff;
    font-size: 15px;
    line-height: 1.33;
    text-decoration: none;
    border-radius: 8px;
    background-image: linear-gradient(104deg,#20d94d 3%,#35a7cc);
`;

const NotFoundImage = styled.img`
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
`;

export default NotFound;

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import GlobalStyles from './GlobalStyles';
import NotFound from '../pages/NotFound';
import Start from '../pages/Start/Start';
import Game from '../pages/Game/Game';
import Result from '../pages/Result/Result';

class Application extends Component {
    render() {
        return (
            <>
                <GlobalStyles />
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Start} />
                        {/* <Route exact path="/" component={TestPage} /> */}
                        {/* <Route exact path="/interwiev/:name" component={Blog} /> */}
                        <Route exact path="/game" component={Game} />
                        <Route exact path="/result" component={Result} />

                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </>
        );
    }
}

export default Application;

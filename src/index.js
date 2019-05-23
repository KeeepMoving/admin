import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index';
import * as serviceWorker from './serviceWorker';
import {Route, Router, Switch} from "react-router";
import history from './services/common/history';
import './services/common/setup';
import AppContainer from "./components/AppContainer";
import NotFound from './components/common/NotFound';
import SystemSettings from "./components/system/SystemSettings";
import Order from "./components/order/Order";
import Trade from "./components/order/Trade";
import FailedRequest from "./components/order/FailedRequest";
import OrderReport from "./components/order/OrderReport";
import EarningReport from "./components/order/EarningReport";
import ContractReport from "./components/order/ContractReport";

let router = (
    <Router history={history}>
        <AppContainer>
            <Switch>
                <Route path="/" exact component={SystemSettings}/>
                <Route path="/systemSettings" exact component={SystemSettings}/>
                <Route path="/order" exact component={Order}/>
                <Route path="/trade" exact component={Trade}/>
                <Route path="/orderReport" exact component={OrderReport}/>
                <Route path="/earningReport" exact component={EarningReport}/>
                <Route path="/contractReport" exact component={ContractReport}/>
                <Route path="/failedRequest" exact component={FailedRequest}/>
                <Route path="/" component={NotFound}/>
            </Switch>
        </AppContainer>
    </Router>
);

ReactDOM.render(router, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

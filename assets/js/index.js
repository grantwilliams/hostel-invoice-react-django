import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, browserHistory, Switch } from 'react-router-dom';
import ReduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';

import App from '../../src/containers/app';
import Booking from '../../src/containers/booking';
import reducers from '../../src/reducers';
import '../../style/style.css'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/booking/:id" component={Booking} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
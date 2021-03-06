import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import App from './components/app/app';
import reducer from './reducer/index';
import {createAPI} from './api';
import {Operation as DataOperation} from './reducer/data/data';
import {ActionCreator, Operation as UserOperation} from './reducer/user/user';
import {Auth} from './const';

const onUnauthorized = () => {
  store.dispatch(ActionCreator.setAuthStatus(Auth.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadMovies());
store.dispatch(DataOperation.loadPromo());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);

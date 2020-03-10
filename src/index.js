import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import App from './components/app/app.jsx';
import reducer from './reducer/index.js';
import {createAPI} from "./api.js";
import {Operation as DataOperation} from './reducer/data/data.js';
import {ActionCreator, Operation as UserOperation} from './reducer/user/user.js';
import {Auth} from './const';

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(Auth.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadMovies());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);

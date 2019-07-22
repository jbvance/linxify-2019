import {createStore, applyMiddleware, combineReducers} from 'redux';
import logger from 'redux-logger'
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken} from './local-storage';
import authReducer from './reducers/auth';
import userLinksReducer from './reducers/links';
import categoriesReducer from './reducers/categories';
import {setAuthToken, refreshAuthToken} from './actions/auth';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }

const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        userLinks: userLinksReducer,
        categories: categoriesReducer
    }),
    applyMiddleware(...middlewares)
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;

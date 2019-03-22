import {combineReducers} from 'redux';
import app from './app';
import home from './home';
import master from './master';

export default combineReducers({
    app,
    home,
    master
})

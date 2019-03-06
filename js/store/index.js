// import configureStore from './configureStore';
import React from 'react';
import {Provider} from 'react-redux';
import App from '../App';

import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../reducers';

const store = createStore(RootReducer,applyMiddleware(thunk));

class Root extends React.Component{
    constructor(props){
        super(props);
        // this.state = {
        //     store:null
        // }
    }
    componentDidMount() {
        // this.setState({store:configureStore()})
    }

    render(){
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}
module.exports = Root;

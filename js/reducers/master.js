import {objectAppend} from "../utils";

const defaultState = {
    dashboard:{
        webViewLoad:false
    },
    streamView:{
        webViewLoad:false
    },
    conversions:{
        webViewLoad:false
    },
    dashboard2:{
        webViewLoad:false
    },
    dashboard3:{
        webViewLoad:false
    }
};

export default (state,action) => {
    let newState = {};
    switch(action.type){
        case 'MASTER_WEBVIEW_LOAD':
            if(state&&state[action.key].webViewLoad)
                return state || defaultState;
            else
                newState[action.key] = {
                    webViewLoad:true
                };
            break;
        default:return state||defaultState;
    }
    return objectAppend(newState,state);
}

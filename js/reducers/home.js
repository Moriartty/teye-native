import {objectAppend} from "../utils";

const defaultState = {
    fifthChartData:{
        option:{},
        data:[]
    }
};

export default (state,action) => {
    let newState = {};
    switch(action.type){
        case 'HOME_FIFTH_DATA':
            newState.fifthChartData = {
                option:action.option,
                data:action.data
            };
            break;
        default : return state||defaultState;
    }
    return objectAppend(newState,state);
}

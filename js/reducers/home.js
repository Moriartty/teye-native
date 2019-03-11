import {objectAppend} from "../utils";

const defaultState = {
    firstChartData: {
        option:{}
    },
    secondChartData: {
        data: {},
        option: {}
    },
    fifthChartData:{
        option:{},
        data:[]
    }
};

export default (state,action) => {
    let newState = {};
    switch(action.type){
        case 'HOME_FIRST_DATA':
            newState.firstChartData = {
                // data:action.data,
                option: action.option
            };
            break;
        case 'HOME_SECOND_DATA':
            newState.secondChartData = {
                data: action.data,
                option: action.option
            };
            break;
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

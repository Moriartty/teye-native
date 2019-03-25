import {objectAppend} from "../utils";

const defaultState = {
    mapType: 'map',
    mapChartData:{
        data:[],
        option:{},
        webViewLoad:false
    },
    selectedProduct:'',
    selectedCountry:'world',
    bubbleChartData: {
        data: [],
        option: {},
        webViewLoad:false
    },
    firstChartData: {
        option:{},
        webViewLoad:false
    },
    secondChartData: {
        data: [],
        option: {},
        webViewLoad:false
    },
    thirdChartData: {
        data: [],
        option: {},
        webViewLoad:false
    },
    fourthChartData: {
        data: [],
        option: {},
        webViewLoad:false
    },
    fifthChartData:{
        option:{},
        data:[],
        webViewLoad:false
    }
};

export default (state,action) => {
    let newState = {};
    switch(action.type){
        case 'HOME_MAP_DATA':
            newState.mapChartData = {
                data: action.data,
                option: action.option,
                webViewLoad:state.mapChartData.webViewLoad
            };
            break;
        case 'HOME_BUBBLE_DATA':
            newState.bubbleChartData = {
                data: action.data,
                option: action.option,
            };
            break;
        case 'HOME_REFRESHBUBBLE_DATA':
            newState.bubbleChartData = {
                data: action.chartData.data,
                option: action.chartData.option,
            };
            break;
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
        case 'HOME_THIRD_DATA':
            newState.thirdChartData = {
                data: action.data,
                option: action.option
            };
            break;
        case 'HOME_FOURTH_DATA':
            newState.fourthChartData = {
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
        case 'HOME_WEBVIEW_LOAD':
            if(state&&state[action.key].webViewLoad)
                return state || defaultState;
            else
                newState[action.key] = {
                    option:state[action.key].option,
                    data:state[action.key].data,
                    webViewLoad:true
                };
            break;
        case 'HOME_COUNTRY_CHANGE':
            // if(action.selectedCountry=='United States'){
            //     // action.selectedCountry='USA'
            //     action.selectedCountry='United States'
            // }
            if(state.selectedCountry==action.selectedCountry){
                newState.selectedCountry = 'world';
            }else{
                newState.selectedCountry = action.selectedCountry;
            }

            break;
        default : return state||defaultState;
    }
    return objectAppend(newState,state);
}

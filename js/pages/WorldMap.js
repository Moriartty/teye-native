
import React from 'react';
import ExChart from '../components/ExChart';
import { connect } from 'react-redux';
import action from '../actions/home';
import theme from '../config/theme'
import {View} from 'react-native';
import NumScroll from '../components/NumScroll';

let geoCoordMap = {
    '中国': [116.46, 39.92],
    '美国': [-77.01, 38.91],
    '法国': [2.20, 42.52]
};
let convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push(geoCoord.concat(data[i].value));
        }
    }
    return res;
};

class WorldMap extends React.PureComponent {
    constructor (props) {
        super(props);
        // this.state = { selectCountry: '' };
    }
    handleClick = (e) => {
        console.log('log',e.name,this.props.selectedCountry)
        if (e.name !== this.props.selectedCountry) {
            this.props.bindSelectedCountry(e.name);
        }else{
            this.props.clearSelectedCountry();
        }
    }

    render () {
        const { width, height, id,selectedCountry, mapChartData:chartData,handleWebViewLoad } = this.props;
        return (
            <View>
                <NumScroll width={'100%'} height={150} />
                <ExChart
                    opt={{ type: 'heat-map' }}
                    data={chartData.webViewLoad&&convertData(chartData.data)}
                    chartOption={chartData.option}
                    width={'100%'}
                    minHeight={300}
                    // onPress={this.handleClick}
                    onLoadEnd={handleWebViewLoad.bind(this,'mapChartData',true)}
                    backgroundColor={theme["primary-color"]}
                />
            </View>
        );
    }
}
WorldMap = connect(state=>{
    const {mapChartData,selectedCountry} = state['home'];
    return {mapChartData,selectedCountry};
}, dispatch => ({
    onClick (name) {
        dispatch(action.loadFirstChart(name));
        dispatch(action.loadSecondChart());
        dispatch(action.loadThirdChart());
        dispatch(action.loadFourthChart(name));
        dispatch(action.loadFifthChart());
    },
    bindSelectedCountry(name){
        dispatch({type:'HOME_COUNTRY_CHANGE',selectedCountry:name});
        // this.onClick(name);
        console.log('bind',name);
    },
    clearSelectedCountry(){
        dispatch({type:'HOME_COUNTRY_CHANGE',selectedCountry:'world'});
        // this.onClick();
        console.log('clear',name);
    }
}))(WorldMap);

export default WorldMap;

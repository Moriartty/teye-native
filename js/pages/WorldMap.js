
import React from 'react';
import ExChart from '../components/ExChart';
import { connect } from 'react-redux';
import action from '../actions/home';

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

class WorldMap extends React.Component {
    constructor (props) {
        super(props);
        // this.state = { selectCountry: '' };
    }
    handleClick = (e) => {
        if (e.name !== this.props.selectedCountry) {
            console.log(1,e.name,this.props.selectedCountry)
            // this.setState({ selectCountry: e.name });
            this.props.bindSelectedCountry(e.name);
        }else{
            console.log(2,e.name,this.props.selectedCountry)
            // this.setState({selectCountry:''});
            this.props.clearSelectedCountry();
        }
    }
    render () {
        const { width, height, id,selectedCountry, mapChartData:chartData } = this.props;
        return (
            <ExChart
                opt={{ type: 'heat-map' ,selectedCountry:selectedCountry}}
                data={convertData(
                    [{ name: '中国', value: 300 },
                    { name: '美国', value: 800 },
                    { name: '法国', value: 500 }])}
                chartOption={chartData.option}
                width={'100%'}
                minHeight={450}
                onPress={this.handleClick}
            />
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

import React from 'react';
import { Text, View,Image } from 'react-native';
import ExChart from '../components/ExChart';
import {connect} from 'react-redux';
import action from '../actions/home'

class PainPoint extends React.Component {
    componentWillMount() {
        this.props.init();
    }
    render() {
        const {secondChartData:chartData} = this.props;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ExChart
                    opt={{ type: 'customized-pie' }}
                    data={chartData.data}
                    chartOption={chartData.option}
                    width={'100%'}
                    minHeight={300}
                    // onClick={this.handleClick}
                />
            </View>
        );
    }
}
PainPoint = connect(state=>{
    const {secondChartData} = state['home'];
    return {secondChartData};
},dispatch=>({
    init(){
        dispatch(action.loadSecondChart());
    }
}))(PainPoint);
export default PainPoint;

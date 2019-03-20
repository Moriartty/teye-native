import React from 'react';
import { Text, View,Image } from 'react-native';
import ExChart from '../components/ExChart';
import {connect} from 'react-redux';
import action from '../actions/home';

class Habit extends React.PureComponent {
    componentWillMount() {
        // this.props.init();
    }
    render() {
        const {fourthChartData:chartData,handleWebViewLoad} = this.props;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ExChart
                    opt={{ type: 'horizontal-stack-bar' }}
                    chartOption={chartData.option}
                    data={chartData.data}
                    width={'100%'}
                    minHeight={350}
                    // onClick={this.handleClick}
                    onLoadEnd={handleWebViewLoad.bind(this,'fourthChartData',true)}
                />
            </View>
        );
    }
}
Habit = connect(state=>{
    const {fourthChartData} = state['home'];
    return {fourthChartData};
},dispatch=>({
    init(){
        dispatch(action.loadFourthChart());
    }
}))(Habit);
export default Habit;

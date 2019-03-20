import React from 'react';
import { Text, View,Image } from 'react-native';
import ExChart from '../components/ExChart';
import {connect} from 'react-redux';
import action from '../actions/home';

class Activation extends React.PureComponent {
    componentWillMount() {
        // this.props.init();
    }
    render() {
        const {thirdChartData:chartData,handleWebViewLoad} = this.props;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ExChart
                    opt={{ type: 'normal-line' }}
                    chartOption={chartData.option}
                    data={chartData.data}
                    width={'100%'}
                    minHeight={350}
                    // onClick={this.handleClick}
                    onLoadEnd={handleWebViewLoad.bind(this,'thirdChartData',true)}
                />
            </View>
        );
    }
}
Activation = connect(state=>{
    const {thirdChartData} = state['home'];
    return {thirdChartData};
},dispatch=>({
    init(){
        dispatch(action.loadThirdChart());
    }
}))(Activation);
export default Activation;

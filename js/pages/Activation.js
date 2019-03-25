import React from 'react';
import { Text, View,Image } from 'react-native';
import ExChart from '../components/ExChart';
import {connect} from 'react-redux';
import action from '../actions/home';
import {withNavigation} from 'react-navigation';

class Activation extends React.PureComponent {
    componentWillMount() {
        // this.props.init();
    }
    handleClick = (e) => {
        const time = e.name,value = e.value,country = this.props.selectedCountry;
        this.props.reHref(time,value,country,this.props.navigation.navigate);
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
                    onPress={this.handleClick}
                    onLoadEnd={handleWebViewLoad.bind(this,'thirdChartData',true)}
                />
            </View>
        );
    }
}
Activation = connect(state=>{
    const {thirdChartData,selectedCountry} = state['home'];
    return {thirdChartData,selectedCountry};
},dispatch=>({
    init(){
        dispatch(action.loadThirdChart());
    },
    reHref(time,value,country,f){
        dispatch({type:'APP_SWITCH_PAGE',activePage:41});
        f('MasterPage',{activePage:'Dashboard3',time,value,country})
    }
}))(Activation);
export default withNavigation(Activation);

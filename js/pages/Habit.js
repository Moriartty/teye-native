import React from 'react';
import { Text, View,Image } from 'react-native';
import ExChart from '../components/ExChart';
import {connect} from 'react-redux';
import action from '../actions/home';
import {withNavigation} from 'react-navigation';

class Habit extends React.PureComponent {
    componentWillMount() {
        // this.props.init();
    }

    handleClick = (e) => {
        const time = e.name,type = e.seriesName,country = this.props.selectedCountry;
        this.props.reHref(time,type,country,this.props.navigation.navigate);
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
                    onPress={this.handleClick}
                    onLoadEnd={handleWebViewLoad.bind(this,'fourthChartData',true)}
                />
            </View>
        );
    }
}
Habit = connect(state=>{
    const {fourthChartData,selectedCountry} = state['home'];
    return {fourthChartData,selectedCountry};
},dispatch=>({
    init(){
        dispatch(action.loadFourthChart());
    },
    reHref(time,type,country,f){
        dispatch({type:'APP_SWITCH_PAGE',activePage:40});
        f('MasterPage',{activePage:'Dashboard2',time,type,country})
    }
}))(Habit);
export default withNavigation(Habit);

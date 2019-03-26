import React from 'react';
import { Text, View,Image } from 'react-native';
import ExChart from '../components/ExChart';
import {connect} from 'react-redux';
import action from '../actions/home'
import {withNavigation} from 'react-navigation';

class PainPoint extends React.PureComponent {
    componentWillMount() {
        // this.props.init();
    }
    handleClick = (e) => {
        const time = e.name,value = e.value,country = this.props.selectedCountry;
        this.props.reHref(time,value,country,this.props.navigation.navigate);
    }
    render() {
        const {secondChartData:chartData,handleWebViewLoad} = this.props;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ExChart
                    opt={{ type: 'customized-pie' }}
                    data={chartData.data}
                    chartOption={chartData.option}
                    width={'100%'}
                    minHeight={380}
                    onPress={this.handleClick}
                    onLoadEnd={handleWebViewLoad.bind(this,'secondChartData',true)}
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
    },
    reHref(time,value,country,f){
        dispatch({type:'APP_SWITCH_PAGE',activePage:42});
        f('MasterPage',{activePage:'Dashboard4',time,value,country})
    }
}))(PainPoint);
export default withNavigation(PainPoint);

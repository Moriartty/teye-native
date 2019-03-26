
import React from 'react';
import {View,StyleSheet,Text,Picker} from 'react-native';
import {connect} from 'react-redux';
import action from '../actions/home';
import UserPortrait from './UserPortrait';
import PainPoint from './PainPoint';
import Activation from './Activation';
import Habit from './Habit';
import Duration from './Duration';
import theme from '../config/theme';
import {Carousel} from '@ant-design/react-native';
import LoadingScreen from '../components/LoadingScreen';

class Others extends React.Component{
    componentWillMount() {
        this.props.init();
    }
    render(){
        const {first,second,third,fourth,fifth,webViewLoad} = this.props;
        return (
            <View style={styles.othersContainer}>
                {/*<View style={{ height: 100, width: '100%',flex:1,justifyContent:'center',marginTop:30}}>*/}
                    {/*<Picker*/}
                        {/*selectedValue={'java'}*/}
                        {/*style={{ height: 50 }}*/}
                        {/*// onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}*/}
                    {/*>*/}
                        {/*<Picker.Item label="Java" value="java" />*/}
                        {/*<Picker.Item label="JavaScript" value="js" />*/}
                    {/*</Picker>*/}
                {/*</View>*/}
                <Carousel
                    style={styles.wrapper}
                    selectedIndex={0}
                    // autoplay
                >
                    <LoadingScreen style={styles.subWrapper} show={!(JSON.stringify(first.option)!=='{}'&&first.webViewLoad)}>
                        <UserPortrait handleWebViewLoad={webViewLoad}/>
                    </LoadingScreen>
                    <LoadingScreen style={styles.subWrapper} show={!(second.data&&second.data.length&&second.webViewLoad)}>
                        <PainPoint handleWebViewLoad={webViewLoad}/>
                    </LoadingScreen>
                    <LoadingScreen style={styles.subWrapper} show={!(third.data&&third.data.length&&third.webViewLoad)}>
                        <Activation handleWebViewLoad={webViewLoad}/>
                    </LoadingScreen>
                    <LoadingScreen style={styles.subWrapper} show={!(fourth.data&&fourth.data.length&&fourth.webViewLoad)}>
                        <Habit handleWebViewLoad={webViewLoad}/>
                    </LoadingScreen>
                    <LoadingScreen style={styles.subWrapper} show={!(fifth.data&&fifth.data.length&&fifth.webViewLoad)}>
                        <Duration handleWebViewLoad={webViewLoad}/>
                    </LoadingScreen>
                </Carousel>
            </View>
        )
    }
}

Others = connect(state=>{
    const {mapType,firstChartData:first,secondChartData:second,thirdChartData:third,fourthChartData:fourth,fifthChartData:fifth} = state['home'];
    return {mapType,first,second,third,fourth,fifth};
},dispatch=>({
    init(){
        dispatch(action.loadFirstChart());
        dispatch(action.loadSecondChart());
        dispatch(action.loadThirdChart());
        dispatch(action.loadFourthChart());
        dispatch(action.loadFifthChart());
    },
    webViewLoad(key,value){
        dispatch({type:'HOME_WEBVIEW_LOAD',key,value});
    }
}))(Others);

const styles = StyleSheet.create({
    othersContainer:{
        // backgroundColor:theme["primary-color"],
        width:'100%',
        height:'100%',
        flex:1,
        flexDirection:'column',
        justifyContent:'center'
    },
    wrapper: {

    },
    subWrapper:{
        width:'100%',
        height:'100%',
        // flex:1,
        justifyContent:'center'
    },
    containerHorizontal: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
    },
})

export default Others;

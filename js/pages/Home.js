
import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
import {connect} from 'react-redux';
import action from '../actions/home';
import WorldMap from './WorldMap';
import BubbleChart from './BubbleChart';
import theme from '../config/theme';
import {Carousel} from '@ant-design/react-native';
import LoadingScreen from '../components/LoadingScreen';

class Home extends React.Component{
    componentWillMount() {
        this.props.init();
    }
    render(){
        const {mapChartData,bubbleChartData,webViewLoad} = this.props;
        return (
            <View style={styles.homeContainer}>
                <Carousel
                    style={styles.wrapper}
                    selectedIndex={0}
                    // infinite
                    // afterChange={this.onHorizontalSelectedIndexChange}
                >
                    <LoadingScreen
                        style={styles.subWrapper}
                        // data={mapChartData.data}
                        show={!(mapChartData.data&&mapChartData.data.length&&mapChartData.webViewLoad)}
                        loadingStyle={{size:'large',color:'white'}}
                    >
                        <WorldMap handleWebViewLoad={webViewLoad}/>
                    </LoadingScreen>
                    <LoadingScreen
                        style={styles.subWrapper}
                        // data={bubbleChartData.data}
                        show={!(bubbleChartData.data&&bubbleChartData.data.length&&bubbleChartData.webViewLoad)}
                        loadingStyle={{size:'large',color:'white'}}
                    >
                        <BubbleChart handleWebViewLoad={webViewLoad}/>
                    </LoadingScreen>
                </Carousel>
            </View>
        )
    }
}

Home = connect(state=>{
    const {mapType,mapChartData,bubbleChartData} = state['home'];
    return {mapType,mapChartData,bubbleChartData};
},dispatch=>({
    init(){
        // setTimeout(function () {
        //     dispatch(action.loadMap());
        //     dispatch(action.loadBubble());
        // },5000)
        dispatch(action.loadMap());
        dispatch(action.loadBubble());
    },
    webViewLoad(key,value){
        dispatch({type:'HOME_WEBVIEW_LOAD',key,value});
    }
}))(Home);

const styles = StyleSheet.create({
    homeContainer:{
        backgroundColor:theme["primary-color"],
        width:'100%',
        height:'100%',
        flex:1,
        justifyContent:'center'
    },
    wrapper: {
        // width:'100%',
        // height:400
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

export default Home;

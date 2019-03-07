import React from 'react';
import {View,WebView,StyleSheet,Alert} from 'react-native';
import {connect} from 'react-redux';
import {patchPostMessageJsCode,findTargetMenu} from "../utils";
import Dashboard from '../pages/Dashboard';
import StreamView from '../pages/StreamView';
import HomeScreen from '../pages/HomeScreen';



class MasterPage extends React.Component{
    static navigationOptions = ({navigation})=>{
        return {
            title:navigation.getParam('activePage','TEYE')
        }
    }
    constructor(props){
        super(props);
        this.moduleMap = {
            _dashboard:<Dashboard/>,
            _streamView:<StreamView/>
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.activePage!==nextProps.activePage){
            this.props.switchPage()
        }
    }


    render(){
        const {activePage,switchPage,menu} = this.props;
        const pageModule = findTargetMenu(menu,activePage).module;
        const Content = this.moduleMap[pageModule];
        return (
            <View style={styles.masterPage}>
                {Content}
                {/*<WebView*/}
                    {/*source={{uri:'http://18.222.66.96/big-data2/'+pageModule+'.html'}}*/}
                    {/*startInLoadingState={false}*/}
                    {/*domStorageEnabled={true}*/}
                    {/*injectedJavaScript={patchPostMessageJsCode}*/}
                    {/*onMessage={switchPage}*/}
                    {/*// ref={el=>(this.webView = el)}*/}
                {/*/>*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    masterPage:{
        width:'100%',
        height:'100%'
    }
})

MasterPage = connect(state=>{
    const {activePage,menu} = state['app'];
    return {activePage,menu};
},dispatch=>({
    // switchPage(e){
    //     dispatch({type:'APP_SWITCH_PAGE',activePage:e.nativeEvent.data})
    // }
}))(MasterPage);

export default MasterPage;

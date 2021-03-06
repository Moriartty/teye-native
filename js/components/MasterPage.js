import React from 'react';
import {View,WebView,StyleSheet,Alert,Text,Picker} from 'react-native';
import {connect} from 'react-redux';
import {patchPostMessageJsCode,findTargetMenu} from "../utils";
import Dashboard from '../pages/Dashboard';
import StreamView from '../pages/StreamView';
import Conversions from '../pages/Conversions';
import Dashboard2 from '../pages/Dashboard2';
import Dashboard3 from '../pages/Dashboard3';
import Dashboard4 from '../pages/Dashboard4';
import LoadingScreen from '../components/LoadingScreen';


class MasterPage extends React.Component{
    static navigationOptions = ({navigation})=>{
        return {
            title:navigation.getParam('activePage','TEYE')
        }
    }
    constructor(props){
        super(props);
        const params = this.props.navigation.state.params;
        const {webViewLoad} = this.props;
        this.moduleMap = {
            _dashboard:<Dashboard switchPage={this.reHref} handleWebViewLoad={webViewLoad}/>,
            _streamView:<StreamView handleWebViewLoad={webViewLoad}/>,
            _conversions:<Conversions handleWebViewLoad={webViewLoad}/>,
            _dashboard2:<Dashboard2 {...params} handleWebViewLoad={webViewLoad}/>,
            _dashboard3:<Dashboard3 {...params} handleWebViewLoad={webViewLoad}/>,
            _dashboard4:<Dashboard4 {...params} handleWebViewLoad={webViewLoad}/>
        }
    }
    reHref = (e) => {
        const {menu,switchPage,navigation} = this.props;
        switchPage(e.nativeEvent.data,navigation.push,findTargetMenu(menu,e.nativeEvent.data).name);
    }
    shouldComponentUpdate(nextProps){
        if(nextProps.activePage=='')
            return false;
        else
            return true;
    }


    render(){
        const {activePage,switchPage,menu} = this.props;
        const pageModule = findTargetMenu(menu,activePage).module;
        const Content = this.moduleMap[pageModule];
        const pageData = this.props[pageModule.split('_')[1]];
        return (
            <View style={styles.masterPage}>
                <LoadingScreen style={styles.subWrapper} show={pageData?!(pageData.webViewLoad):true}>
                {Content}
                </LoadingScreen>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    masterPage:{
        width:'100%',
        height:'100%',
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    subWrapper:{
        width:'100%',
        height:'100%',
        // justifyContent:'center'
    }
});

MasterPage = connect(state=>{
    const {activePage,menu} = state['app'];
    const {dashboard,streamView,conversions,dashboard2,dashboard3,dashboard4} = state['master'];
    return {activePage,menu,dashboard,streamView,conversions,dashboard2,dashboard3,dashboard4};
},dispatch=>({
    switchPage(id,f,module){
        dispatch({type:'APP_SWITCH_PAGE',activePage:id});
        f('MasterPage',{activePage:module})
    },
    webViewLoad(key,value){
        dispatch({type:'MASTER_WEBVIEW_LOAD',key,value});
    }
}))(MasterPage);

export default MasterPage;

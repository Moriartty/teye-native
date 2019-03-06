import React from 'react';
import {View,WebView,StyleSheet,Alert} from 'react-native';
import {connect} from 'react-redux';
import {patchPostMessageJsCode,findTargetMenu} from "../utils";


class MasterPage extends React.Component{
    static navigationOptions = ({navigation})=>{
        return {
            title:navigation.getParam('activePage','TEYE')
        }
    }
    constructor(props){
        super(props);
    }

    componentWillMount() {
        // console.log('webview',this.webView)
    }

    render(){
        const {activePage,switchPage,menu} = this.props;
        const pageModule = findTargetMenu(menu,activePage).module;
        return (
            <View style={styles.masterPage}>
                <WebView
                    source={{uri:'http://18.222.66.96/big-data2/'+pageModule+'.html'}}
                    startInLoadingState={false}s
                    domStorageEnabled={true}
                    injectedJavaScript={patchPostMessageJsCode}
                    onMessage={switchPage}
                    // ref={el=>(this.webView = el)}
                />
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
    switchPage(e){
        dispatch({type:'APP_SWITCH_PAGE',activePage:e.nativeEvent.data})
    }
}))(MasterPage);

export default MasterPage;

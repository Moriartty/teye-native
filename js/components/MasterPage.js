import React from 'react';
import {View,WebView,StyleSheet,Alert} from 'react-native';
import {connect} from 'react-redux';


const patchPostMessageFunction = () => {
    const originalPostMessage = window.postMessage;

    const patchedPostMessage = (message, targetOrigin, transfer) => {
        originalPostMessage(message, targetOrigin, transfer);
    };

    patchedPostMessage.toString = () => String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');

    window.postMessage = patchedPostMessage;
};

const patchPostMessageJsCode = `(${String(patchPostMessageFunction)})();`;

class MasterPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {activePage,switchPage} = this.props;
        return (
            <View style={styles.masterPage}>
                <WebView
                    source={{uri:'http://18.222.66.96/big-data2/'+activePage+'.html'}}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    injectedJavaScript={patchPostMessageJsCode}
                    onMessage={switchPage}
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
    const {activePage} = state['app'];
    return {activePage};
},dispatch=>({
    switchPage(e){
        dispatch({type:'APP_SWITCH_PAGE',activePage:e.nativeEvent.data})
    }
}))(MasterPage);

export default MasterPage;

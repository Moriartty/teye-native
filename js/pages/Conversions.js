import React from 'react';
import {WebView} from 'react-native';
import {patchPostMessageJsCode} from "../utils";

class Conversions extends React.Component{
    render(){
        const {switchPage,handleWebViewLoad} = this.props;
        return (
            <WebView
                source={{uri:'http://18.222.66.96/big-data2/_conversions.html'}}
                startInLoadingState={false}
                domStorageEnabled={true}
                onLoadEnd={handleWebViewLoad.bind(this,'conversions',true)}
                injectedJavaScript={patchPostMessageJsCode}
                onMessage={switchPage}
            />
        )
    }
}

export default Conversions;



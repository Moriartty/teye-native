import React from 'react';
import {WebView} from 'react-native';
import {patchPostMessageJsCode} from "../utils";

class StreamView extends React.Component{
    render(){
        const {handleWebViewLoad} = this.props;
        return (
            <WebView
                source={{uri:'http://18.222.66.96/big-data2/_streamView.html'}}
                startInLoadingState={false}
                domStorageEnabled={true}
                onLoadEnd={handleWebViewLoad.bind(this,'streamView',true)}
                // injectedJavaScript={patchPostMessageJsCode}
                // onMessage={switchPage}
                // ref={el=>(this.webView = el)}
            />
        )
    }
}

export default StreamView;



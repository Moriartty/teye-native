import React from 'react';
import {WebView} from 'react-native';
import {patchPostMessageJsCode} from "../utils";

class Dashboard2 extends React.Component{

    // componentDidMount() {
    //     const params = this.props;
    //     console.log(this.webView);
    //     this.webView.postMessage(JSON.stringify(params));
    // }
    // recMessage = (e) => {
    //     console.logo('bbb');
    // }
    render(){
        const {handleWebViewLoad} = this.props;
        return (
            <WebView
                source={{uri:'http://18.222.66.96/big-data2/_dashboard2.html'}}
                startInLoadingState={false}
                domStorageEnabled={true}
                injectedJavaScript={patchPostMessageJsCode}
                onLoadEnd={handleWebViewLoad.bind(this,'dashboard2',true)}
                // onMessage={this.recMessage}
                ref={el=>this.webView = el}
            />
        )
    }
}

export default Dashboard2;


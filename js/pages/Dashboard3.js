import React from 'react';
import {WebView} from 'react-native';
import {patchPostMessageJsCode} from "../utils";

class Dashboard3 extends React.Component{

    componentDidMount() {
        const params = this.props;
        // console.log(this.webView,JSON.stringify(params));
        // setTimeout(()=>this.refs.test.postMessage(JSON.stringify(params)),5000);
    }
    recMessage = (e) => {
        console.log(e.nativeEvent.data);
    }
    render(){
        const {handleWebViewLoad} = this.props;
        return (
            <WebView
                source={{uri:'http://18.222.66.96/big-data2/_dashboard3.html'}}
                startInLoadingState={false}
                domStorageEnabled={true}
                injectedJavaScript={patchPostMessageJsCode}
                onLoad={()=>this.refs.dashboard3.postMessage(JSON.stringify(this.props))}
                onLoadEnd={handleWebViewLoad.bind(this,'dashboard3',true)}
                onMessage={this.recMessage}
                ref={'dashboard3'}
            />
        )
    }
}

export default Dashboard3;


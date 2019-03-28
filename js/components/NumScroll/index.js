import React, { Component } from 'react';
import {WebView, View, Platform} from 'react-native';
const iosPlatform = Platform.OS === 'ios'?true:false;

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeNum:parseInt((Math.random() + 2) * 10000000)
        }
    }

    componentDidMount() {
        this.numInterval = setInterval(() => {
            let temp = this.state.activeNum;
            this.setState({ activeNum: parseInt((Math.random() - 0.1) * 100 + temp) });
            this.refs.numScroll.postMessage(JSON.stringify(temp));
        }, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.numInterval)
    }

    render() {
        const {width,height} = this.props;
        return (
            <View style={{width:width,height:height}}>
                <WebView
                    ref={'numScroll'}
                    source={iosPlatform?require('./numscroll_tpl.html'):{uri:'file:///android_asset/numscroll_tpl.html'}}
                    style={{
                        height: height || 400,
                        // backgroundColor: this.props.backgroundColor || 'transparent'
                        backgroundColor:'transparent'
                    }}
                    injectedJavaScript={`
                        NumScroll('#dataNums', {
                            deVal: parseInt("${this.state.activeNum}")
                        });
                        if(${iosPlatform}){
                            $('.dataNums .dataOne').css({'width':'4rem','height':'6rem'});
                            $('.dataNums .tt span').css({'font':'bold 4rem/6rem "Arial"',color:'#ffc53d'});
                            $('p.title').css('font','bold 3rem/4rem "Arial"');
                        }
                         NumScroll('#dataNums', {
                            deVal: parseInt("${this.state.activeNum}")
                        });

                    `}
                />
            </View>
        );
    }
}

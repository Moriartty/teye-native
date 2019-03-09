import React from 'react';
import {View,WebView,StyleSheet,Alert} from 'react-native';
import {connect} from 'react-redux';
import {patchPostMessageJsCode,findTargetMenu} from "../utils";
import Dashboard from '../pages/Dashboard';
import StreamView from '../pages/StreamView';


class MasterPage extends React.Component{
    static navigationOptions = ({navigation})=>{
        return {
            title:navigation.getParam('activePage','TEYE')
        }
    }
    constructor(props){
        super(props);
        this.moduleMap = {
            _dashboard:<Dashboard switchPage={props.switchPage}/>,
            _streamView:<StreamView/>
        }
    }


    render(){
        const {activePage,switchPage,menu} = this.props;
        const pageModule = findTargetMenu(menu,activePage).module;
        const Content = this.moduleMap[pageModule];
        return (
            <View style={styles.masterPage}>
                {Content}
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
        const module = e.nativeEvent.data;
        dispatch({type:'APP_SWITCH_PAGE',activePage:38})
    }
}))(MasterPage);

export default MasterPage;

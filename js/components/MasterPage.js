import React from 'react';
import {View,WebView,StyleSheet,Alert} from 'react-native';
import {connect} from 'react-redux';
import {patchPostMessageJsCode,findTargetMenu} from "../utils";
import Dashboard from '../pages/Dashboard';
import StreamView from '../pages/StreamView';
import Conversions from '../pages/Conversions';


class MasterPage extends React.Component{
    static navigationOptions = ({navigation})=>{
        return {
            title:navigation.getParam('activePage','TEYE')
        }
    }
    constructor(props){
        super(props);
        this.moduleMap = {
            _dashboard:<Dashboard switchPage={this.reHref}/>,
            _streamView:<StreamView/>,
            _conversions:<Conversions/>
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
    switchPage(id,f,module){
        dispatch({type:'APP_SWITCH_PAGE',activePage:id});
        f('MasterPage',{activePage:module})
    }
}))(MasterPage);

export default MasterPage;

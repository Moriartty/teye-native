import React from 'react';
import { Text, View,Image,Button } from 'react-native';
import {connect} from 'react-redux';
import ExChart from '../components/ExChart';
import Echart from 'native-echarts';
import action from '../actions/home';

const country = '';
var dataMap = {};
function dataFormatter (obj) {
    var pList = ['爱美食', '爱运动', '爱科技', '爱音乐', '爱购物'];
    var temp;
    for (var year = 20; year <= 60; year += 10) {
        var max = 0;
        var sum = 0;
        temp = obj[year];
        for (var i = 0, l = temp.length; i < l; i++) {
            max = Math.max(max, temp[i]);
            sum += temp[i];
            obj[year][i] = {
                name: pList[i],
                value: temp[i]
            };
        }
        obj[year + 'max'] = Math.floor(max / 100) * 100;
        obj[year + 'sum'] = sum;
    }
    return obj;
}

let s = 8;
let temp = [20, 30, 40, 50, 60]; let pi = {}; let si = {};
temp.forEach(function (o) {
    pi[o] = [];
    si[o] = [];
    for (let i = 0; i < 5; i++) {
        pi[o].push(parseInt((Math.random() * 2000) + 1000) * s);
        si[o].push(parseInt((Math.random() * 2000) + 1000) * s);
    }
});
dataMap.dataPI = dataFormatter(pi);
dataMap.dataSI = dataFormatter(si);

let option = {
    baseOption: {
        timeline: {
            // y: 5,
            bottom: -10,
            axisType: 'category',
            symbolSize: 8,
            // realtime: false,
            // loop: false,
            autoPlay: true,
            // currentIndex: 2,
            playInterval: 2000,
            controlStyle: {
                position: 'left',
                // showPlayBtn:false,
                showPrevBtn: false,
                showNextBtn: false
            },
            data: [
                '20', '30', '40', '50', '60'
            ],
            // padding:[20,0],
            label: {
                formatter: function (s) {
                    return s;
                },
                padding: [10, 0]
            }
        },
        title: {
            padding: [10, 10],
            subtext: country,
            subtextStyle: {
                fontWeight: 'bold'
            }
        },
        tooltip: {
        },
        color: ['#13c2c2', '#1890ff'],
        legend: {
            x: 'center',
            data: ['女性', '男性'],
            padding: [15, 10]
        },
        calculable: true,
        grid: {
            left: '18%',
            right: '5%',
            top: 80,
            // bottom: 70,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: {
                        show: true,
                        formatter: function (params) {
                            return params.value.replace('\n', '');
                        }
                    }
                }
            }
        },
        xAxis: [
            {
                'type': 'category',
                'axisLabel': {
                    'interval': 0,
                    // rotate:-30,
                    fontSize: 10
                },
                'data': ['爱美食', '爱运动', '爱科技', '爱音乐', '爱购物'],
                splitLine: { show: false }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '人数(千)'
            }
        ],
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        series: [
            { name: '男性', type: 'bar' },
            { name: '女性', type: 'bar' },
            {
                name: '男女比例',
                type: 'pie',
                center: ['80%', '20%'],
                radius: '20%',
                z: 100,
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        },
                        smooth: 0.2,
                        length: 3,
                        length2: 7
                    }
                }
            }
        ]
    },
    options: [
        {
            title: { text: '20~30岁' },
            series: [
                { data: dataMap.dataPI['20'] },
                { data: dataMap.dataSI['20'] },
                { data: [
                        { name: '男性', value: dataMap.dataPI['20sum'] },
                        { name: '女性', value: dataMap.dataSI['20sum'] }
                    ] }
            ]
        },
        {
            title: { text: '30~40岁' },
            series: [
                { data: dataMap.dataPI['30'] },
                { data: dataMap.dataSI['30'] },
                { data: [
                        { name: '男性', value: dataMap.dataPI['30sum'] },
                        { name: '女性', value: dataMap.dataSI['30sum'] }
                    ] }
            ]
        },
        {
            title: { text: '40~50岁' },
            series: [
                { data: dataMap.dataPI['40'] },
                { data: dataMap.dataSI['40'] },
                { data: [
                        { name: '男性', value: dataMap.dataPI['40sum'] },
                        { name: '女性', value: dataMap.dataSI['40sum'] }
                    ] }
            ]
        },
        {
            title: { text: '50~60岁' },
            series: [
                { data: dataMap.dataPI['50'] },
                { data: dataMap.dataSI['50'] },
                { data: [
                        { name: '男性', value: dataMap.dataPI['50sum'] },
                        { name: '女性', value: dataMap.dataSI['50sum'] }
                    ] }
            ]
        },
        {
            title: { text: '60岁以上' },
            series: [
                { data: dataMap.dataPI['60'] },
                { data: dataMap.dataSI['60'] },
                { data: [
                        { name: '男性', value: dataMap.dataPI['60sum'] },
                        { name: '女性', value: dataMap.dataSI['60sum'] }
                    ] }
            ]
        }
    ]
};

class UserPortrait extends React.Component {
    componentWillMount() {
        this.props.init();
    }
    handleClick = () => {
        this.props.reHref(this.props.navigation.navigate);
    }
    render() {
        const {firstChartData:chartData} = this.props;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/*<ExChart*/}
                    {/*opt={{ type: 'time-line' }}*/}
                    {/*chartOption={chartData.option}*/}
                    {/*data={['a']}*/}
                    {/*width={'90%'}*/}
                    {/*minHeight={250}*/}
                    {/*// onPress={this.handleClick}*/}
                {/*/>*/}
                <Echart option={option} width={250} height={300}></Echart>
            </View>
        );
    }
}

UserPortrait = connect(state=>{
    const {firstChartData} = state['home'];
    return {firstChartData};
},dispatch=>({
    init(){
        dispatch(action.loadFirstChart());
    },
    reHref(f){
        dispatch({type:'APP_SWITCH_PAGE',activePage:30});
        f('MasterPage',{activePage:'Dashboard'})
    }
}))(UserPortrait);
export default UserPortrait;


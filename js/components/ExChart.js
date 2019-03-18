import React from 'react';
// import Echart from 'native-echarts';
import Echart from './Native-Echart'
import {View} from 'react-native';

// const backgroundColor = 'rgba(0, 0, 0, 0.3)';
const backgroundColor = 'rgba(0, 0, 0, 0.0)';
const maskBgColor = 'rgba(0, 0, 0, 0.1)';
const transparent = 'rgba(0, 0, 0, 0)';
const colors = ['#722ed1', '#13c2c2', '#52c41a', '#1890ff', '#2f54eb', '#722ed1'];

class ExChart extends React.Component{
    constructor(props){
        super(props);
        this.dispatchType = this.dispatchType.bind(this);
        this.options = {};
    }
    dispatchType (props) {
        const { opt, data, chartOption } = props;
        let option = {};
        switch (opt.type) {
            case 'normal-line':// 普通线性图
                option = drawNormalLine(data, chartOption);
                break;
            case 'normal-bar':// 普通条形图
                option = drawNormalBar(data, chartOption);
                break;
            case 'normal-pie':// 普通饼图
                option = drawNormalPie(data, chartOption);
                break;
            case 'common':// 普通图
                option = chartOption;
                break;
            case 'with-bg-pie':// 带纹理的饼图
                option = drawWithBgPie(data, chartOption, this.props.itemStyle);
                break;
            case 'horizontal-bar':// 横向条形图
                option = drawHorizontalBar(data, chartOption);
                break;
            case 'horizontal-stack-bar':// 横向堆积条形图
                option = drawHorizontalStackBar(data, chartOption);
                break;
            case 'horizontal-stack-card-bar':// 横向堆积条形图-面板card
                option = drawHorizontalStackCardBar(data, chartOption);
                break;
            case 'customized-pie':
                option = drawCustomizedPie(data, chartOption);
                break;
            case 'heat-map': //热力地图
                option = drawHeatMap(data,chartOption,option.selectedCountry);
                break;
            case 'radar-chart': //雷达图
                option = drawRadarChart(data, chartOption);
                break;
            case 'time-line': //时间轴图
                option = drawTimeLineChart(data, chartOption);
                break;
            case 'le-chart':
                // this.chart.setOption(data);
                option = drawBubbleChart(data,chartOption);
                break;
            case 'region-map':
                option = drawRegionMap(data,chartOption,this.props.country,option.mapJsonData);
                break;
        }
        this.options = option;
    }

    // componentWillMount() {
    //     console.log('props1',this.props);
    //     this.dispatchType(this.props)
    // }

    componentWillReceiveProps(nextProps) {
        // console.log('props2',nextProps);
        this.dispatchType(nextProps)
    }

    render () {
        const { minHeight, width , onPress} = this.props;
        // let clientWidth = document.body.clientWidth;
        if(JSON.stringify(this.options)!=='{}'){
            return (
                <Echart option={this.options} width={width||400} height={minHeight||500} onPress={onPress}></Echart>
            );
        }else
            return <View></View>;
    }
}

/**
 * 绘制普通饼图
 * */
function drawNormalPie (data, option) {
    if (!option.legendData) {
        option.legendData = data.map(function (o) {
            return o.name;
        });
    }
    let opt = {
        title: {
            text: option.title,
            subtext: option.subTitle,
            x: 'center'
        },
        backgroundColor: option.backgroundColor ||backgroundColor,
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: option.legend||{
            orient: 'vertical',
            left: 'left',
            data: option.legendData
        },
        series: option.series||[
            {
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                data: data
            }
        ]
    };
    return opt;
}

/**
 * 玫瑰图
 */
function drawCustomizedPie (data, option) {
    return {
        backgroundColor: backgroundColor,

        title: {
            text: option.title,
            left: 'center',
            top: 15,
            textStyle: {
                color: '#000'
            }
        },
        // grid: {
        //     left: '5%',
        //     right: '5%',
        //     bottom: '10%',
        //     containLabel: true
        // },

        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: data.sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(0, 0, 0, 1)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(0, 0, 0, 1)'
                        },
                        smooth: 0.2,
                        length: 5,
                        length2: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#c41d7f',
                        // shadowBlur: 200,
                        // shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };
}

/**
 * 绘制普通线性图
 * */
function drawNormalLine (data, option) {
    let opt = {
        grid: option.grid || {
            left: '2%',
            right: '4%',
            bottom: '5%',
            containLabel: true
        },
        title: {
            text: option['title.text'],
            left: 'center',
            padding: [20, 0],
            show: option['title.show']!=undefined?option['title.show']:true
        },
        tooltip: option.tooltip||{
            trigger: 'axis'
        },
        color: ['#40a9ff'],
        xAxis: {
            type: 'category',
            data: option['xAxis.data']
        },
        yAxis: {
            'type':option['yAxis.type']||'value',
            axisLabel: {
                rotate: option['yAxis.axisLabel.rotate'] || 0,
                interval: option['yAxis.axisLabel.interval'] || 0
            },
            show:option['yAxis.show']!=undefined?option['yAxis.show']:true,
            axisLine:{
                show:option['yAxis.axisLine.show']!=undefined?option['yAxis.axisLine.show']:true
            },
            splitLine:{
                show:option['yAxis.splitLine.show']!=undefined?option['yAxis.splitLine.show']:true
            },
            'axisLabel.rotate':45,
        },
        smooth:true,
        backgroundColor: option.backgroundColor || backgroundColor,
        series: []
    };
    if (option.multiple) {
        opt.legend = option.legend;
        opt.color = option.color || colors;
    }
    data.forEach(function (o, i) {
        opt.series.push({
            // name: option.multiple ? opt.legend.data[i] : '',
            data: o,
            type: 'line',
            areaStyle: option.area,
            itemStyle:{
                lineStyle:{
                    type:'solid'
                }
            }
        });
    });
    return opt;
}
/**
 * 绘制普通条形图
 * */
function drawNormalBar (data, option) {
    return {
        title: {
            show: option['title.show']!=undefined?option['title.show']:true,
            text: option['title.text'],
            left: option['title.left'] || 'center',
            top: option['title.top'],
            padding: option['title.padding'] || [20, 0],
            textStyle: option['title.textStyle'] || {},
            subtext: option.subTitle
        },
        color: option.color || ['#36cfc9'],
        tooltip: option.tooltip || {
            trigger: 'axis'
        },
        xAxis: {
            data: option['xAxis.data']||[],
            axisLabel: {
                rotate: option['xAxis.axisLabel.rotate'] || 0,
                interval: option['xAxis.axisLabel.interval'] || 0,
                color:option['xAxis.nameTextStyle.color']
            },
            show: option['xAxis.show'] !== undefined ? option['xAxis.show']:true
        },
        yAxis: option.yAxis||{},
        series: [{
            type: 'bar',
            data: data
        }],
        grid: option.grid || {
            left: '5%',
            right: '8%',
            bottom: '10%',
            containLabel: true
        },
        backgroundColor: option.backgroundColor || backgroundColor
    };
}
/**
 * 绘制横向条形图
 * */
function drawHorizontalBar (data, option) {
    if (option.series.length > 0){
        return option;
    }
    let series = [];
    option.legendData.forEach(function (o, i) {
        series.push({
            name: o,
            type: 'bar',
            data: data[i]
        });
    });
    let opt = {
        title: {
            text: option.title,
            padding: [15, 10]
            // subtext: option.subTitle
        },
        color: ['#096dd9', '#40a9ff'],
        backgroundColor: backgroundColor,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            x: 'right',
            data: option.legendData,
            padding: [15, 10]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: option.yAxis
        },
        series: series
    };
    return opt;
}

/**
 * 绘制横向堆积条形图
 */
function drawHorizontalStackBar (data, option) {
    let series = [];
    option.legendData.forEach(function (o, i) {
        series.push({
            name: o,
            type: 'bar',
            stack: '占比',
            data: data[i]
        });
    });
    let opt = {
        title: {
            text: option['title.text']||'',
            padding: [15, 10],
            x: option['title.x']||'center',
            subtext: option['title.subText']||undefined,
            subtextStyle: {
                fontSize: 14,
                fontWeight: 'bold',
                fontColor: 'white'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        color: ['#faad14', '#13c2c2', '#52c41a', '#1890ff', '#2f54eb', '#722ed1'],
        legend: {
            data: option.legendData,
            x: 'center',
            y: 'bottom'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: option['yAxis.type'],
            data: option['yAxis.data']
        },
        backgroundColor: option.backgroundColor||backgroundColor,
        series: series
    };
    return opt;
}
/**
 * 绘制横向堆积条形图
 */
function drawHorizontalStackBar (data, option) {
    let series = [];
    option.legendData.forEach(function (o, i) {
        series.push({
            name: o,
            type: 'bar',
            stack: '占比',
            data: data[i]
        });
    });
    let opt = {
        title: {
            text: option['title.text']||'',
            padding: [15, 10],
            x: option['title.x']||'center',
            subtext: option['title.subText']||undefined,
            subtextStyle: {
                fontSize: 14,
                fontWeight: 'bold',
                fontColor: 'white'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        color: ['#faad14', '#13c2c2', '#52c41a', '#1890ff', '#2f54eb', '#722ed1'],
        legend: {
            data: option.legendData,
            x: 'center',
            y: 'bottom'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: option['yAxis.type'],
            data: option['yAxis.data']
        },
        backgroundColor: option.backgroundColor||backgroundColor,
        series: series
    };
    return opt;
}
/**
 * 绘制横向堆积条形图
 */
function drawHorizontalStackCardBar (data, option) {
    let series = [];
    option.legendData.forEach(function (o, i) {
        series.push({
            name: o,
            type: 'bar',
            stack: '占比',
            barWidth:17,
            data: data[i]
        });
    });
    let opt = {
        title: {
            text: option['title.text']||'',
            padding: [5, 0],
            x: option['title.x']||'center',
            // subtext: option.title,
            textStyle: {
                fontSize: 12,
                fontWeight: 'normal',
                color: 'black'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        color: ['#faad14', '#13c2c2', '#52c41a', '#1890ff', '#2f54eb', '#722ed1'],
        legend: {
            data: option.legendData,
            x: 'center',
            itemGap:25,
            textStyle: {
                fontSize: 14,
                color: 'black'
            },
            bottom:10
        },
        grid: {
            top:'0%',
            left: '3%',
            right: '4%',
            bottom: '0%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            show:false
        },
        yAxis: {
            show:false,
            type: option['yAxis.type'],
            data: option['yAxis.data'],
            nameTextStyle:{
                color:'black'
            }
        },
        backgroundColor: option.backgroundColor||backgroundColor,
        series: series
    };
    return opt;
}
/**
 * 绘制带背景纹理的饼图
 * */
function drawWithBgPie (data, option, itemStyle) {
    let opt = {
        title: {
            text: option.title,
            textStyle: {
                color: '#235894'
            }
        },
        tooltip: {},
        series: [{
            name: 'pie',
            type: 'pie',
            selectedMode: 'multiple',
            selectedOffset: 30,
            clockwise: true,
            label: {
                normal: {
                    textStyle: {
                        fontSize: 18,
                        color: '#235894'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: '#235894'
                    }
                }
            },
            data: data,
            itemStyle: itemStyle
        }]
    };
    return opt;
}

/**
 * 绘制热力地图
 * @param data
 * @param option
 * @returns {{title: {text: string, left: string, top: string, padding: number[], textStyle: {color: string}}, backgroundColor: string, visualMap: {min: number, max: number, splitNumber: number, inRange: {color: string[]}, textStyle: {color: string}}, geo: {map: string, label: {emphasis: {show: boolean, color: string}}, roam: boolean, zoom: number, itemStyle: {normal: {borderColor: string, areaColor: string}, emphasis: {areaColor: string}}, shadowColor: string, shadowBlur: number}, series: {name: string, type: string, coordinateSystem: string, data: *, symbolSize: number}[]}}
 */
function drawHeatMap (data, option,selectedCountry) {
    let opt = {
        title: {
            text: 'ROM全球用户分布图（热点图）',
            // subtext: 'data from PM25.in',
            // sublink: 'http://www.pm25.in',
            left: 'center',
            top: 'bottom',
            padding: [20, 0],
            textStyle: {
                color: '#fff'
            },
            show:option.title&&option.title.show!==undefined?option.title.text:true
        },
        backgroundColor: 'rgba(0,0,0,0)',
        grid: {
            left: '2%',
            right: '2%',
            bottom: '2%',
            top:'0%',
            containLabel: true
        },
        visualMap: option.visualMap||{
            min: 0,
            max: 800,
            splitNumber: 5,
            inRange: {
                color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
            },
            textStyle: {
                color: '#fff'
            },
            itemWidth:10,
            itemHeight:100,
            bottom:'15%',
            calculable: true,
            show:true
        },
        tooltip: {
            trigger: 'item',
            // axisPointer: { // 坐标轴指示器，坐标轴触发有效
            //     type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            // }
            formatter: function (params) {
                return params.name+':'+params.value;
            }
        },
        geo: option.useGeo?{
            map: 'world',
            selectedMode: 'single',
            label: {
                emphasis: {
                    show: true,
                    color: 'white'
                }
            },
            roam: false,
            zoom: 1.2,
            itemStyle: {
                normal: {
                    // areaColor: '#323c48',
                    borderColor: '#096dd9',
                    // borderWidth:1,
                    areaColor: '#002766'
                    // borderColor:''
                },
                emphasis: {
                    // areaColor: '#2a333d'
                    areaColor: '#40a9ff',
                }
            },
            shadowColor: 'rgba(0, 0, 0, 1)',
            shadowBlur: 10,
            regions: [{
                name: selectedCountry,
                selected:true,
                // itemStyle: {
                //     // areaColor: '#40a9ff',
                //     // color: 'red'
                // }
            }]
        }:undefined,
        series: [{
            name: 'AQI',
            type: option.type?option.type:'scatter',
            coordinateSystem: option.useGeo?'geo':undefined,
            map:'world',
            data:data,
            symbolSize: 15,
            itemStyle:{
                emphasis: {
                    // areaColor: '#2a333d'
                    areaColor: '#40a9ff',
                }
            },
        }]
    };
    return opt;
}

/**
 * 雷达图
 * @param data
 * @param option
 * @returns {{title: {text: string}, tooltip: {}, legend: {data: string[]}, radar: {name: {textStyle: {color: string, backgroundColor: string, borderRadius: number, padding: number[]}}, indicator: *[]}, series: *[]}}
 */
function drawRadarChart (data, option) {
    return {
        title: {
            text: option.title,
            padding: [10, 10]
        },
        tooltip: {},
        legend: {
            x: 'right',
            data: option.legend,
            padding: [10, 10]
        },
        color: ['#1890ff', '#13c2c2'],
        radar: {
            // shape: 'circle',
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            indicator: option.indicator
        },
        series: [{
            // name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: data
        }],
        backgroundColor: backgroundColor
    };
}

/**
 * Time-Line Chart
 */
function drawTimeLineChart (data, option) {
    return option;
}

/**
 * Bubble-Chart
 */
function drawBubbleChart (data, option) {
    let opt = {
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        xAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
            type:'time'
            // show: false
        },
        yAxis: {
            name:'销量(万)',
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                },
                show:false
            },
            scale: true,
            // show: false
        },
        tooltip : {
            trigger: 'item',
            formatter: function (params) {
                const data = params.data;
                return params.seriesName+'<br/>'+'发布日期:'+data[0]+'<br/>'+'销量:'+data[1]+'万';
            }
        },
        grid: {
            top:'7%',
            left: '2%',
            right: '5%',
            bottom: '6%',
            containLabel: true
        },
        series: []
    };
    data.forEach(function (o, i, arr) {
        opt.series.push({
            name: o[0][3],
            data: data[i],
            type: 'scatter',
            symbolSize: function (data) {
                return data[2];
            },
            symbol:o[0][5]?'image://'+o[0][5]:'circle',
            label: {
                // emphasis: {
                //     show: true,
                //     formatter: function (param) {
                //         return param.data[3];
                //     },
                //     position: 'top'
                // },
                normal: {
                    show: false,
                    formatter: function (param) {
                        return param.data[3];
                    },
                    fontWeight: 'bold',
                    position: 'inside'
                }
            },
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(25, 100, 150, 0.5)',
                    shadowOffsetY: 5,
                    // color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    //     offset: 0,
                    //     color: 'rgb(129, 227, 238)'
                    // }, {
                    //     offset: 1,
                    //     color: 'rgb(25, 183, 207)'
                    // }]),
                    borderColor:'#faad14'
                }
            }
        });
    });
    //搜索高亮处理
    opt.series.forEach((o,i)=>{
        o.itemStyle.normal.borderWidth = o.data[0][4]?3:0;
    })

    return opt;
}

/**
 * 区域地图
 * @param data
 * @returns {{title: {text: string, subtext: string, sublink: string, left: string}, tooltip: {trigger: string, showDelay: number, transitionDuration: number, formatter: (function(*): string)}, visualMap: {left: string, min: number, max: number, inRange: {color: string[]}, text: string[], calculable: boolean}, toolbox: {show: boolean, left: string, top: string, feature: {dataView: {readOnly: boolean}, restore: {}, saveAsImage: {}}}, backgroundColor: string, series: {name: string, type: string, roam: boolean, map: string, itemStyle: {emphasis: {label: {show: boolean}}}, textFixed: {Alaska: number[]}, data: *}[]}}
 */
function drawRegionMap(data,option,country,mapJsonData){
    let region;
    try{
        //首字母大写
        country = country.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
        if(JSON.stringify(mapJsonData)!=='{}'){
            const usaJson = mapJsonData;
            region = country;
            echarts.registerMap(region, usaJson, {});
        }else
            region = 'world';
    }catch (e) {
        region = 'world'
    }finally {
        let opt = {
            title: {
                text: option['title.text'],
                show: option['title.show'],
                // subtext: 'Data from www.census.gov',
                // sublink: 'http://www.census.gov/popest/data/datasets.html',
                left: option['title.left'],
                top:option['title.top'],
                textStyle:{
                    color:'black'
                }
            },
            tooltip: {
                trigger: 'item',
                showDelay: 0,
                transitionDuration: 0.2,
                formatter: function (params) {
                    var value = (params.value + '').split('.');
                    value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                    return params.seriesName + '<br/>' + params.name + ': ' + value;
                }
            },
            visualMap: {
                left: option['visualMap.left']||'right',
                min: option['visualMap.min']||500000,
                max: option['visualMap.max']||38000000,
                inRange: {
                    color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                },
                text:['High','Low'],           // 文本，默认为数值文本
                calculable: true,
                textStyle:{
                    color:'black'
                }
            },
            toolbox: {
                show: true,
                //orient: 'vertical',
                left: 'left',
                top: 'top',
                // feature: {
                //     dataView: {readOnly: false},
                //     restore: {},
                //     saveAsImage: {}
                // }
            },
            backgroundColor:transparent,
            series: [
                {
                    name: 'USA PopEstimates',
                    type: 'map',
                    roam: false,
                    zoom:1.2,
                    map: region,
                    itemStyle:{
                        emphasis: {
                            label:{
                                show:true,
                                color:'black'
                            },
                            areaColor: '#40a9ff',
                        }
                    },
                    // 文本位置修正
                    textFixed: {
                        Alaska: [20, -20]
                    },
                    data:data
                }
            ]
        };
        return opt;
    }
}
export default ExChart;

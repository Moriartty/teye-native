import ajax from '../utils/ajax';

let actions = {};

actions.loadFifthChart = () => dispatch => {
    return ajax.get('/getProducts',{},'').then(list=>{
        const option = {
            'title.text':'ROM APP使用时长排行(日)',
            // subTitle: moment(new Date()).format('YYYY-MM-DD'),
            // legendData: [moment(new Date())],
            yAxis: {},
            'xAxis.axisLabel.rotate': -45
        };
        let data = [];
        let x = [];
        for (let i = 0; i < 17; i++) {
            data.push((Math.random() * 2).toFixed(1) + 1);
            x.push(list[i]);
        }
        option['xAxis.data'] = x;

        data.sort((o1, o2) => {
            if (o1 - o2>0) { return -1; } else { return 1; }
        });
        list.sort(() => { return Math.random() > 0.5 ? -1 : 1; });
        dispatch({ type: 'HOME_FIFTH_DATA', data, option });
    })
};
export default actions;

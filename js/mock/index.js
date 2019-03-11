import Mock from 'mockjs';
import api from '../config/api';

Mock.setup({
    timeout:500
});

let mockList = [];

mockList = mockList.concat(require('./app'));

let mockData = {};

mockList.forEach((obj)=>{
    mockData[obj.url] = obj.result;
});

function mockServer(url){
    if(mockData[url]){
        Mock.mock(api.baseUrl+url,mockData[url]);
    }
}
module.exports = mockServer;

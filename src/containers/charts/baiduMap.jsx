import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import ReactDOM from 'react-dom'
import { Row, Col, Card, DatePicker } from 'antd';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
// 公共面包屑
import { Bcrumb } from '../../component/bcrumb/bcrumb';
import { Drawer, Button } from 'antd';
// // 引入折线图
// import LineChart from '../../component/echarts/lineChart';

import {Drawchart} from './drawer';
import './style/index.less';
import { callbackify } from 'util';
import $ from 'jquery';
const {RangePicker} = DatePicker;
/* 以类的方式创建一个组件 */
class Lines extends Component {
    state={
        data:[]
    }
    componentDidMount () {
// console.log(this.props.collapsed);

        //发送http请求，获取后台数据（circle/line）
        var lineDataArr = [];
        var pointDataArr = []; 

        var BMap = window.BMap
        var map = new BMap.Map("allmap"); // 创建Map实例
        map.centerAndZoom(new BMap.Point(113.526877,36.258401), 7); // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
        // map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        var opts = {offset: new BMap.Size(18, 16)}
        map.addControl(new BMap.NavigationControl(opts));

        var pointOpt = {
            size: 5,
            // lineWidth: 5,
            animation: {
                type: 'time', // 按时间展示动画
                stepsRange: {
                    start: 1,
                    end: 31
                },
                trails: 0,
                duration: 10
            },
            draw: 'simple',
            methods: {
                click: function(item){// 鼠标点击事件，对应鼠标点击的元素对象值
                    console.log(item);
                    window.location.href = "myprotocol://";
                },
                // mousemove: function(item) { // 鼠标移动事件，对应鼠标经过的元素对象值
                //     console.log(item);
                // }
            }
        }
        var lineOpt = {
            lineWidth: 10,
            animation: {
                type: 'time', // 按时间展示动画
                stepsRange: {
                    start: 1,
                    end: 30
                },
                trails: 0,
                duration: 10
            },
            draw: 'simple',
            methods: {
                click: function(item){// 鼠标点击事件，对应鼠标点击的元素对象值
                    console.log(item);
                    window.location.href = "myprotocol://";
                },
                // mousemove: function(item) { // 鼠标移动事件，对应鼠标经过的元素对象值
                //     console.log(item);
                // }
            }
        }


        //发送http请求获取数据并添加到地图
        $.ajax({
			type: 'post',
			url: 'http://172.16.157.4:8080/result/getWaterIndex',
			async: false,
			data:{
					startTime: "2017-09-30",
					endTime: "2017-11-20"
			},
			// dataType: "jsonp",
			success: function(data){
				let result = JSON.parse(data);
                console.log("请求成功");
                this.setState({data:result});
                console.log(result);
				return;
			}.bind(this),
			error: function(){
				console.log("有问题");
			}
        });
        setTimeout(()=>{
            this.state.data.forEach((item,idx)=>{
                let color = 'rgba(255,0,0,1.0)';
                if(idx%2){
                    color = 'rgba(0,0,255,1.0)';
                }
                let time = item.time;
                item.lineData.forEach((v,i)=>{
                    lineDataArr.push({
                        geometry: 
                        {
                            type: 'LineString',
                            coordinates: v.coordinates
                        },
                        strokeStyle: 'rgba('+String(v.color[0])+','+String(v.color[1])+','+String(v.color[2])+','+String(1.0)+')',
                        time: idx+1
                    });
                });
                item.pointData.forEach((v,i)=>{
                    pointDataArr.push({
                        geometry: 
                        {
                            type: 'Point',
                            coordinates: v.coordinates
                        },
                        fillStyle: 'rgba('+String(v.color[0])+','+String(v.color[1])+','+String(v.color[2])+','+String(1.0)+')',
                        // fillStyle: color,
                        time: idx+1
                    });
                });
            });
                // console.log("pointDataArr");
                // console.log(pointDataArr);
                // console.log("lineDataArr");
                // console.log(lineDataArr);
                
                var pointdataSet = new mapv.DataSet(pointDataArr);
                var linedataSet = new mapv.DataSet(lineDataArr);
                var mapvLayer2 = new mapv.baiduMapLayer(map, linedataSet, lineOpt);
                var mapvLayer1 = new mapv.baiduMapLayer(map, pointdataSet, pointOpt);
                //
                var opts2 = {offset: new BMap.Size(1800, 16)}
                map.addControl(new BMap.MapTypeControl(opts2));   
                map.enableScrollWheelZoom(true);  
                map.addControl(new BMap.ScaleControl());    
                map.addControl(new BMap.OverviewMapControl());      
        },500);
       
        
        // fetch('http://172.16.157.4:8080/result/getWaterIndexByPoint',{
		// 	mode: "cors",
		// 	headers:{
		// 		"Content-Type": "application/x-www-form-urlencoded"
		// 	},
		// 	method: 'get'
		// }).then(function(response) {
		// 	return response.json();
		//   }).then(function(data) {
        //     circleData = JSON.parse(JSON.stringify(data));
        //     console.log(circleData);
        //     var dataSet2 = new mapv.DataSet(circleData);
        //     var mapvLayer = new mapv.baiduMapLayer(map, dataSet2, options);
		//   }).catch(function(e) {
		// 	console.log("请求error");
        //   });
          
        // fetch('http://172.16.157.4:8080/result/getWaterIndexByLineStr',{
        //     mode: "cors",
        //     headers:{
        //         "Content-Type": "application/x-www-form-urlencoded"
        //     },
        //     method: 'get'
        // }).then(function(response) {
        //     return response.json();
        // }).then(function(data) {
        //     lineData = JSON.parse(JSON.stringify(data));
        //     console.log(lineData);
        //     var dataSet = new mapv.DataSet(lineData);
        //     var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options2);
        //     let arr = [];
        //     lineData.forEach((item,idx) => {
        //         arr.push(item.geometry.coordinates);           
        //     });
        //     console.log(arr);   
        // }).catch(function(e) {
        //     console.log("请求error");
        // });

      
    }
    onChange(date,dataStr){
        console.log(data+","+dataStr);
    }
    render() {
        return (  	
            <div className="lines-container">
                <div id='allmap' >
                </div>
                <div className="drawer-chart" >
                    {/* <RangePicker onChange ={this.onChange()}/> */}
                    <Drawchart></Drawchart>
                </div>
            </div>
        );
    }
}
export default Lines;

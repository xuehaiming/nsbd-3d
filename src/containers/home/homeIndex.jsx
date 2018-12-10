import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import pureRender from 'pure-render-decorator';
import { is, fromJS} from 'immutable';
import { Router, Route, IndexRoute, browserHistory, History, Link } from 'react-router';
import { connect } from 'react-redux';
import esriLoader from 'esri-loader';
import EsriLoader from 'esri-loader-react';
import {Drawchart} from '../charts/drawer';

// 公共面包屑
import { Bcrumb } from '../../component/bcrumb/bcrumb';

import styles from './style/home.less';

import { Icon, Row, Col, Card, Steps, Button, message, DatePicker } from 'antd';

const { RangePicker } = DatePicker;
/* 以类的方式创建一个组件 */
export default class Main extends Component {
    state = {
        data: [{
            time:"2018-11-10-2:00",
            lineData :[{
                coordinates: [[111.724657,32.678057],[111.744457,32.675236]],
                color: [122,233,255,255]
            },{
                coordinates: [[111.88294,32.79133],[111.87875,32.81089]],
                color: [122,0,255,255]
            },{
                coordinates: [[111.724657,32.678057],[111.744457,32.675236]],
                color: [0,233,255,255]
            }],
            pointData:[{
                coordinates: [113.229404112387,33.4810125317654],
                color: [122,233,0,255]
            },{
                coordinates: [113.042591915996,33.6498300186902],
                color: [255,233,255,255]
            },{
                coordinates: [112.950385405954,33.6973220887955],
                color: [255,0,255,255]
            }]
        },
        {
            time:"2018-11-10-2:00",
            lineData :[{
                coordinates: [[  111.724657 , 32.678057 ],[ 111.744457 , 32.675236 ]],
                color: [122,233,255,255]
            },{
                coordinates: [[  111.724657 , 32.678057 ],[ 111.744457 , 32.675236 ]],
                color: [122,233,255,255]
            },{
                coordinates: [[  111.724657 , 32.678057 ],[ 111.744457 , 32.675236 ]],
                color: [122,233,255,255]
            }],
            pointData:[{
                coordinates: [  111.724657 , 32.678057 ],
                color: [122,233,255,255]
            },{
                coordinates: [  111.724657 , 32.678057 ],
                color: [122,233,255,255]
            },{
                coordinates: [  111.724657 , 32.678057 ],
                color: [122,233,255,255]
            }]
        }],
        dateStr:["2018-12-12", "2019-01-17"],
        startDate: "",
        endDate: "",
    }
    constructor(props){
        super(props)
        this.tileMapUrl = "http://172.16.157.30:6080/arcgis/rest/services/nsbd15/MapServer"
    }
    
    componentDidMount(){
        let lineArr;
        let pointArr;
        fetch('http://172.16.157.4:8080/result/getWaterIndex',{
            mode: "cors",
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: 'get'
        }).then(function(response) { 
            return response.json();
        }).then(function(data) {
            let allData = JSON.parse(JSON.stringify(data));
            lineArr = allData.lineData;
            pointArr = allData.pointData;
            return;
        }).catch(function(e) {
            console.log("请求error");
        });

        setTimeout(()=>{
            this.setState({lineData:lineArr,pointData:pointArr});
            console.log(this.state.lineData);
            this.initMap()//初始化地图
        },1000) 
        
    }
    changeDate(date,dateStr){
        console.log("你选择的时间段是：");
        console.log(dateStr);
        this.setState({startDate:dateStr[0],endDate:dateStr[1]});
        console.log(this.state.startDate);
        
    }
    initMap(){
        const mapURL = {
            // url : "https://js.arcgis.com/3.25/"
            url : "http://jsapi.thinkgis.cn/init.js"
        }
        esriLoader.loadModules([
          "esri/map", 
          "esri/SpatialReference", 
          "esri/layers/ArcGISDynamicMapServiceLayer",
          "esri/layers/GraphicsLayer",
          "esri/geometry/Extent",
          "esri/geometry/Polyline",
          "esri/symbols/SimpleMarkerSymbol",
          "esri/symbols/SimpleLineSymbol",
          "esri/symbols/SimpleFillSymbol", 
          "esri/graphic",
          "esri/Color",
          "dojo/domReady!"
        ], mapURL).then(([Map,SpatialReference,ArcGISDynamicMapServiceLayer,GraphicsLayer,Extent,Polyline,SimpleMarkerSymbol,SimpleLineSymbol,SimpleFillSymbol,Graphic,Color])=>{
              let  extent = new Extent(95.56, 36.28, 125.65, 45.33, new SpatialReference({ wkid: 4326 }))
              //定义地图
              let map = new Map('mapDiv', {
                //   showLabels: true,
                //   extent: extent,
                    zoom: 6,
                    center: [115.526877, 35.198401],
                    autoResize: false,
					logo: false,
					isScrollWheel: true,
					slider: true,
					minScale: 7500000,
					maxScale: 9375,
              })
              let tiledLayer = new ArcGISDynamicMapServiceLayer(this.tileMapUrl, {
                  id: 'baseMap'
              })
              map.addLayer(tiledLayer);
              //添加图层
              var graphicLayer = new GraphicsLayer();
            
            //实现动态渐变
            this.state.data.forEach((item,index) => {
                let time = item.time;
                let lineData = item.lineData;
                let pointData = item.pointData;
                lineData.forEach((v,idx)=>{
                    let myLine ={geometry:{"paths":[v.coordinates],//"paths":[[[-91.40625,6.328125],[6.328125,19.3359375]]]
                    "spatialReference":{"wkid":4326}},
                    "symbol":{"color":v.color,"width":5,"type":"esriSLS","style":"esriSLSSolid"}};//"color":[0,0,0,255]
                    let gra= new Graphic(myLine);
                    graphicLayer.add(gra);
                });
                pointData.forEach((v,idx) => {
                        let myMultiPoint = {"geometry":{"points":[v.coordinates],"spatialReference":4326},"symbol":{"color":v.color,
                        "size":5,"type":"esriSMS","style":"esriSMSCircle"}};
                        let gra = new Graphic(myMultiPoint);
                        graphicLayer.add(gra);
                });
            });
            //..................
            // this.state.lineData.coordinates.forEach((item,idx) => {
                // for(var i = 0;i<752;i++){
                //     console.log(this.state.lineData.color[i]);
                //     let myLine ={geometry:{"paths":[this.state.lineData.coordinates[i]],
                //     "spatialReference":{"wkid":4326}},
                //     "symbol":{"color":this.state.lineData.color[i],"width":5,"type":"esriSLS","style":"esriSLSSolid"}};
                //     let gra= new Graphic(myLine);
                //     graphicLayer.add(gra);
                // }
                
            // });
            // this.state.pointData.coordinates.forEach((item,idx) => {
                // for(var j = 0;j<752;j++){
                // let myMultiPoint = {"geometry":{"points":[this.state.pointData.coordinates[j]],"spatialReference":4326},"symbol":{"color":this.state.pointData.color[j],
                // "size":5,"type":"esriSMS","style":"esriSMSCircle"}};
                // let gra = new Graphic(myMultiPoint);
                // graphicLayer.add(gra);
                // }
            // });
            //.......................................................................
              map.addLayer(graphicLayer);
              //添加图层end
        })
    }
    render(){
        return(
            <div className="home-container">
                <div id="mapDiv">
                    <div className="range-picker">
                        <RangePicker size = 'large' onChange={this.changeDate.bind(this)}/>
                    </div>
                </div>
                <div className="drawer-chart" >
                    <Drawchart></Drawchart>
                </div>
            </div>
        )
    }
}

// export default Main;
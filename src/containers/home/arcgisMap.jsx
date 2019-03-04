import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { Router, Route, IndexRoute, browserHistory, History, Link } from 'react-router';
import { connect } from 'react-redux';
import esriLoader from 'esri-loader';
import EsriLoader from 'esri-loader-react';
import jcdPic from '../../assets/jcd.png';
import yiwei from '../../assets/yiwei.png';
import sanwei from '../../assets/sanwei.png';
// 公共面包屑

import styles from './style/home.less';

import { Icon, Button, DatePicker, Progress, Spin, Slider, Select, Radio  } from 'antd';
import moment from 'moment';
import $ from 'jquery';
const { RangePicker } = DatePicker;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
var map;
var timer;
var tiledLayer;
/* 以类的方式创建一个组件 */
export class Arcgismap extends Component {
    state = {
        isloading: true,
        isplay: true,
        timeText:'2017-09-30 4:00',
        dateStr:["2018-12-12", "2019-01-17"],
        startTime: "2017-09-30",
        endTime: "2017-10-30",
        attr:{key:'ph',label:'PH'},
        pointsJcd:[[111.7088729882136,32.67441803036789],
            [111.8417640595209,32.71667106861533],
            ],
        pointsFsk:[{name:"肖楼分水口",coordinates:[111.7529967,32.67336357]}],//分水口数据集
        pointsJzz: [{name:"陶岔渠渠首",coordinates:[111.7088387414464,32.67408870580463]},//节制闸数据集
        {name:"刁河渡槽进口节制闸",coordinates:[111.8439682252548,32.71848623846933]}],
        data: [{
            time:"2018-11-10-2:00",
            lineData :[{
                coordinates: [[111.724657,32.678057],[111.744457,32.675236]],
                color: [255,0,0,255]
            },{
                coordinates: [[111.88294,32.79133],[111.87875,32.81089]],
                color: [255,0,0,255]
            },{
                coordinates: [[111.724657,32.678057],[111.744457,32.675236]],
                color: [255,0,0,255]
            }],
            pointData:[{
                coordinates: [113.229404112387,33.4810125317654],
                color: [255,0,0,255]
            },{
                coordinates: [113.042591915996,33.6498300186902],
                color: [255,0,0,255]
            },{
                coordinates: [112.950385405954,33.6973220887955],
                color: [255,0,0,255]
            }]
        }],
        sliderValue : 0
    }
    constructor(props){
        super(props)
        this.tileMapUrl = "http://172.16.157.30:6080/arcgis/rest/services/nsbd15/MapServer"
    }
    
    componentDidMount(){
            this.getPointsData();
            this.getData();//获取水渐变数据
            this.initMap();//初始化地图
    }
    
    changeDate(date,dateStr){
        console.log("你选择的时间段是："+dateStr);
        this.setState({startTime:dateStr[0],endTime:dateStr[1]});
        this.resizeMap();
        this.setState({isloading:true,isplay:true});
        setTimeout(()=>{
            this.getData();
            this.initMap();
        },500);
        
    }
    changeTarget(value){
        console.log(value);
        this.setState({attr:value,isloading:true,isplay:true});
        this.resizeMap();
        // this.setState({isloading:true});
        setTimeout(()=>{
            this.getData();
            this.initMap();
        },500);
    }
    getPointsData(){
        $.ajax({//获取监测点、供水口、节制闸基础数据
			type: 'get',
			url: 'http://172.16.157.4:8080/result/getWaterPoints',
			async: false,
			success: function(data){
				let result = JSON.parse(data);
                console.log("请求基础数据成功");
                let pointsFsk = result.pointsFsk;
                let pointsJcd = result.pointsJcd;
                let pointsJzz = result.pointsJzz;
                this.setState({pointsFsk,pointsJcd,pointsJzz});
				return;
			}.bind(this),
			error: function(){
				console.log("请求错误");
			}
        });
    }
    getData(){
        console.log("getData");
        // return
        $.ajax({//获取颜色渐变数据
			type: 'post',
			url: 'http://172.16.157.4:8080/result/getWaterIndex',
			async: false,
			data:{
					startTime: this.state.startTime,
                    endTime: this.state.endTime,
                    attr: this.state.attr.key
			},
			// dataType: "jsonp",
			success: function(data){
				let result = JSON.parse(data);
                console.log("请求图层渐变数据成功");
                this.setState({data:result});
                // console.log(result);
				return;
			}.bind(this),
			error: function(){
				console.log("请求错误");
			}
        });
        
    }
     initMap(){
        const mapURL = {
            // url : "https://js.arcgis.com/3.25/"
            url : "http://jsapi.thinkgis.cn/init.js"
        }
        esriLoader.loadModules([
          "esri/map", 
          "esri/geometry/Point",
          "esri/SpatialReference", 
          "esri/layers/ArcGISDynamicMapServiceLayer",
          "esri/layers/GraphicsLayer",
          "esri/geometry/Extent",
          "esri/geometry/Polyline",
          "esri/symbols/SimpleMarkerSymbol",
          "esri/symbols/SimpleLineSymbol",
          "esri/symbols/SimpleFillSymbol", 
          "esri/symbols/PictureMarkerSymbol",
          "esri/graphic",
          "esri/Color",
          "dojo/domReady!"
        ], mapURL).then(([Map,Point,SpatialReference,ArcGISDynamicMapServiceLayer,GraphicsLayer,Extent,Polyline,
            SimpleMarkerSymbol,SimpleLineSymbol,SimpleFillSymbol,PictureMarkerSymbol,Graphic,Color])=>{
              let  extent = new Extent(95.56, 36.28, 125.65, 45.33, new SpatialReference({ wkid: 4326 }))
              //定义地图
               map = new Map('mapDiv', {
                //   extent: extent,
                    zoom: 8,
                    center: [115.526877, 35.198401],
                    autoResize: true,
					logo: false,
					isScrollWheel: true,
					slider: true,
					// minScale: 7500000,
					minScale: 9500000,
					maxScale: 9375,
              })
              tiledLayer = new ArcGISDynamicMapServiceLayer(this.tileMapUrl, {
                  id: 'baseMap',
              })
              map.addLayer(tiledLayer);

            //添加图层
            var jcdLayer = new GraphicsLayer({//监测点图层
                id: 11111,
                minScale: 3750000,
            });
            var gskLayer = GraphicsLayer({//供水口图层
                id: 22222,
                minScale: 1875000,
            });
            var jzzLayer = GraphicsLayer({//节制闸图层
                id: 33333,
                minScale: 1875000,
            });
            //定义添加点符号方法
            var symbol = {
                "color": [0,255,255,255],
                "size": 8,
                "xoffset": 0,
                "yoffset": 0,
                "type": "esriSMS",
                "style": "esriSMSSquare",
                "outline": {
                  "color": [234,251,100,255],
                  "width": 1,
                  "type": "esriSLS",
                  "style": "esriSLSSolid"
                }
              };
             
            //添加要素（符号）公用方法
            function addPoint(layer,coordinates,simple){
                let myMultiPoint = {"geometry":{"points":[coordinates],//"points":[[114.3467,34.7788]]
                "spatialReference":4326},"symbol":simple};
                let gra = new Graphic(myMultiPoint);
                layer.add(gra);
            }
            //添加监测点
            this.state.pointsJcd.forEach((item,idx)=>{
                var jcdSimple = {
                    "url":jcdPic,
                    "height":32,
                    "width":20,
                    "type":"esriPMS"
                  };
                addPoint(jcdLayer,item.coordinates,jcdSimple);
            });
            map.addLayer(jcdLayer);
            //添加供水口
            this.state.pointsFsk.forEach((item,idx)=>{
                let textSimple = {
                    "type": "esriTS",
                    "style": "normal",
                    "text": item.name,
                    // "color": [0,255,255,255],
                    "color": [0,11,255,255],
                    "xoffset": 5,
                    "yoffset": 5,
                    "horizontalAlignment":"left",
                    "weight": "blod",
                    "size":14
                };
                addPoint(gskLayer,item.coordinates,symbol);
                addPoint(gskLayer,item.coordinates,textSimple);
            });
             map.addLayer(gskLayer);
            //添加节制闸
            this.state.pointsJzz.forEach((item,idx)=>{
                let textSimple = {
                    "type": "esriTS",
                    "style": "normal",
                    // "color": [0,255,0,255],
                    "color": [255,191,0,255],
                    "text": item.name,
                    "xoffset": -5,
                    "yoffset": -5,
                    "horizontalAlignment":"right",
                    "weight": "blod",
                    "borderLineColor":[0,0,0,255],
                    "size":14
                };
                let circleSymbol = {
                    "color": [255,255,255,255],
                    "size": 8,
                    "xoffset": 0,
                    "yoffset": 0,
                    "type": "esriSMS",
                    "style": "esriSMSCircle",
                    "outline": {
                      "color": [0,0,0,255],
                      "width": 1,
                      "type": "esriSLS",
                      "style": "esriSLSSolid"
                    }
                  };
                addPoint(jzzLayer,item.coordinates,circleSymbol);
                addPoint(jzzLayer,item.coordinates,textSimple);
            });
            map.addLayer(jzzLayer);


            //定义addGraphic方法，添加某个时刻所有的要素gra到graphicLayer
            var layers = [];
            function addGraphic(item,idx){
                layers[idx] = new GraphicsLayer({//每个时刻对应一个layer
                    id: idx+1,
                    visible:true,
                    opacity: 0
                });
                let time = item.time;
                let lineData = item.lineData;
                let pointData = item.pointData;
                pointData.forEach((v,i) => {
                    let myMultiPoint = {"geometry":{"points":[v.coordinates],//"points":[[114.3467,34.7788]]
                    "spatialReference":4326},"symbol":{"color":v.color,//"color":[0,0,0,255]
                    "size":5,"type":"esriSMS","style":"esriSMSCircle"}};
                    let gra = new Graphic(myMultiPoint);
                    layers[idx].add(gra);
                });
                lineData.forEach((v,i)=>{
                    let myLine ={geometry:{"paths":[v.coordinates],//"paths":[[[-91.40625,6.328125],[6.328125,19.3359375]]]
                    "spatialReference":{"wkid":4326}},
                    "symbol":{"color":v.color,"width":5,"type":"esriSLS","style":"esriSLSSolid"}};//"color":[0,0,0,255]
                    let gra= new Graphic(myLine);
                    layers[idx].add(gra);
                });
                layers[idx].on("click",function(evt){//给每个图层定义点击事件（调用.exe）
                    window.location.href = "myprotocol://";
                });
            }
            //递归调用，实现动态渐变，动画循环函数
            setTimeout(()=>{//等地图初始化完成再生成渐变图层
                this.state.data.forEach((item,index)=>{
                    addGraphic(item,index);
                });
                map.addLayers(layers);
                this.setState({isloading:false});
                this.aminate(0);
            },500);
              //添加图层end
        })
    }
     aminate(i){//动画函数
        let _this = this;
        var num = this.state.data.length;
        var i = i;
        clearTimeout(timer);
        (function intervalFun(){
            timer = setTimeout(function fn(){
                i=i+1;
                if(i<num+1){
                    if(i!==1){
                        map.getLayer(i-1).setOpacity(0);
                    };
                    console.log("i:"+i);
                    let timeText = _this.state.data[i-1].time;
                    let sliderValue = i;
                    _this.setState({timeText, sliderValue});
                    console.log("********");
                    
                    map.getLayer(i).setOpacity(1);
                    intervalFun();
                }else{
                    // i = 0;
                    // map.getLayer(num).setOpacity(0);
                    // intervalFun();//无限循环
                    _this.setState({isplay:false});
                    clearTimeout(timer);
                    return;
                }
            },300);
        })();
          
    };
    resizeMap(){
        map.destroy();
    }
    hideTiledLayer(value){
        if(value=="1"){
            tiledLayer.show();
        }else{
            tiledLayer.hide();
        }
    }

    render(){
        const length = this.state.data.length;
        const marks = {
            0: this.state.startTime,
            [length]: this.state.endTime
        };
        return(
            <div className="home-container">
                <div className="map-box">
                <div id="mapDiv">
                    <div className="map-radio">
                    <RadioGroup 
                    defaultValue="1" 
                    size="small"
                    onChange={(e)=>{this.hideTiledLayer(e.target.value);}}
                    >
                        <RadioButton value="1">底图</RadioButton>
                        <RadioButton value="0">无底图</RadioButton>
                    </RadioGroup>
                    </div>
                    <div className="loading" > 
                        <Spin size="large" tip="正在加载..." spinning={this.state.isloading}></Spin>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

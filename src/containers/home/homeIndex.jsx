import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import pureRender from 'pure-render-decorator';
import { is, fromJS} from 'immutable';
import { Router, Route, IndexRoute, browserHistory, History, Link } from 'react-router';
import { connect } from 'react-redux';
import esriLoader from 'esri-loader';
import EsriLoader from 'esri-loader-react';
import {Drawchart} from '../charts/drawer';
import jcdPic from '../../assets/jcd.png';
// 公共面包屑
import { Bcrumb } from '../../component/bcrumb/bcrumb';

import styles from './style/home.less';

import { Icon, Row, Col, Card, Steps, Button, message, DatePicker } from 'antd';
import moment from 'moment';
import $ from 'jquery';
const { RangePicker } = DatePicker;
/* 以类的方式创建一个组件 */
export default class Main extends Component {
    state = {
        timeText:'2017-09-30 4:00',
        pointsJcd:[[111.7088729882136,32.67441803036789],
            [111.8417640595209,32.71667106861533],
            [112.4582684715111,32.99300225179491],
            [113.2409967893939,33.35950115029303],
            [112.9440580723585,33.7021441875448],
            [113.3137246929766,34.05131236968516],
            [113.4359498197337,34.10673910367132],
            [113.6698880280531,34.28106888127626],
            [113.5756270522342,34.73359762035],
            [113.2315686997872,34.87457012689574],
            [113.193332025506,34.9016614283373],
            [113.4719828072467,35.3823186330664],
            [113.8211643584744,35.46097354694128],
            [114.0272960862761,35.47378033347706],
            [114.2797019226187,35.78811204588877],
            [114.3188729484887,36.24966074853838],
            [114.3214609677051,36.26061217836797],
            [114.3855334016349,36.84140646791256],
            [114.5305226594537,37.40672375424716],
            [114.5064839773873,37.57290568437657],
            [114.4226426247873,38.10824466130816],
            [114.7888612708277,38.49527593545074],
            [115.1644474235218,38.91268017345552],
            [115.2605534206589,38.96023214725437],
            [115.3710273178918,39.06684576325281]],
        pointsGsk:[{name:"肖楼分水口",coordinates:[111.7529967,32.67336357]},//分水口数据集
        {name:"望成岗分水口",coordinates:[111.8650545,32.78518775]},
        {name:"彭家分水口",coordinates:	[112.014263,32.86244933]},
        {name:"谭寨分水口",coordinates:	[112.2289913,32.94885048]},
        {name:"姜沟分水口",coordinates:	[112.4598501,32.99625061]},
        {name:"田洼分水口",coordinates:	[112.4895916,33.02627307]},
        {name:"大寨分水口",coordinates:	[112.5286744,33.05953464]},
        {name:"半坡店分水口",coordinates:[112.8241704,33.13285584]},
        {name:"大营分水口",coordinates:	[112.9847002,33.19040823]},
        {name:"十里庙分水口",coordinates:[113.0204445,33.22438386]},
        {name:"辛庄分水口",coordinates:	[113.2608947,33.4518744]},
        {name:"澎河分水口",coordinates:	[113.0212964,33.64700924]},
        {name:"张村分水口",coordinates:	[112.9920573,33.78374362]},
        {name:"马庄分水口",coordinates:	[113.0335882,33.82324446]},
        {name:"高庄分水口",coordinates:	[113.0381862,33.87665579]},
        {name:"赵庄分水口",coordinates:	[113.1858824,33.99192804]},
        {name:"宴窑分水口",coordinates:	[113.3817109,34.07176243]},
        {name:"任坡分水口",coordinates:	[113.4069907,34.15477345]},
        {name:"孟坡分水口",coordinates:	[113.5480639,34.19093082]},
        {name:"洼李分水口",coordinates:	[113.668818,34.26733592]},
        {name:"李垌分水口",coordinates:	[113.718535,34.44547873]},
        {name:"小河刘分水口",coordinates:[113.8736999,34.56924208]},
        {name:"刘湾分水口",coordinates:	[113.685552,34.66364767]},
        {name:"密垌分水口",coordinates:	[113.5900508,34.70753181]},
        {name:"中原西路分水口",coordinates:	[113.5611716,34.74609834]},
        {name:"前蒋寨分水口",coordinates:[113.45022,34.78736996]},
        {name:"上街分水口",coordinates:	[113.2895904,34.86056291]},
        {name:"北冷分水口",coordinates:	[113.1142424,34.96193589]},
        {name:"北石涧分水口",coordinates:[113.1567192,35.13833181]},
        {name:"府城南分水口",coordinates:[113.1957969,35.18899465]},
        {name:"苏蔺分水口",coordinates:	[113.2946249,35.23796829]},
        {name:"白庄分水口",coordinates:	[113.4156602,35.34195784]},
        {name:"郭屯分水口",coordinates:	[113.4894756,35.38744124]},
        {name:"路固分水口",coordinates:	[113.8251549,35.45182249]},
        {name:"老道井分水口",coordinates:[113.8949354,35.41569841]},
        {name:"温寺门分水口",coordinates:[114.0293116,35.47498295]},
        {name:"袁庄分水口",coordinates:	[114.1567842,35.63376551]},
        {name:"三里屯分水口",coordinates:[114.2293521,35.71004126]},
        {name:"刘庄分水口",coordinates:	[114.2594727,35.75247072]},
        {name:"董庄分水口",coordinates:	[114.3260342,35.92724192]},
        {name:"小营分水口",coordinates:	[114.3438517,36.02638748]},
        {name:"南流寺分水口",coordinates:[114.2296118,36.10489351]},
        {name:"于家店分水口",coordinates:[114.3401761,36.39666794]},
        {name:"白村分水口",coordinates:	[114.3724231,36.48654193]},
        {name:"下庄分水口",coordinates:	[114.4091037,36.58948121]},
        {name:"郭河分水口",coordinates:	[114.3971401,36.62773169]},
        {name:"三陵分水口",coordinates:	[114.4258655,36.67448372]},
        {name:"吴庄分水口",coordinates:	[114.46042,	36.73953915]},
        {name:"赞善分水口",coordinates:	[114.3992328,36.94182392]},
        {name:"邓家庄分水口",coordinates:[114.4109964,36.9859651]},
        {name:"南大郭分水口",coordinates:[114.4330024,37.08020188]},
        {name:"刘家庄分水口",coordinates:[114.4910726,37.27583215]},
        {name:"黑沙村分水口",coordinates:[114.4921128,37.28997415]},
        {name:"北盘石分水口",coordinates:[114.4917207,37.28695779]},
        {name:"泲河分水口",coordinates:	[114.4983719,37.58628793]},
        {name:"北马（泵）分水口",coordinates:[114.4803119,37.66474807]},
        {name:"赵同分水口",coordinates:	[114.4513176,37.76171061]},
        {name:"万年分水口",coordinates:	[114.4591128,37.86087159]},
        {name:"上庄分水口",coordinates:	[114.3985472,38.00451281]},
        {name:"上庄分水口",coordinates:	[114.3985472,38.00451281]},
        {name:"南新城分水口",coordinates:[114.3917175,38.08404278]},
        {name:"田庄分水口",coordinates:	[114.4232829,38.10544208]},
        {name:"永安村分水口",coordinates:[114.5246907,38.17468368]},
        {name:"西名村分水口",coordinates:[114.6548254,38.35978061]},
        {name:"留营分水口",coordinates:	[114.7947627,38.51922625]},
        {name:"中管头分水口",coordinates:[114.8082713,38.56492796]},
        {name:"大寺城涧分水口",coordinates:	[114.9533304,38.7486264]},
        {name:"高昌分水口",coordinates:	[115.0280078,38.79456542]},
        {name:"塔坡分水口",coordinates:	[115.0720969,38.8609463]},
        {name:"郑家佐分水口",coordinates:[115.2778595,38.97217145]},
        {name:"刘庄分水口",coordinates:[115.3531226,39.06309555]},
        {name:"荆柯山分水口",coordinates:[115.4565055,39.34348792]},
        {name:"下车亭分水口",coordinates:[115.6666895,39.42667443]},
        {name:"三岔沟分水口",coordinates:[115.7848253,39.48988899]}
        ],
        pointsJzz: [{name:"陶岔渠渠首",coordinates:[111.7088387414464,32.67408870580463]},//节制闸数据集
        {name:"刁河渡槽进口节制闸",coordinates:[111.8439682252548,32.71848623846933]},
        {name:"湍河渡槽进口节制闸",coordinates:[111.9164884760591,32.87950560580975]},
        {name:"严陵河渡槽进口节制闸",coordinates:[112.0455748566651,32.86437737784898]},
        {name:"淇河倒虹吸出口节制闸",coordinates:[112.2720791132478,32.95002878964612]},
        {name:"十二里河渡槽进口节制闸",coordinates:[112.4740457104475,33.01628955783785]},
        {name:"白河倒虹吸出口节制闸",coordinates:[112.6340965853158,33.11491205454927]},
        {name:"东赵河倒虹吸出口节制闸",coordinates:[112.8455870189847,33.14225084816432]},
        {name:"黄金河倒虹吸出口节制闸",coordinates:[113.053318160859,33.22679849850658]},
        {name:"草墩河渡槽进口节制闸",coordinates:[113.2240435220994,33.33937542991612]},
        {name:"澧河渡槽进口节制闸",coordinates:[113.1405013354244,33.51901155558252]},
        {name:"彭河渡槽进口节制闸",coordinates:[113.0147580787392,33.64620457567438]},
        {name:"沙河渡槽进口节制闸",coordinates:[112.9441216934944,33.70338006468847]},
        {name:"玉带河倒虹吸出口节制闸",coordinates:[113.0393443500319,33.87992143070046]},
        {name:"北汝河倒虹吸出口节制闸",coordinates:[113.1345293993819,33.96544274821454]},
        {name:"兰河涵洞进口节制闸",coordinates:[113.3116896711773,34.05139431498737]},
        {name:"颖河倒虹吸出口节制闸",coordinates:[113.4398184246452,34.18549140375051]},
        {name:"小洪河倒虹吸出口节制闸",coordinates:[113.6226582646542,34.2579380497293]},
        {name:"双洎河渡槽进口节制闸",coordinates:[113.6858995767354,34.42175393539283]},
        {name:"梅河倒虹吸出口节制闸",coordinates:[113.8203016105482,34.44927052390692]},
        {name:"丈八沟倒虹吸出口节制闸",coordinates:[113.8777186907763,34.55280869286365]},
        {name:"潮河倒虹吸出口节制闸",coordinates:[113.7515597203277,34.61902561232191]},
        {name:"金水河倒虹吸出口节制闸",coordinates:[113.6079523191281,34.70039214773978]},
        {name:"须水河倒虹吸出口节制闸",coordinates:[113.5110412045612,34.75513037552274]},
        {name:"索河渡槽进口节制闸",coordinates:[113.4266059767823,34.83427014869237]},
        {name:"穿黄隧洞出口节制闸",coordinates:[113.1941841090281,34.90047062386088]},
        {name:"济河倒虹吸出口节制闸",coordinates:[113.0925253842946,35.03037816139664]},
        {name:"闫河倒虹吸出口节制闸",coordinates:[113.2440081540382,35.22135339943095]},
        {name:"溃城寨河倒虹吸出口节制闸",coordinates:[113.402830310347,35.32764968766541]},
        {name:"峪河暗渠进口节制闸",coordinates:[113.4967029983741,35.40981534906763]},
        {name:"黄水河支倒虹吸出口节制闸",coordinates:[113.7260355815675,35.51361382191829]},
        {name:"孟坟河倒虹吸出口节制闸",coordinates:[113.8718422385257,35.42103534311866]},
        {name:"香泉河倒虹吸出口节制闸",coordinates:[114.0820658252163,35.52093358524003]},
        {name:"淇河倒虹吸出口节制闸",coordinates:[114.2550350041523,35.74331885862443]},
        {name:"汤河涵洞式渡槽进口节制闸",coordinates:[114.3208251231449,35.94044633747635]},
        {name:"安阳河倒虹吸出口节制闸",coordinates:[114.2470452532498,36.13776701769501]},
        {name:"漳河倒虹吸出口节制闸",coordinates:[114.318736959804,36.24911120694427]},
        {name:"牤牛河南支渡槽进口节制闸",coordinates:[114.3716538814369,36.47738956735562]},
        {name:"沁河倒虹吸出口节制闸",coordinates:[114.4027933979666,36.63568142413107]},
        {name:"洺河渡槽进口节制闸",coordinates:[114.3857405441336,36.81731213586203]},
        {name:"南沙河倒虹吸出口节制闸",coordinates:[114.4089800994692,36.98567081904802]},
        {name:"七里河倒虹吸出口节制闸",coordinates:[114.4249075977676,37.03012750592681]},
        {name:"白马河倒虹吸出口节制闸",coordinates:[114.4621990585385,37.1512116844362]},
        {name:"李阳河倒虹吸出口节制闸",coordinates:[114.4961791078497,37.29778992817079]},
        {name:"午河渡槽进口节制闸",coordinates:[114.5237181075652,37.53770623107558]},
        {name:"槐河（一）倒虹吸出口节制闸",coordinates:[114.4538147443093,37.71010228949722]},
        {name:"洨河倒虹吸出口节制闸",coordinates:[114.4009405297021,37.94215319968485]},
        {name:"古运河暗渠进口节制闸",coordinates:[114.4222886834281,38.10607082974826]},
        {name:"滹沱河倒虹吸出口节制闸",coordinates:[114.5033439575469,38.15926027851975]},
        {name:"磁河倒虹吸出口节制闸",coordinates:[114.6382901458535,38.31721357778476]},
        {name:"沙河（北）倒虹吸出口节制闸",coordinates:[114.739603187599,38.41549076116593]},
        {name:"漠道沟倒虹吸出口节制闸",coordinates:[114.8116444934032,38.57387485579205]},
        {name:"唐河倒虹吸出口节制闸",coordinates:[114.8841748517066,38.63038129884991]},
        {name:"放水河渡槽进口节制闸",coordinates:[115.0258217463276,38.80397824157145]},
        {name:"蒲阳河倒虹吸出口节制闸",coordinates:[115.1067678773597,38.89692425403939]},
        {name:"岗头隧洞进口节制闸",coordinates:[115.3058862100928,39.03067914089978]},
        {name:"西黑山节制闸",coordinates:[115.3959800869103,39.07996500253015]},
        {name:"瀑河倒虹吸出口节制闸",coordinates:[115.3914749173986,39.20387894192258]},
        {name:"北易水倒虹吸出口节制闸",coordinates:[115.4617240963877,39.35792723971775]},
        {name:"坟庄河倒虹吸出口节制闸",coordinates:[115.5840501423865,39.42305322468427]},
        {name:"北拒马河暗渠进口节制闸",coordinates:[115.7918491540519,39.50752401826482]},
        {name:"团城湖",coordinates:[116.2658917889931,39.98407074566595]}],
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
        },
        {
            time:"2018-11-10-2:00",
            lineData :[{
                coordinates: [[  111.724657 , 32.678057 ],[ 111.744457 , 32.675236 ]],
                color: [0,0,255,255]
            },{
                coordinates: [[111.88294,32.79133],[111.87875,32.81089]],
                color: [0,0,255,255]
            },{
                coordinates: [[111.724657,32.678057],[111.744457,32.675236]],
                color: [0,0,255,255]
            }],
            pointData:[{
                coordinates:  [113.229404112387,33.4810125317654],
                color: [0,0,255,255]
            },{
                coordinates: [113.042591915996,33.6498300186902],
                color: [0,0,255,255]
            },{
                coordinates: [112.950385405954,33.6973220887955],
                color: [0,0,255,255]
            }]
        }],
        dateStr:["2018-12-12", "2019-01-17"],
        startTime: "123456",
        endTime: "654321",
    }
    constructor(props){
        super(props)
        this.tileMapUrl = "http://172.16.157.30:6080/arcgis/rest/services/nsbd15/MapServer"
    }
    
    componentDidMount(){
        // setTimeout(()=>{
            this.getData();//获取水渐变数据
            this.initMap();//初始化地图
        // },1000) 
    }
    
    changeDate(date,dateStr){
        console.log("你选择的时间段是：");
        console.log(dateStr);
        this.setState({startTime:dateStr[0],endTime:dateStr[1]});
    }
    getData(){
        $.ajax({
			type: 'post',
			url: 'http://172.16.157.4:8080/result/getWaterIndex',
			async: false,
			data:{
					startTime: "2017-09-30",
					endTime: "2017-11-30"
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
              let map = new Map('mapDiv', {
                //   showLabels: true,
                //   extent: extent,
                    zoom: 8,
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
            this.state.pointsJcd.forEach((v,idx)=>{
                var jcdSimple = {
                    "url":jcdPic,
                    "height":32,
                    "width":20,
                    "type":"esriPMS"
                  };
                addPoint(jcdLayer,v,jcdSimple);
            });
            map.addLayer(jcdLayer);
            //添加供水口
            this.state.pointsGsk.forEach((item,idx)=>{
                let textSimple = {
                    "type": "esriTS",
                    "style": "normal",
                    "color": [0,255,255,255],
                    "text": item.name,
                    "xoffset": 5,
                    "yoffset": 5,
                    "horizontalAlignment":"left",
                    "weight": "blod",
                    "size":12
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
                    "color": [255,255,0,255],
                    "text": item.name,
                    "xoffset": -5,
                    "yoffset": -5,
                    "horizontalAlignment":"right",
                    "weight": "blod",
                    "borderLineColor":[0,0,0,255],
                    "size":12
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
                //
                var color = [255,0,0,255];
                if(idx%2){
                    color = [0,255,0,255];
                }
                //
                layers[idx] = new GraphicsLayer({
                    id: idx,
                    visible:true
                });
                // console.log(item.time);
                console.log(idx);
                
                let time = item.time;
                let lineData = item.lineData;
                let pointData = item.pointData;
                // graphicLayer.clear();//每重新添加一个时刻的图层，先清除上一次的图层
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
                map.addLayer(layers[idx]);
                console.log(layers[idx]);
            }
            //递归调用，动画循环函数
            function aminate(){
                for(var i=0;i<layers.length;i++){
                    // map.removeAllLayers();
                    // map.addLayer(layers[i]);
                        layers.forEach((layer,idx)=>{
                            if(layer.id==i){
                                layer.show();
                            }else{
                                layer.hide();
                            }
                        });
                };
                // aminate();
                    // console.log("循环结束");
            }
            setTimeout(()=>{
                this.state.data.forEach((item,index)=>{
                    // this.setState({timeText:item.time});
                    addGraphic(item,index);
                    // aminate();
                });
                // map.addLayers(layers);
                console.log(map);
            },1000);
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
                    <div className="text-box">
                    <span>{this.state.timeText}</span>
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
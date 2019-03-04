import React, { Component, PropTypes } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card ,Button } from 'antd';
import img1 from '../../assets/chart1.png';
import img2 from '../../assets/chart2.png';
import img3 from '../../assets/sanwei2.jpg';
import jcd from '../../assets/jcd.png';
import './style/index.less';
import lineOption from '../../component/echarts/line-option';
import barOption from '../../component/echarts/bar-option';
import $ from 'jquery';
export class Drawchart extends Component {
  state = { 
        visible: false,
        attr: {key:'ph',label:'PH'},
        startTime: "2017-09-30",
        endTime: "2017-10-30",
        cData:[{
            name:'监测点1',
            time:['2017-9-30 06:00','2017-9-30 12:00','2017-9-30 12:00'],
            ph: [0,0,0]
            },{
            name:'监测点2',
            time:['2017-9-30 06:00','2017-9-30 12:00','2017-9-30 12:00'],
            ph: [0,0,0]
            }]
    };
    // constructor(props) {
    //     super();
    //     this.state = {
    //         startTime: props.startTime,
    //         endTime: props.endTime
    //     }
    // }
    componentWillReceiveProps(nextProps) {
        this.setState({
            startTime: nextProps.startTime,
            endTime: nextProps.endTime,
            attr: nextProps.attr
        });
        this.getData();
    }
    // componentDidMount(){
    //     this.getData();
    // }   
  getData(){
    $.ajax({//获取浓度数据
        type: 'post',
        url: 'http://172.16.157.4:8080/result/getWaterConcentration',
        async: false,
        data:{
                startTime: this.state.startTime,
                endTime: this.state.endTime
        },
        // dataType: "jsonp",
        success: function(data){
            let cData = JSON.parse(data);
            // console.log("请求浓度数据成功:");
            this.setState({cData});
            return;
        }.bind(this),
        error: function(){
            console.log("请求错误");
        }
    });
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
        <div style={{width:'100%',height:'100%',padding:'0 12px'}}>
            <Card
                title={this.state.attr.label+"监测"}
                extra={<a href="#">更多</a>}
                style={{ width: 360,height: 260,marginTop: '0px' }}
            >
                <ReactEcharts style={{width:'100%',height:'252px'}}
                    option={lineOption(this.state.cData,this.state.attr)}
                />  
            </Card>
            <Card
                title="浓度比率"
                // title={this.state.startTime}
                extra={<a href="#">更多</a>}
                style={{ width: 360,height: 260,marginTop: '2px' }}
            >
                {/* <img src={img2}/> */}
                <ReactEcharts style={{width:'100%',height:'252px'}}
                    option={barOption(this.state.cData)}
                />  
            </Card>
            <Card
                title="三维仿真"
                extra={<a href="#">查看</a>}
                style={{width: 360,height: 260,marginTop: '2px' }}
            >
                {/* <img src={img3} style={{width:'100%',height:'100%'}}/> */}
            </Card>
        </div>
    );
  }
}
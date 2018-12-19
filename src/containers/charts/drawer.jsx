import React, { Component, PropTypes } from 'react';
import { Card ,Button } from 'antd';
import img1 from '../../assets/chart1.png';
import img2 from '../../assets/chart2.png';
import img3 from '../../assets/chart3.png';
import jcd from '../../assets/jcd.png';
import './style/index.less';
// import Linechart from '../../component/echarts/lineChart';
export class Drawchart extends Component {
  state = { visible: false };

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
            {/* <Button type="primary" onClick={this.showDrawer}>
            Open
            </Button> */}
            <Card
                title="情况预测"
                extra={<a href="#">更多</a>}
                style={{ width: 360,height: 280,marginTop: '0px' }}
            >
               {/* <img src={jcd}/> */}
            </Card>
            <Card
                title="浓度比率"
                extra={<a href="#">更多</a>}
                style={{ width: 360,height: 280,marginTop: '12px' }}
            >
                <img src={img2}/>
            </Card>
            <Card
                title="资源估计"
                extra={<a href="#">更多</a>}
                style={{width: 360,height: 280,marginTop: '12px' }}
            >
                <img src={img3}/>
            </Card>
        </div>
    );
  }
}
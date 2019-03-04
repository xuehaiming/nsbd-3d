import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { Input } from 'antd';
// 公共面包屑
/* 以类的方式创建一个组件 */
import styles from './style/borderSet.less';
import sanwei from '../../assets/sanwei.png';
export class  Borderset extends Component {

	render() {
		return (	
		<div className="border-content">
            <div className="left-box">
                <div>
                    <span>模型类型：<Input style={{width:120}}/></span>
                    <span>模型名称：<Input style={{width:120}}/></span>
                </div>
                <div className="left-content">
                    <img src={sanwei} alt="aaa" style={{width:'100%',height:'100%'}}/>
                </div>
            </div>
            <div className="right-box">
            bbbbbbbbbbbbbb
            </div>
		</div>
		);
	}
}


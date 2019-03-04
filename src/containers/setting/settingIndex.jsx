import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { Tabs } from 'antd';
// 公共面包屑
import { Bcrumb } from '../../component/bcrumb/bcrumb';
import {Borderset} from './borderSet';
/* 以类的方式创建一个组件 */
import styles from './style/setting.less';
const TabPane = Tabs.TabPane;

class Main extends Component {
    constructor(props) {
    	super(props);
	}

	callback(key) {
		console.log(key);
	}
	  
	render() {
		return (	
		<div className="setting-container">
			<Bcrumb title="边界设置" icon="setting" />
			<div className="setting-content">
				<Tabs defaultActiveKey="3" onChange={this.callback()}>
					<TabPane tab="结果查询" key="1">Content of Tab Pane 1</TabPane>
					<TabPane tab="对比展示" key="2">Content of Tab Pane 2</TabPane>
					<TabPane tab="边界条件设置" key="3">
						<Borderset></Borderset>
					</TabPane>
				</Tabs>
			</div>
		</div>
		);
	}
}
Main.contextTypes = {
};
export default Main;
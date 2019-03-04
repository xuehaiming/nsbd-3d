import React, { Component, PropTypes } from 'react';
import { is, fromJS } from 'immutable';
import Config from '../../config/index';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { Layout, Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
/**
 * 公共菜单
 *
 * @export
 * @class Lmenu
 * @extends {Component}
 */
export class Lmenu extends Component {
	constructor(props, context) {
		super(props, context); //后才能用this获取实例化对象
		const openKeys = Config.localItem('OPENKEY') ? [Config.localItem('OPENKEY')] : [];
		this.state = {
			openKeys: openKeys
		};
	}
    onOpenChange = (openKeys) => {
	    const state = this.state;
	    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
	    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

	    let nextOpenKeys = [];
	    if (latestOpenKey) {
	      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
	    }
	    if (latestCloseKey) {
	      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
	    }
	    Config.localItem('OPENKEY', nextOpenKeys);
	    this.setState({ openKeys: nextOpenKeys });
	}
  	getAncestorKeys = (key) => {
	    const map = {
	      sub3: ['sub2'],
	    };
	    return map[key] || [];
	}
	render() {
		const defaultSelectedKey = process.env.NODE_ENV !== 'production' ? [location.pathname.split('/')[location.pathname.split('/').length - 1] || 'home'] : [location.hash.split('/')[location.hash.split('/').length - 1].split('?')[0] || 'home'];
		return (
			<Menu openKeys={this.state.openKeys} onOpenChange={this.onOpenChange} theme="dark" mode={this.props.mode} defaultSelectedKeys={defaultSelectedKey}>
		        <Menu.Item key="home">
			        <Link to="/home">
		              <Icon type="laptop" />
		              {!this.props.collapsed && <span className="nav-text">ArcGis地图</span>}
		          </Link>
	          </Menu.Item>

            {/* <SubMenu key="chart" title={<span><Icon type="dot-chart" /><span className="nav-text">百度地图</span></span>}>
              <Menu.Item key="line"><Link to="/chart/line">选项一</Link></Menu.Item>
	          </SubMenu> */}
						
						<Menu.Item key="chart">
							<Link to="/chart/line">
		              <Icon type="dot-chart" />
		              {!this.props.collapsed && <span className="nav-text">百度地图</span>}
		          </Link>
						</Menu.Item>

	            {/* <SubMenu key="general" title={<span><Icon type="team" /><span className="nav-text">基础组件</span></span>}>
                    <Menu.Item key="button"><Link to="/general/button">按钮</Link></Menu.Item>
                    <Menu.Item key="icon"><Link to="/general/icon">图标</Link></Menu.Item>
							</SubMenu> */}
							
              <Menu.Item key="user">
			        <Link to="/user">
		              <Icon type="user" />
		              {!this.props.collapsed && <span className="nav-text">用户管理</span>}
		            </Link>
	            </Menu.Item>
	           
	            <Menu.Item key="adver">
								<Link to="/adver">
									<Icon type="notification" />
									{!this.props.collapsed && <span className="nav-text">三维展示</span>}
								</Link>
	            </Menu.Item>
	            {/* <SubMenu
	              key="sub1" title={<span><Icon type="team" /><span className="nav-text">人员管理</span></span>}
	            >
	              <Menu.Item key="oneui"><Link to="/ui/oneui">组件一</Link></Menu.Item>
	              <Menu.Item key="twoui"><Link to="/ui/twoui">组件二</Link></Menu.Item>
	            </SubMenu>
	            <SubMenu key="sub2" title={<span><Icon type="setting" /><span className="nav-text">闸阀管理</span></span>}>
			          <Menu.Item key="9">Option 9</Menu.Item>
			          <Menu.Item key="10">Option 10</Menu.Item>
							</SubMenu>
							
							<Menu.Item key="setting">
	            <Link to="/setting">
	              <Icon type="setting" />
	              {!this.props.collapsed && <span className="nav-text">边界设置</span>}
	            </Link>
	            </Menu.Item> */}
	        </Menu>
		)
	}
}
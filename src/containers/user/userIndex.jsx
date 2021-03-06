import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import Config from '../../config/index';
// import {Drawchart} from '../charts/drawer';
// import { Drawer, Button } from 'antd';

// 公共面包屑
import { Bcrumb } from '../../component/bcrumb/bcrumb';

import styles from './style/user.less';
import $ from 'jquery'

/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
    	super(props);
        this.state = {
            loading: false,
            userInfo: []
        };
	}
	getData(){
		$.ajax({
			type: 'post',
			url: 'http://172.16.157.4:8080/result/getWaterIndex',
			async: false,
			data:{
					startTime: "2017-09-30",
					endTime: "2017-10-1"
			},
			// dataType: "jsonp",
			success: function(data){
				var result = JSON.parse(JSON.stringify(data));
				console.log("请求成功");
				console.log(result);
				return;
			},
			error: function(){
				console.log("有问题");
			}
		});

		fetch('http://172.16.157.4:8080/result/getWaterIndexByLineStr',{
			mode: "cors",
			headers:{
				"Content-Type": "application/x-www-form-urlencoded"
			},
			method: 'get'
		}).then(function(response) {
			console.log(response);
			return response.json();
		  }).then(function(data) {
			// alert(JSON.stringify(data));
			console.log("线数据");
			console.log(data);
		  }).catch(function(e) {
			console.log("Oops, error");
		  });
	}
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    getUserInfo = (params={}) => {  // 加载用户列表信息
    	this.setState({ loading: true });
		this.props.getData('/user/userList', params, (res) => {  
			this.saveLoading(false);
            if(res.code == Config.errorCode.success) {
            	const pagination = { ...this.state.pagination };
            	pagination.total = res.recordsTotal; // 总页数
            	pagination.current = params.page; // 当前页数
            	this.setState({ 
            		userInfo: res.data,
			        pagination
            	});
         	} else {
         		message.error(res.msg);
         	}
        }, 'userUsers', 'GET');
	}
	render() {
     	const columns = [{
			title: '用户名',
			dataIndex: 'userName',
			key: 'userName'
		}, {
			title: '姓名',
			dataIndex: 'name',
			key: 'name'
		}, {
			title: '邮箱',
		  	dataIndex: 'email',
		  	key: 'email'
		}, {
		  	title: '角色',
		  	dataIndex: 'roleName',
		  	key: 'roleName'
		}, {
		  	title: '创建时间',
		  	dataIndex: 'createDate',
		  	key: 'createDate',
		  	render: (text, record) => (
    			<span>
     				{Config.formatDateTime(text)}
    			</span>
  			)
		}, {
		  	title: '操作',
		  	key: 'action',
		  	render: (text, record) => (
		    	(record.roleLevel&&record.roleLevel>curRoleLevel) ? 
			  		<span>
			    		<a href="javascript:;" onClick={this.editUser.bind(this, record)}>编辑</a>
			    		<span className="ant-divider" />
			    		<a href="javascript:;" className="ant-dropdown-link" onClick={this.changeState.bind(this, record.clientId, record.name, record.available)}>{record.available==1?'停用':'启用'}</a>
			    		<span className="ant-divider" />
			    		<a href="javascript:;" onClick={this.delUser.bind(this, record.clientId, record.name)}>删除</a>
			    	</span>
				    :	
			     	<span>
			    		<span className="cole5e5e5">编辑</span>
			    		<span className="ant-divider"/>
			    		<span className="cole5e5e5">{record.available==1?'停用':'启用'}</span>
			    		<span className="ant-divider" />
			    		<span className="cole5e5e5">删除</span>
			    	</span>
		  	)
		}];

        let userInfo = this.state.userInfo;  // 用户信息数据 
		return (	
		<div className="user-container">
            <Bcrumb title="用户管理" icon="user" />
			用户管理
			<a href="myprotocol://">打开程序</a>
			<button onClick={() => this.getData()}>getJSON</button>
		</div>
		);
	}
}

Main.contextTypes = {
};

export default Main;


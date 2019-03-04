import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import $ from 'jquery';
import * as THREE from 'three';
// import THREE from '../../common/three.min.js'
// import Stats from '../../common/threejs/stats.js'
// import dat from '../../common/threejs/dat.gui.js'
// import OBJMTLLoader from '../../common/threejs/OBJMTLLoader.js'

import React3 from "react-three-renderer";
import ObjectModel from 'react-three-renderer-objects';
import modelobj from '../../assets/model/model.obj'
import modelmtl from '../../assets/model/model.mtl'
/* 以类的方式创建一个组件 */
class Adver extends Component {
    constructor(props) {
		super(props);
		this.state = {
		  scene: {}
		};
	  }
	componentDidMount() {
		const { scene } = this.refs;
		this.setState({ scene });
	  }
	render() {
		let width = window.innerWidth;
		let height = window.innerHeight;
		return (
		  <React3
			mainCamera="camera"
			width={width}
			height={height}
			alpha={true}
		  >
			<scene ref="scene">
			  <perspectiveCamera
				key={`perspectiveCamera`}
				name="camera"
				fov={75}
				aspect={width / height}
				near={0.1}
				far={1000}
				position={new THREE.Vector3(0, 0, 25)}
				lookAt={new THREE.Vector3(0, 0, 0)}
			  />
			  <group name="carGroup">
				<ObjectModel
				  name="boat"
				  model={modelobj}
				  material={modelmtl}
				  scene={this.state.scene}
				  group="carGroup"
				/>
			  </group>
			</scene>
		  </React3>
		);
	  }
	

}

export default Adver;

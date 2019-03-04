import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import {Drawchart} from '../charts/drawer';
import $ from 'jquery';
import * as THREE from 'three';
import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader'
import Stats from '../../common/threejs/stats.js'
import dat from '../../common/threejs/dat.gui.js'
import './style/index.less';
// import * as OBJLoader from 'three-obj-loader'
// import * as MTLLoader from 'three-mtl-loader'
// import THREE from '../../common/three.min.js'
/* 以类的方式创建一个组件 */
// OBJLoader(THREE);
// MTLLoader(THREE);
import img0 from  '../../assets/model/model0.png'
import img1 from '../../assets/model/model1.png'
import img2 from '../../assets/model/model2.png'
import img3 from '../../assets/model/model3.png'
import img4 from '../../assets/model/model4.png'
import '../../assets/model/model.obj'
import '../../assets/model/model.mtl'


class Adver extends Component {
    constructor(props) {
		super(props);
		this.state = {
		  scene: {}
		};
	  }
	componentDidMount() {
		this.initModel();
		}
	initModel(){
			var path = window.document.location.href;
			console.log(img0,img1,img2,img3,img4);
			console.log("adver-----");
			THREE.MTLLoader = MTLLoader
			THREE.OBJLoader = OBJLoader
			this.THREE = THREE

			var container, stats;

			var camera, scene, renderer;

			var mouseX = 0, mouseY = 0;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;


			init();
			animate();


			function init() {
				console.log("init");
				
				// container = document.createElement( 'div' );
				// document.body.appendChild( container );
				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.x = -400;
				camera.position.y = 1050;
				camera.position.z = 250;

				// scene

				scene = new THREE.Scene();

				var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
				scene.add( ambientLight );

				var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
				camera.add( pointLight );
				scene.add( camera );

				// model

				var onProgress = function ( xhr ) {

					if ( xhr.lengthComputable ) {

						var percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

					}

				};

				var onError = function () { };

				//THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

				let mtlLoader = new THREE.MTLLoader();
				let objLoader = new THREE.OBJLoader();

				
					mtlLoader.setPath( 'http://localhost:8082/antd/dist/' )
					.load( 'model.mtl', function ( materials ) {
						console.log("materials");
						console.log(materials);
						materials.preload();
							objLoader.setMaterials( materials )
							.setPath( 'http://localhost:8082/antd/dist/' )
							.load( 'model.obj', function ( object ) {
								object.position.y = - 95;
								scene.add( object );
							}, onProgress, onError );
					} );
					console.log(mtlLoader);

				//

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				// container.appendChild( renderer.domElement );
				$("#WebGL-output").append(renderer.domElement);
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onDocumentMouseMove( event ) {

				mouseX = ( event.clientX - windowHalfX ) / 2;
				mouseY = ( event.clientY - windowHalfY ) / 2;

			}

			//

			function animate() {

				requestAnimationFrame( animate );
				render();

			}

			function render() {

				camera.position.x += ( mouseX - camera.position.x ) * .05;
				camera.position.y += ( - mouseY - camera.position.y ) * .05;

				camera.lookAt( scene.position );

				renderer.render( scene, camera );

			}
			
	}
	render() {
		let width = window.innerWidth;
		let height = window.innerHeight;
		return (
		<div className="ader-container">
			<div id="WebGL-output">
			</div>
			<div className="drawer-chart" >
				<Drawchart></Drawchart>
			</div>
		</div>
		);
	  }
	

}

export default Adver;

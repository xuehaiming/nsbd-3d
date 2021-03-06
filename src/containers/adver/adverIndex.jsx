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
import google from '../../assets/textures/google.jpg'
import back from '../../assets/textures/skybox/back.png'
import bottom from '../../assets/textures/skybox/bottom.png'
import front from '../../assets/textures/skybox/front.png'
import left from '../../assets/textures/skybox/left.png'
import right from '../../assets/textures/skybox/right.png'
import top from '../../assets/textures/skybox/top.png'
import '../../assets/model/model.obj'
import '../../assets/model/model.mtl'

var directions = [right,left,top,bottom,back,front];
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

			var camera, renderer;

			var mouseX = 0, mouseY = 0;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;
			
			var scene = new THREE.Scene();

			init();
			animate();


			function init() {
				console.log("init");
				
				// container = document.createElement( 'div' );
				// document.body.appendChild( container );
				
				//camera
				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
				camera.position.x = 0;
				camera.position.y = 0;
				camera.position.z = 250;
				camera.lookAt(new THREE.Vector3(0, 0, 0));

				//Light
				var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
				scene.add(ambientLight);
				var spotLight = new THREE.SpotLight(0xffffff);
				spotLight.position.set(1000, 1000, -1000);
				spotLight.intensity = 2;
				scene.add(spotLight);
				scene.add(camera);

				// create the ground plane
				var planeGeometry = new THREE.PlaneGeometry(1000,1000,1,1);
				var texture = THREE.ImageUtils.loadTexture(google,null,function(t)
				{
				});
				var planeMaterial =  new THREE.MeshBasicMaterial({map:texture});
				var plane = new THREE.Mesh(planeGeometry,planeMaterial);
				plane.receiveShadow  = true;

				// rotate and position the plane
				plane.rotation.x=-0.5*Math.PI;
				plane.position.x= 0;
				plane.position.y= -40;
				plane.position.z= 0;

				scene.add(plane);

				// skybox
				// var path = "textures/skybox/";//设置路径
				// var directions  = ["right", "left", "top", "bottom", "back", "front"];//获取对象
				// var format = ".png";
				//创建盒子，并设置天空盒子的大小为( 1000, 1000, 1000 )
				var skyGeometry = new THREE.BoxGeometry( 1000, 1000, 1000 );
				var materialArray = [];
				for (var i = 0; i < 6; i++)
					materialArray.push( new THREE.MeshBasicMaterial({
						map: THREE.ImageUtils.loadTexture(directions[i]),//将图片纹理贴上
						side: THREE.BackSide/*镜像翻转，如果设置镜像翻转，那么只会看到黑漆漆的一片，因为你身处在盒子的内部，所以一定要设置镜像翻转。*/
					}));
				var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
				var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );//创建一个完整的天空盒，填入几何模型和材质的参数
				scene.add( skyBox );
				
				// obj_mtl model
				var onProgress = function ( xhr ) {

					if ( xhr.lengthComputable ) {

						var percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

					}

				};

				var onError = function () { };

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
							//set model position  rotation  scale
							object.rotation.x = -Math.PI / 2;
							object.rotation.z = -Math.PI / 2;
							//object.position.x = -90;
							object.scale.set(2, 2, 2);
							scene.add( object );
							}, onProgress, onError );
					} );
					console.log(mtlLoader);

				
				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				// container.appendChild( renderer.domElement );
				$("#WebGL-output").append(renderer.domElement);
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );

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

				camera.position.x += ( mouseX - camera.position.x ) * 0.001;
				camera.position.y += ( - mouseY - camera.position.y ) * 0.001;
				if (camera.position.x > 20) 
					camera.position.x = 20;
				if (camera.position.x < -40) 
					camera.position.x = -40;
				if (camera.position.y < -30) 
					camera.position.y = -30;
				if (camera.position.z >= -60)
					//camera沿着z轴负方向（屏幕里面）移动
					// setTimeout(function(){
						camera.position.z -= 0.4;
					// },500);
				renderer.render( scene, camera );
			}
	}
	render() {
		// let width = window.innerWidth;
		// let height = window.innerHeight;
		return (
		<div className="ader-container">
			<div id="WebGL-output">
			</div>
			{/* <div className="drawer-chart" >
				<Drawchart></Drawchart>
			</div> */}
		</div>
		);
	  }
	

}

export default Adver;

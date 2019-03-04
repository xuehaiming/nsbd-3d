import React, { Component, PropTypes } from 'react';
import {Tick,MTLModel,OBJModel} from 'react-3d-viewer'
import * as OBJLoader from 'three-obj-loader';
// import modelobj from '../../assets/model/model.obj'
// import modelmtl from '../../assets/model/model.mtl'
class Adver extends Component {
    componentWillMount(){
        // this.tick.animate = false
    }
    componentDidMount(){
      // this.tick = Tick(()=>{
      //   var {rotation} = this.state
      //   rotation.y += 0.005
      //   this.setState({rotation})
    
      // })
    }
    render(){
    return(
        <div>
        {/* <MTLModel 
            enableZoom = {false}
            position={{x:0,y:-100,z:0}}
            // rotation={this.state.rotation}
            mtl={modelmtl}
            src={modelobj}
        /> */}
        <OBJModel src="../../assets/model/model.obj" texPath=""/>
        </div>
    )
    }

}
export default Adver;
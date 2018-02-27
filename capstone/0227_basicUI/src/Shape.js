/**
 * Created by zhaonan on 2018/2/25.
 */
import React, {Component} from 'react';
import * as THREE from 'three';
// import * as ReactTHREE from 'react-three';

class Shape extends Component {

    constructor(props) {
        super(props);
        this.lastShapeText = "none";
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.animate = this.animate.bind(this);
        this.windowWidth = window.innerWidth;
        this.handleResize = this.handleResize.bind(this);
    }

    handleResize(e) {
        this.setState({windowWidth: window.innerWidth});

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth , window.innerHeight);
    }



    componentDidMount() {


        // const width = this.mount.clientWidth;//clientWidth vd innerWidth?
        // const height = this.mount.clientHeight;
        const width = window.innerWidth;
        const height = window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        );
        //render
        const renderer = new THREE.WebGLRenderer();

        renderer.setClearColor(new THREE.Color(0x000000), 1.0);
        renderer.setSize(width, height);
        renderer.shadowMapEnabled = true;
        //geometry
        const geoTemp = this.props.shapeGeo;
        //const cubeGeometry = new THREE.BoxGeometry(20, 20, 20);
        //material
        const shapeMaterial = new THREE.MeshLambertMaterial({color: 0xEEEEEE});
        //actual object
        const shapeMesh = new THREE.Mesh(geoTemp, shapeMaterial);
        //add
        scene.add(shapeMesh);
        //lightening
        const ambientLight = new THREE.AmbientLight(0x0c0c0c);
        scene.add(ambientLight);
        const spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40, 60, -10);
        spotLight.castShadow = true;
        scene.add(spotLight);


        camera.position.x = -30;
        camera.position.y = 40;
        camera.position.z = 30;
        camera.lookAt(scene.position);

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.material =  shapeMaterial;
        this.shapeMesh = shapeMesh;
       // this.lastShapeText = "none";//this.props.shapeText;

        this.mount.appendChild(this.renderer.domElement);
        this.start();

        //HTML event listener
        window.addEventListener('resize', this.handleResize);

    }

    componentWillUnmount() {
        this.stop();
        this.mount.removeChild(this.renderer.domElement);
        window.removeEventListener('resize', this.handleResize);
    }

    start() {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    }

    stop() {
        cancelAnimationFrame(this.frameId);
    }

    checkChangeShape(){

        if(this.props.shapeText !== this.lastShapeText){
            console.log("change shape!");
            console.log("this.lastShapeText is " + this.lastShapeText );
            this.lastShapeText = this.props.shapeText;

            this.scene.remove(this.shapeMesh);
            const geoTemp = this.props.shapeGeo;
            this.shapeMesh = new THREE.Mesh(geoTemp, this.material);
            this.scene.add(this.shapeMesh);
        }
    }

    animate() {
        this.shapeMesh.rotation.x += 0.01;
        this.shapeMesh.rotation.y += 0.01;
        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
    }

    renderScene() {
        this.checkChangeShape();
        this.renderer.render(this.scene, this.camera)
    }

    render() {
        console.log(this.lastShapeText + " " + this.props.shapeText);
        return (
            <div className="Shape"
                 // style={{ width: '100%', height: '700px' }}
                 ref={(mount) => { this.mount = mount }}
            >
            </div>
        );
    }
}

export default Shape;

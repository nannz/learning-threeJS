/**
 * Created by zhaonan on 2018/2/8.
 */
var scene;
var camera;
var renderer;
function init(){
    //cal & show fps at first!
    var stats = initStats();

    //the place to put threejs stuff
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColorHex();
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    //apply the shadow!
    renderer.shadowMapEnabled = true;

    //create a cube
    var cubeGeometry = new THREE.BoxGeometry(20, 20, 20);
    var meshMaterial1 = createMaterial("vertex-shader", "fragment-shader-2");
    var material = new THREE.MeshFaceMaterial([meshMaterial1, meshMaterial1, meshMaterial1, meshMaterial1, meshMaterial1, meshMaterial1]);
    var cube = new THREE.Mesh(cubeGeometry, material);

    scene.add(cube);

    camera.position.x = 30;
    camera.position.y = 30;
    camera.position.z = 30;
    camera.lookAt(scene.position);

// add subtle ambient lighting
    var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    document.getElementById("WebGL-output")
        .appendChild(renderer.domElement);


    //these two functions are in the init() function!!!
    //add some animation
    var step = 0;
    var oldContext = null;
    var controls = new function () {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;

        this.opacity = meshMaterial1.opacity;
        this.transparent = meshMaterial1.transparent;

        this.visible = meshMaterial1.visible;
        this.side = "front";

        this.wireframe = meshMaterial1.wireframe;
        this.wireframeLinewidth = meshMaterial1.wireframeLinewidth;

        this.selectedMesh = "cube";

        this.shadow = "flat";
    };
    var gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'bouncingSpeed', 0, 0.5);



    renderScene();
    function renderScene(){
        //stats for fps
        stats.update();
        //cube animation
        cube.rotation.y = step += 0.01;
        cube.rotation.x = step;
        cube.rotation.z = step;

        cube.material.materials.forEach(function (e) {
            e.uniforms.time.value += 0.01;
        });

        //call back function
        requestAnimationFrame(renderScene);
        renderer.render(scene,camera);
    }
    function initStats(){
        var stats = new Stats();
        stats.setMode(0);//0 for fps, 1 for rendering time
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        stats.domElement.style.width = '10 px';
        document.getElementById("Stats-output")
            .appendChild(stats.domElement);
        return stats;
    }
}

function onResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth , window.innerHeight);
}
function createMaterial(vertexShader, fragmentShader) {
    var vertShader = document.getElementById(vertexShader).innerHTML;
    var fragShader = document.getElementById(fragmentShader).innerHTML;

    var attributes = {};
    var uniforms = {
        time: {type: 'f', value: 0.2},
        scale: {type: 'f', value: 0.2},
        alpha: {type: 'f', value: 0.6},
        resolution: {type: "v2", value: new THREE.Vector2()}
    };

    uniforms.resolution.value.x = window.innerWidth;
    uniforms.resolution.value.y = window.innerHeight;

    var meshMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        attributes: attributes,
        vertexShader: vertShader,
        fragmentShader: fragShader,
        transparent: true

    });
    return meshMaterial;
}



window.onload = init;

window.addEventListener('resize', onResize,false);//string, function, bool(optional)
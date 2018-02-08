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
    camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000)
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColorHex();
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    //apply the shadow!
    renderer.shadowMapEnabled = true;

    var axes = new THREE.AxisHelper(20);
    scene.add(axes);

    var planeGeometry = new THREE.PlaneGeometry(60, 20);
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;//i should have other's shadow on me!
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 10;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    // create a red cube
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true; //i should have shadow!
    cube.position.x = -5;
    cube.position.y = 3;
    cube.position.z = 0;
    scene.add(cube);
    // create a sphere with light reflection
    var sphereGeometry = new THREE.SphereGeometry(2, 20, 20);
    var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
    var sphere1 = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere1.castShadow = true;//i should have shadow!
    sphere1.position.x = 5;
    sphere1.position.y = 4;
    sphere1.position.z = 2;
    scene.add(sphere1);
    // create a sphere - only wireframes
    var sphereGeometry2 = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial2 = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true});
    var sphere2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
    sphere2.position.x = 20;
    sphere2.position.y = 4;
    sphere2.position.z = 2;
    scene.add(sphere2);

    //add light
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40,60,-10);
    spotLight.castShadow = true; //make the light to cast shadow.
    scene.add(spotLight);


    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    document.getElementById("WebGL-output")
        .appendChild(renderer.domElement);


    //these two functions are in the init() function!!!
    //add some animation
    var step = 0;

    var controls = new function () {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
    };
    var gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'bouncingSpeed', 0, 0.5);


    renderScene();



    function renderScene(){
        //stats for fps
        stats.update();
        //cube animation
        cube.rotation.x += controls.rotationSpeed;//use GUI to control the rotation
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;
        //sphere1 animation
        step+= controls.bouncingSpeed;//use GUI to control the step
        sphere1.position.x = 20 + (10 * Math.cos(step));
        sphere1.position.y = 2 + (10 * Math.abs(Math.sin(step)));
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



window.onload = init;

window.addEventListener('resize', onResize,false);//string, function, bool(optional)
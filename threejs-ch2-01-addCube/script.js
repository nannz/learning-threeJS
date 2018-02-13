/**
 * Created by zhaonan on 2018/2/9.
 */
//changed color is not working!!!!

var scene, camera, renderer;
var changedColor;
var planeGeo;
function init() {
    var stats = initStats();


    changedColor = new THREE.Color(0x0c0c0c);//0x0c0c0c;

    scene = new THREE.Scene();
    //scene.fog  = new THREE.FogExp2(0x862af7,0.11);
    scene.fog = new THREE.Fog(0x862af7, 0.045,150);
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    scene.add(camera);
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColorHex(0xEEEEEE);//slightly white
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    //don't forget shadow
    //add a plane to scene
    planeGeo = new THREE.PlaneGeometry(50, 30);
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0x42d9f4});//blue
    var plane = new THREE.Mesh(planeGeo, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 5;
    plane.position.y = -3;//y is 高度
    plane.position.z = 5;
    scene.add(plane);

    //add a light
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-20, 50, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    var ambientLight = new THREE.AmbientLight(changedColor);//0x0c0c0c);//black
    scene.add(ambientLight);

    //set up the camera
    camera.position.x = -10;
    camera.position.y = 40;
    camera.position.z = 40;
    camera.lookAt(scene.position);

    //add the render into the web
    document.getElementById("WebGL-output")
        .appendChild(renderer.domElement);


    var gui = new dat.GUI();
    //dat GUI controls
    var controls = new function () {
        this.ambientLightC = "#0c0c0c"; //not working yet
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
        this.numberOfObjects = scene.children.length;
        this.planePositionX = 5;
        this.planePositionY = -3;
        this.planePositionZ = 5;

        this.addCube = function () {
            var cubeSize = Math.ceil(Math.random()*4);
            var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
            var cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
            var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.name = "cube-" + scene.children.length;//name is from Object3D
            //!!Three.Scene.getObjectByName(name)
            cube.position.x = -25 + Math.random() * 50;//why planeGeo doesn't work?
            cube.position.z = -15 + Math.random() * 30;
            cube.position.y = Math.random()* 10;
            cube.castShadow = true;
            scene.add(cube);
            this.numberOfObjects = scene.children.length;
        };
        this.changeCubeColor = function(){
            var allChildren = scene.children;
            var lastObject = allChildren[allChildren.length - 1];
            //for loop of objects
            if(lastObject instanceof THREE.Mesh){;
                for(var i = 5; i < allChildren.length; i ++){
                    allChildren[i].material.color = new THREE.Color(Math.random() * 0xffffff);;
                }
            }ß
        };
        this.removeCube = function(){
            var allChildren = scene.children;
            var lastObject = allChildren[allChildren.length-1];
            if(lastObject instanceof THREE.Mesh){
                scene.remove(lastObject);
                this.numberOfObjects = scene.children.length;
            }
        };
        this.changeMaterial = function(){
            scene.overrideMaterial = new THREE.MeshLambertMaterial({color:0xffffff})
        };
        this.outputObjects = function(){
            console.log(scene.children);
        }

    };
    gui.addColor(controls, 'ambientLightC');
    changedColor = controls.ambientLightC.replace('#', '0x');
    gui.add(controls, 'addCube');
    gui.add(controls, 'removeCube');
    gui.add(controls, 'changeCubeColor');
    gui.add(controls, 'changeMaterial');
    gui.add(controls, 'planePositionX', -10, 10);
    gui.add(controls, 'planePositionY', -5, 20);
    gui.add(controls, 'planePositionZ', -10, 10);


    gui.add(controls, 'outputObjects');
    //end of GUI

    renderScene();


    function renderScene() {
        stats.update();
        //add animation changes
        plane.position.x = controls.planePositionX;
        plane.position.y = controls.planePositionY;
        plane.position.z = controls.planePositionZ;

        //add auto-rotation to all the cubes.
        //way 1: use for loop to go through all the cubes.
        /*
        var allChildren = scene.children;
        var lastObject = allChildren[allChildren.length - 1];
        if(lastObject instanceof THREE.Mesh){;
            for(var i = 5; i < allChildren.length; i ++){
                allChildren[i].rotation.x += 0.02;
                allChildren[i].rotation.y += 0.02;
                allChildren[i].rotation.z += 0.02;
            }
        }
        */
        //way 2 use travrerse, will go through all the objects in the scene
        scene.traverse(function(obj){
            if(obj instanceof THREE.Mesh && obj != plane){
                obj.rotation.x += 0.02;
                obj.rotation.y += 0.02;
                obj.rotation.z += 0.02;
            }
        });

        //apply animaiton
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);

    }

    function initStats() {
        var stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.getElementById("Stats-output")
            .appendChild(stats.domElement);
        return stats;
    }
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;
window.addEventListener('resize', onResize, false);
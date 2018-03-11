/**
 * Created by zhaonan on 2018/3/11.
 */
let orbit;

const pathIDs = [
    "path19702","path19704","path19710","path19712","path19714",
    "path19716","path19720", "path19722",
    "path19735","path19737","path19757","path19759","path19763","path19765",
    "path19767","path19680-1","path19694-1","path19696-5","path19698-2","path19781",
    "path19783","path19785","rect1929","path7251","path10798","path12570",
    // "path12571",
    "path19862",
    "path25184","path25318","path25320",
    "path19844-4","path19846-0","path19852-8","path19854-8",
    "path19858-4","path19860-5","path19808","path19812","path19814","path19816"
];
// once everything is loaded, we run our Three.js stuff.
function init() {

    let stats = initStats();

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    let scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);


    // create a render and set the size
    const webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMapEnabled = true;

    //for text
    let options = {
        size: 0.5,
        height: 0,
        font: "helvetiker",
        curveSegments: 1
    };
    let textHelper;
    for(let i = 0; i < pathIDs.length; i++){
        let actualShape = new THREE.ShapeGeometry(drawShape("#"+pathIDs[i]));
        // actualShape.applyMatrix(new THREE.Matrix4().makeTranslation(-390, -74, 0));
        let pointsGroup = new THREE.Object3D();//open a empty
        let points = actualShape.vertices;
        let mat = new THREE.MeshBasicMaterial({color:Math.random()*0xff0000, transparent:false});
        points.forEach((point)=>{
            //console.log(point.x);
            let geom = new THREE.SphereGeometry(0.3);
            // let mat = new THREE.MeshBasicMaterial({color:Math.random()*0xff0000, transparent:false});
            let mesh = new THREE.Mesh(geom, mat);
            mesh.position.x = point.x * 0.1;
            mesh.position.y = point.y * 0.1;
            mesh.position.z = point.z * 0.1;
            pointsGroup.add(mesh);


            textHelper = createMeshText(new THREE.TextGeometry(pathIDs[i], options));
            textHelper.position.x = point.x * 0.1;
            textHelper.position.y = point.y * 0.1;
            textHelper.position.z = point.z * 0.1;
            scene.add(textHelper);
        });
        scene.add(pointsGroup);
        console.log("finished! ", "#"+pathIDs[i]);
    }

    let exShapes = [];
    for(let i = 0; i< pathIDs.length; i++){
        let exShape = createMesh(new THREE.ShapeGeometry(drawShape("#"+pathIDs[i]))); //shapeGeometry can createPointsGeometry
        exShapes.push(exShape);
        scene.add(exShape);
    }




    let shape = createMesh(new THREE.ShapeGeometry(drawShape("#path19702"))); //shapeGeometry can createPointsGeometry
    scene.add(shape);

    // position and point the camera to the center of the scene
    camera.position.x = -80;
    camera.position.y = 80;
    camera.position.z = 80;
    camera.lookAt(new THREE.Vector3(60, -60, 0));

    var spotLight = new THREE.DirectionalLight(0xffffff);
    spotLight.position = new THREE.Vector3(70, 170, 70);
    spotLight.intensity = 0.7;

    spotLight.target = shape;

    scene.add(spotLight);

    // add the output of the renderer to the html element
    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    orbit = new THREE.OrbitControls(camera, webGLRenderer.domElement);

    // helper
    let axes = new THREE.AxisHelper(20);
    scene.add(axes);



    // call the render function
    let text;
    // setup the control gui
    let controls = new function () {
        this.size = 10;
        this.height = 0;
        this.font = "helvetiker";
        this.curveSegments=12;

        this.asGeom = function () {
            // remove the old plane
            scene.remove(text);
            // create a new one

            let options = {
                size: controls.size,
                height: controls.height,
                font: controls.font,
                curveSegments: controls.curveSegments
            };

            console.log(THREE.FontUtils.faces);

            //text = createMesh(new THREE.TextGeometry("Learning", options));
            scene.add(text);
        };
    };
    controls.asGeom();

    let gui = new dat.GUI();
    gui.add(controls, 'size', 0, 200).onChange(controls.asGeom);
    gui.add(controls, 'height', 0, 200).onChange(controls.asGeom);
    gui.add(controls, 'font', ['bitstream vera sans mono', 'helvetiker']).onChange(controls.asGeom);
    gui.add(controls, 'curveSegments', 1, 30).step(1).onChange(controls.asGeom);


    render();

    function drawShape(pathID) {
        let svgString0 = document.querySelector(pathID).getAttribute("d");
        let shape = transformSVGPathExposed(svgString0);
        // return the shape
        return shape;
    }

    function createMesh(geom) {//a shapeGeo
        const meshMaterial = new THREE.MeshPhongMaterial({
            color: 0x333333,
            shininess: 100,
            metal: true,
            wireframe: true
        });
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(-390, -74, 0));
        // geom.applyMatrix(new THREE.Matrix4().makeTranslation(-390, -74, 0));//Applies the matrix transform to the object and updates the object's position, rotation and scale.
        const mesh = new THREE.Mesh(geom, meshMaterial);
        mesh.scale.x = 0.1;
        mesh.scale.y = 0.1;
        mesh.rotation.z = Math.PI;
        mesh.rotation.x = -1.1;
        // return mesh;
        return mesh;
    }

    function createMeshText(geom) {

        // assign two materials
//            var meshMaterial = new THREE.MeshLambertMaterial({color: 0xff5555});
           let meshMaterial = new THREE.MeshNormalMaterial();
        // let meshMaterial = new THREE.MeshPhongMaterial({
        //     specular: 0xffffff,
        //     color: 0xeeffff,
        //     shininess: 100,
        //     metal: true
        // });
//            meshMaterial.side=THREE.DoubleSide;
        // create a multimaterial
        let plane = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);
        return plane;
    }

    function render() {
        stats.update();

        // shape.rotation.y = step += 0.005;
        orbit.update();


        // render using requestAnimationFrame
        requestAnimationFrame(render);
        webGLRenderer.render(scene, camera);
    }

    function initStats() {

        let stats = new Stats();
        stats.setMode(0); // 0: fps, 1: ms

        // Align top-left
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';

        document.getElementById("Stats-output").appendChild(stats.domElement);
        return stats;
    }
}
window.onload = init;
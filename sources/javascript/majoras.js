import * as THREE from 'three'
var OBJLoader = require('three-obj-loader');
OBJLoader(THREE);
import {TweenMax, Power2, TimelineLite} from "gsap";
import PlaneGeometry from './components/PlaneGeometry.js'
import CylinderGeometry from './components/CylinderGeometry.js'
import BoxGeometry from './components/BoxGeometry.js'
import TorusGeometry from './components/TorusGeometry.js'
/**
 * Scene
 */
const scene = new THREE.Scene();
const mouse = new THREE.Vector2();
const fadeScreen = document.querySelector('.fadeScreen');
let spikesCount = 0;
let directLight;

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let right, up, at;
let rotation = 0;
let rotationX = 0;
let directions = {};
let jump = 0;
let mask = 0;
let transition = 0;
let maskSelected = false;
let awakening = 0;

let majorasMask;
let majorasSpikes = [];

let cameraPreviousX = 0;
let cameraPreviousY = 0;


directions.forward = false;
directions.backward = false;
directions.left = false;
directions.right = false;
directions.up = false;
directions.down = false;

let speed = .2;
right = new THREE.Vector3();
up = new THREE.Vector3(12,12,12);
at = new THREE.Vector3();

const camera = new THREE.PerspectiveCamera(70, windowWidth / windowHeight, 0.1, 4000);
camera.matrix.extractBasis(right,up,at);
// camera.position.set(-150,12,150)
camera.position.set(32,620,1500);
scene.add(camera);

camera.matrix.extractBasis(right,up,at);

// Textures

const textureLoader = new THREE.TextureLoader();
const textures = {};
textures.wood = textureLoader.load('./images/DeadSpruceTreeTrunk.jpg');
textures.wood.wrapS = THREE.RepeatWrapping;
textures.wood.wrapT = THREE.RepeatWrapping;
textures.wood.repeat.x = 4;
textures.wood.repeat.y = 4;

// Heart Base //

var container, stats;
var group, shapes = [];
init();

function init(){


	// zeldascene Loader
	var zeldasceneLoader = new THREE.OBJLoader();
	var majorasTree = new THREE.OBJLoader();
    var material = new THREE.MeshPhongMaterial({color: 'grey', side: THREE.DoubleSide});
    var treeMaterial = new THREE.MeshPhongMaterial({map: textures.wood, side: THREE.DoubleSide});

	zeldasceneLoader.load('./../assets/objects/zeldascene.obj', function (zeldascene) {
		zeldascene.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				child.material = material;
			}
		});
		zeldascene.scale.set(300,300,300);
		zeldascene.castShadow = false;
        zeldascene.receiveShadow = true;
        zeldascene.position.x = 0;
        zeldascene.position.y = -220;
		zeldascene.position.z = -200;
        scene.add(zeldascene);
    });
    
    majorasTree.load('./../assets/objects/deadSpruce.obj', function (majorasTree) {
		majorasTree.traverse(function (child) {
			child.material = material;
		});
		majorasTree.scale.set(100,100,100);
		majorasTree.castShadow = false;
        majorasTree.receiveShadow = true;
        majorasTree.position.x = 11;
        majorasTree.position.y = 920;
		majorasTree.position.z = -1000;
        scene.add(majorasTree);
	});

  var light = new THREE.DirectionalLight(0x9955ff, 2);
  light.position.x = 0;
  light.position.z = 700;
  light.position.y = 1500;
  camera.add( light );
  directLight = light;
  
//   var light = new THREE.DirectionalLight(0x9955ff, 1);
//   light.position.x = 500;
//   light.position.y = -500;
//   light.position.z = -150;
//   camera.add( light );
  
 
  var x = 0, y = 0;
  var heartShape = new THREE.Shape();
  heartShape.moveTo( x + 25, y + 25 );
  heartShape.bezierCurveTo( x + 25, y + 25, x + 20, y, x, y );
  heartShape.bezierCurveTo( x - 30, y, x - 30, y + 35,x - 30,y + 35 );
  heartShape.bezierCurveTo( x - 30, y + 55, x - 10, y + 77, x + 25, y + 95 );
  heartShape.bezierCurveTo( x + 60, y + 77, x + 80, y + 55, x + 80, y + 35 );
  heartShape.bezierCurveTo( x + 80, y + 35, x + 80, y, x + 50, y );
  heartShape.bezierCurveTo( x + 35, y, x + 25, y + 25, x + 25, y + 25 );
  
  var extrudeSettings = { amount: 1, bevelEnabled: true, bevelSegments: 20, steps: 2, bevelSize: 20, bevelThickness: 10 };
  
  addShape( heartShape,  extrudeSettings,   0, 0, 0, 0.3);

//   addPlatform(32, 500, 1000, 100, 1);
//   addPlatform(32, 500, 500, 100, 2);
    
  
  
} 
const dood = new THREE.Mesh(
    new THREE.BoxGeometry(100*2, 100/3, 100*2),
    new THREE.MeshStandardMaterial({color: 0xff8866, metalness: 0.3, roughness: 0.3})
)
dood.dir = 1;
dood.position.x = 32;
dood.position.y = 500;
dood.position.z = 1000;
dood.castShadow = false;
dood.receiveShadow = true;
scene.add(dood);

const dood2 = new THREE.Mesh(
    new THREE.BoxGeometry(100*2, 100/3, 100*2),
    new THREE.MeshStandardMaterial({color: 0xff8866, metalness: 0.3, roughness: 0.3})
)
dood2.dir = 2;
dood2.position.x = 32;
dood2.position.y = 500;
dood2.position.z = 500;
dood2.castShadow = false;
dood2.receiveShadow = true;
scene.add(dood2);


function addShape( shape, extrudeSettings, x, y, z, s ) {
  var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
  var mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial({color: 0xfb6f49, metalness: 0.3, roughness: 0.8 }) );
  mesh.position.set( -8, 1038, -960 );
  mesh.rotation.set( 3, 0, 0 );
  mesh.scale.set( s, s, s );	
  shapes.push({shape: mesh, x: Math.random(), y: Math.random(), z: Math.random()});
  scene.add(mesh);
  majorasMask = mesh;
}


// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(windowWidth, windowHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

window.addEventListener(
    'resize',
    () =>{
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;

        camera.aspect = windowWidth / windowHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(windowWidth, windowHeight);
    }
)

const animate = () =>
{
    requestAnimationFrame(animate);
    //console.log(camera.position);

    // Jump animations
    if(jump == 1){
        if(transition < 1){
            transition += 0.01;
            if(camera.position.x != dood.position.x){
                camera.position.x += ((dood.position.x - camera.position.x)/10);
            }
            camera.position.z += (dood.position.z-camera.position.z)/18
            if(transition < 0.3){
                camera.position.y += 3;
            }else{
                if(camera.position.y > dood.position.y + 80){
                    camera.position.y -= 6;
                }else{
                    camera.position.y = dood.position.y + 80;
                }
            }
        }else{
            camera.position.x = dood.position.x;
            camera.position.z = dood.position.z;
        }
    }else if(jump == 2){
        if(transition < 2){
            transition += 0.01;
            if(camera.position.x != dood2.position.x){
                camera.position.x += ((dood2.position.x - camera.position.x)/10);
            }
            camera.position.z += (dood2.position.z-camera.position.z)/25
            if(transition < 1.3){
                camera.position.y += 2;
            }else{
                if(camera.position.y > dood2.position.y + 80){
                    camera.position.y -= 6;
                }else{
                    camera.position.y = dood2.position.y + 80;
                }
            }
        }else{
            camera.position.x = dood2.position.x;
            camera.position.z = dood2.position.z;
        }
    }else if(jump == 3){
        if(transition < 3){
            transition += 0.01;
            if(camera.position.x != 29){
                camera.position.x += ((29 - camera.position.x)/10);
            }
            camera.position.z += (-68 - camera.position.z)/30
            if(transition < 2.3){
                camera.position.y += 5;
            }else{
                if(camera.position.y > 643){
                    camera.position.y -= 6;
                }else{
                    camera.position.y = 643;
                }
            }
        }else{
            camera.position.x = 29;
            camera.position.z = -68;
        }
    }else if(jump == 4){
        if(transition < 4){
            transition += 0.01;
            if(camera.position.x != 60){
                camera.position.x += ((60 - camera.position.x)/10);
            }
            camera.position.z += (-432 - camera.position.z)/40
            if(transition < 3.3){
                camera.position.y += 5;
            }else{
                if(camera.position.y > 833){
                    camera.position.y -= 6;
                }else{
                    camera.position.y = 833;
                }
            }
        }else{
            camera.position.x = 60;
            camera.position.z = -432;
        }
    }else if(jump == 5){
        if(transition < 5){
            transition += 0.01;
            if(camera.position.x != -35){
                camera.position.x += ((-35 - camera.position.x)/10);
            }
            camera.position.z += (-673 - camera.position.z)/40
            if(transition < 4.3){
                camera.position.y += 5;
            }else{
                if(camera.position.y > 923){
                    camera.position.y -= 6;
                }else{
                    camera.position.y = 923;
                }
            }
        }else{
            camera.position.x = -35;
            camera.position.z = -673;
        }
    }else if(jump == 6 && (mask == 0)){
        if(transition < 6){
            transition += 0.01;
            if(camera.position.x != 0){
                camera.position.x += ((0 - camera.position.x)/10);
            }
            camera.position.z += (-820 - camera.position.z)/40
            if(transition < 5.3){
                camera.position.y += 3;
            }else{
                if(camera.position.y > 1038){
                    camera.position.y -= 6;
                }else{
                    camera.position.y = 1038;
                }
            }
        }else{
            camera.position.x = 0;
            camera.position.z = -820;
            mask = 1;
            transition = 0;
        }
    }

    // Mask reached

    if(mask == 1 && maskSelected){
        if(transition < 1){
            if(cameraPreviousX == 0 && cameraPreviousY == 0){
                cameraPreviousX = camera.position.x;
                cameraPreviousY = camera.position.y;
            }else{
                camera.position.x = cameraPreviousX;
                camera.position.y = cameraPreviousY;
            }
            camera.position.x += Math.round((Math.random() - 0.5)*3);
            camera.position.y += Math.round((Math.random() - 0.5)*3);
        }else{
            camera.position.x = cameraPreviousX;
            camera.position.y = cameraPreviousY;
        }
        if(majorasMask.position.z < -870){
            majorasMask.position.z += 0.1;
        }
        if((majorasMask.position.y < 1050)){
            majorasMask.position.y += 0.1;
        }
        
        if((majorasMask.position.z >= -870) && (majorasMask.position.y >= 1050)){
            transition = 1;
            if(spikesCount < 11){
                // Left Side
                console.log(majorasSpikes.length);
                if(spikesCount >= 1 && majorasSpikes.length < 1){
                        createSpike(-8, 1058, -872, 0);
                }else if(spikesCount >= 2 && majorasSpikes.length < 2){
                        createSpike(-22, 1040, -872, 1); 
                        majorasSpikes[1].rotation.z = 90;
                }else if(spikesCount >= 3 && majorasSpikes.length < 3){
                        createSpike(-19, 1030, -870, 2); 
                        majorasSpikes[2].rotation.z = 90;
                }else if(spikesCount >= 4 && majorasSpikes.length < 4){
                        createSpike(-15, 1023, -870, 3); 
                        majorasSpikes[3].rotation.z = 210;
                }else if(spikesCount >= 5 && majorasSpikes.length < 5){
                    createSpike(-7, 1015, -870, 4); 
                    majorasSpikes[4].rotation.z = 210;
                }

                //Right Side
                if(spikesCount >= 6 && majorasSpikes.length < 6){
                    createSpike(8, 1058, -872, 5);
                }else if(spikesCount >= 7 && majorasSpikes.length < 7){
                        createSpike(22, 1040, -872, 6); 
                        majorasSpikes[6].rotation.z = -90;
                }else if(spikesCount >= 8 && majorasSpikes.length < 8){
                        createSpike(19, 1030, -870, 7); 
                        majorasSpikes[7].rotation.z = -90;
                }else if(spikesCount >= 9 && majorasSpikes.length < 9){
                        createSpike(15, 1023, -870, 8); 
                        majorasSpikes[8].rotation.z = -210;
                }else if(spikesCount >= 10 && majorasSpikes.length < 10){
                    createSpike(7, 1015, -870, 9); 
                    majorasSpikes[9].rotation.z = -210;
                }
                spikesCount += 0.01;
            }else{
                mask = 2;
            }
        }
    }else if(mask >= 2 && mask < 10){
        if(awakening > 0){
            if(cameraPreviousX == 0 && cameraPreviousY == 0){
                cameraPreviousX = camera.position.x;
                cameraPreviousY = camera.position.y;
            }else{
                camera.position.x = cameraPreviousX;
                camera.position.y = cameraPreviousY;
            }
            camera.position.x += Math.round((Math.random() - 0.5)*mask);
            camera.position.y += Math.round((Math.random() - 0.5)*mask);  
            awakening -= 0.1;  
        }else{
            awakening = 0;
        }
        if(maskSelected){
            if(awakening == 0){
                awakening = mask;
                mask++;
                maskSelected = false;
            }
        }
    }else if(mask == 10){
        fadeScreen.style.display = "block";
        if(fadeScreen.style.opacity < 1){
            fadeScreen.style.opacity += 0.05; 
        }else{
            mask = 11; 
        }
    }else if(mask > 10){
        
    }
    
    // Light change
    if(mask == 4){
        directLight.color.r = 0.8;
        // directLight.color.g *= 0.8;
        // directLight.color.b *= 0.6;
    }else if(mask == 6){
        directLight.color.g = 0.25;
        directLight.color.b = 0.85;
    }else if(mask == 9){
        directLight.color.g = 0.2;
        directLight.color.b = 0.3;
    }


    // Platform moving
    if(dood.dir == 1 && dood.position.x < 532){
        dood.position.x += 2;
    }else if(dood.dir == 1 && dood.position.x >= 532){
         dood.dir = 2;
    }else if(dood.dir == 2 && dood.position.x > -500){
         dood.position.x -= 2;
    }else if(dood.dir == 2 && dood.position.x <= -500){
         dood.dir = 1;
    }

    if(dood2.dir == 1 && dood2.position.x < 532){
        dood2.position.x += 2;
    }else if(dood2.dir == 1 && dood2.position.x >= 532){
        dood2.dir = 2;
    }else if(dood2.dir == 2 && dood2.position.x > -500){
        dood2.position.x -= 2;
    }else if(dood2.dir == 2 && dood2.position.x <= -500){
        dood2.dir = 1;
    }

    
    camera.rotation.y += rotation;
    
    if(directions.up)
    {
        camera.rotation.x += (Math.PI / 6) / 50
        camera.matrix.extractBasis(right,up,at);
    }
    if(directions.down)
    {
        camera.rotation.x -= (Math.PI / 6) / 50
        camera.matrix.extractBasis(right,up,at);
    }
    if(directions.forward) {
        // camera.position.y = 20
        camera.position.add(at.multiplyScalar(-5));
        camera.matrix.extractBasis(right,up,at);
        
    }
    if(directions.backward) {
        // camera.position.y = 20
        camera.position.add(at.multiplyScalar(5));
        camera.matrix.extractBasis(right,up,at);
        
    }
    if(directions.left) {
        // camera.position.y = 20
        camera.position.add(right.multiplyScalar(-5));
        camera.matrix.extractBasis(right,up,at);
       
    }
    if(directions.right) {
        // camera.position.y = 20
        camera.position.add(right.multiplyScalar(5));
        camera.matrix.extractBasis(right,up,at);
    }
    renderer.render(scene,camera);
}
animate()

document.addEventListener('keydown', (e) =>
{
    switch(e.keyCode) {
        case 37: // Left
        case 81: // Q
            directions.left = true;
            break;
 
        case 38: // Up
            directions.up = true;
            break;
        case 90: // Z
            directions.forward = true;
            break;
 
        case 39: // Right
        case 68: // D
            directions.right = true;
            break;
 
        case 40: // Down
            directions.down = true;
            break;
        case 83: // S
            directions.backward = true;
            break;
        case 84:
            console.log(camera.position);
            break;
        case 32: // Spacebar
            if((jump == 0) && (dood.position.x >= -164) && (dood.position.x <= 164)){
                jump = 1;
            }else if((jump == 1) && (transition >= 0.8) && (dood.position.x >= (dood2.position.x - 164)) && (dood.position.x <= (dood2.position.x + 164))){
                jump = 2;
            }else if((jump == 2) && (transition >= 1.8) && (dood2.position.x >= -72) && (dood2.position.x <= 228)){
                jump = 3;
            }else if((jump == 3) && (transition >= 2.8)){
                jump = 4;
            }else if((jump == 4) && (transition >= 3.8)){
                jump = 5;
            }else if((jump == 5) && (transition >= 4.8)){
                jump = 6;
            }
            break;
    }
})
document.addEventListener('keyup', (e)=>
{
    // keyboard[event.keyCode] = false 
    switch(e.keyCode) {
        case 37: // Left
        case 81: // Q
            directions.left = false;
        break;
 
        case 38: // Up
            directions.up = false;
        break;
        case 89:

            dothis();
            break;
        case 90: // Z
            directions.forward = false;
        break;
 
        case 39: // Right
        case 68: // D
            directions.right = false;
        break;
 
        case 40: // Down
            directions.down = false;
            break;
        case 83: // S
            directions.backward = false;
        break;
    }  
})
let currentY = 0;
let lastY = 0;
window.addEventListener("mousemove", (event) =>
{
    var box = {};

    lastY = currentY;
    currentY = event.clientY;
    if(currentY - lastY > 100)
    {
        rotation = 0;
        rotationX = - 0.001;
    }
    box.minX = Math.abs(window.innerWidth - 400) / 4;
    box.maxX = box.minX + 400 /4;
     
    if(event.clientX < box.minX) {
        rotationX = 0;
        rotation =  Math.min(0.1, 0.0001 * (box.minX - event.clientX));
    }
    else if(event.clientX > box.maxX) {
        rotationX = 0;
        rotation =  Math.min(0.1, 0.0001 * (box.minX - event.clientX / 3));
    }
    else {
        rotation = 0;
    }

})

window.addEventListener('mousedown', onMouseDown, false);

function onMouseDown(e) {
    console.log("Pute");
    var vectorMouse = new THREE.Vector3( //vector from camera to mouse
        -(window.innerWidth/2-e.clientX)*2/window.innerWidth,
        (window.innerHeight/2-e.clientY)*2/window.innerHeight,
        -1/Math.tan(22.5*Math.PI/180)); //22.5 is half of camera frustum angle 45 degree
    vectorMouse.applyQuaternion(camera.quaternion);
    vectorMouse.normalize();        

    var vectorObject = new THREE.Vector3(); //vector from camera to object
    vectorObject.set(majorasMask.position.x - camera.position.x, majorasMask.position.y - camera.position.y, majorasMask.position.z - camera.position.z);
    vectorObject.normalize();
    if (vectorMouse.angleTo(vectorObject)*180/Math.PI < 15) {
        if(awakening <= 0){
            maskSelected = true;
        }
    }
}

window.addEventListener(
    'mouseup',
    ()=>{
        maskSelected = false
    },
    false
);

function createSpike(x, y, z, entry){
    const spike = new THREE.Mesh(
        new THREE.ConeGeometry( 5, 20, 32 ),
        new THREE.MeshStandardMaterial({color: 0xff8866, metalness: 0.3, roughness: 0.3})
    )
    spike.dir = 1;
    spike.position.x = x;
    spike.position.y = y;
    spike.position.z = z;
    spike.castShadow = false;
    spike.receiveShadow = true;
    scene.add(spike);
    majorasSpikes[entry] = spike;
}


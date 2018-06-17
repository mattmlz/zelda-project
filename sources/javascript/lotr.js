import * as THREE from 'three'
var OBJLoader = require('three-obj-loader');
OBJLoader(THREE);
import {TweenMax, Power2, TimelineLite} from "gsap";
import PlaneGeometry from './components/PlaneGeometry.js'
import CylinderGeometry from './components/CylinderGeometry.js'
import BoxGeometry from './components/BoxGeometry.js'
import TorusGeometry from './components/TorusGeometry.js'

/**
 * Variables
 */

const textContainer = document.querySelector('.lotr-text__container')
const textContainer_text = textContainer.querySelector('.lotr-text')
const background = document.querySelector('.background')
const player_lotr_1 = document.querySelector('.audio_player_1')
const player_lotr_2 = document.querySelector('.audio_player_2')
const player_lotr_3 = document.querySelector('.audio_player_3')
const player_lotr_the_shire = document.querySelector('.audio_player_4')
const audio_player_one_ring = document.querySelector('.audio_player_one-ring')

/**
 * Scene 1
 */
/**
 * Scene
 */
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0x8FD6F6 )

const scene_inside = new THREE.Scene()
scene_inside.background = new THREE.Color( 0x8FD6F6 )

let currentScene = scene


// canvas.classList.add('canvas')
/**
 * Camera
 */

let right, up, at
let rotation = 0
let rotationX = 0
let directions = {}


directions.forward = false
directions.backward = false
directions.left = false
directions.right = false
directions.up = false
directions.down = false

let speed = .2
right = new THREE.Vector3()
up = new THREE.Vector3(12,12,12)
at = new THREE.Vector3()


let windowWidth = window.innerWidth
let windowHeight = window.innerHeight
const camera = new THREE.PerspectiveCamera(70, windowWidth / windowHeight, 0.1, 1000)
camera.matrix.extractBasis(right,up,at)

camera.position.set(-72,-85,-750)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({antialias : true})
renderer.setSize(windowWidth, windowHeight)


document.body.appendChild(renderer.domElement)
renderer.render(currentScene, camera)

/**
 * 
 * Camera
 */

const animate = () =>
{
    requestAnimationFrame(animate)
    
    camera.rotation.y += rotation/3
    
    // if(directions.up)
    // {
    //     camera.rotation.x += (Math.PI / 6) / 50
    //     camera.matrix.extractBasis(right,up,at);
    // }
    // if(directions.down)
    // {
    //     camera.rotation.x -= (Math.PI / 6) / 50
    //     camera.matrix.extractBasis(right,up,at);
    // }
    // if(directions.forward) {
    //     // camera.position.y = 20
    //     camera.position.add(at.multiplyScalar(-.5));
    //     camera.matrix.extractBasis(right,up,at);
        
    // }
    // if(directions.backward) {
    //     // camera.position.y = 20
    //     camera.position.add(at.multiplyScalar(.5));
    //     camera.matrix.extractBasis(right,up,at);
        
    // }
    // if(directions.left) {
    //     // camera.position.y = 20
    //     camera.position.add(right.multiplyScalar(-.5));
    //     camera.matrix.extractBasis(right,up,at);
       
    // }
    // if(directions.right) {
    //     // camera.position.y = 20
    //     camera.position.add(right.multiplyScalar(.5));
    //     camera.matrix.extractBasis(right,up,at);
    // }
    renderer.render(currentScene,camera)
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
 
        case 68: // D
            directions.right = true;
            break;
 
        case 40: // Down
            directions.down = true;
            break;
        case 83: // S
            directions.backward = true;
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
            
            break;
        case 90: // Z
            directions.forward = false;
        break;
 
        case 39:
            dothis()
            break;
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
let currentY = 0
let lastY = 0
window.addEventListener("mousemove", (event) =>
{
    var box = {};

    lastY = currentY
    currentY = event.clientY
    if(currentY - lastY > 100)
    {
        rotation = 0
        rotationX = - 0.001
    }
    box.minX = Math.abs(window.innerWidth - 400) / 4;
    box.maxX = box.minX + 400 /4;
     
    if(event.clientX < box.minX) {
        rotationX = 0
        rotation =  Math.min(0.1, 0.0001 * (box.minX - event.clientX));
    }
    else if(event.clientX > box.maxX) {
        rotationX = 0
        rotation =  Math.min(0.1, 0.0001 * (box.minX - event.clientX / 3));
    }
    else {
        rotation = 0;
    }



})
/** 
 * Resize
 */
window.addEventListener('resize', () =>
{
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight

    camera.aspect = windowWidth / windowHeight
    camera.updateProjectionMatrix()
    renderer.setSize(windowWidth, windowHeight)
})
const press_right_arrow = document.querySelector('.press-right')

let currentPhase = 0;
const showtext = (text_id) =>
{
    if(text_id == 2)
    {
        TweenLite.to(press_right_arrow, 1, {autoAlpha: 1})
        textContainer_text.innerHTML= "I've already heard that somewhere"
    }
    if(text_id == 3)
    {
        TweenLite.to(press_right_arrow, 1, {autoAlpha: 1})
        player_lotr_the_shire.pause()
        textContainer_text.innerHTML= "I know this place"
        player_lotr_2.play()
        player_lotr_2.volume = .3

        pointLight.intensity = 0
        scene.background = new THREE.Color( 0x050812 )
    }
    if(text_id == 4)
    {
        
        // player_lotr_1.play()
    }
}
const dothis = () =>
{ 
    switch (currentPhase) {
        case 0:
            
            TweenLite.to(camera.rotation, 1, {x: .5, y:.5})
            player_lotr_the_shire.play()
            textContainer_text.innerHTML= "What a nice day to climb this mountain"
            currentPhase++
            break;
    
        case 1:

            textContainer_text.innerHTML= ""
            TweenLite.to(press_right_arrow, 1, {autoAlpha: 0})
            const tl_travelling_1 = new TimelineLite({onComplete: showtext, onCompleteParams: [2]})
            tl_travelling_1
                .to(camera.rotation, 1.5, {x: 0, y:0})
                .to(camera.rotation, 1.5, {y:1.5})
                .to(camera.position, 1,{x : -85}, '-=.5')
                .to(camera.position, 1.5, {x : -95,y: camera.position.y + 4})
                .to(camera.position, 3, {x : -120,y: camera.position.y + 8, z: camera.position.z +3},'-=.5')
                .to(camera.rotation, 1, {y:0},'-=1')
                
            currentPhase++
            break;
        case 2:
            TweenLite.to(press_right_arrow, 1, {autoAlpha: 0})
            textContainer_text.innerHTML= ""
            const tl_travelling_2 = new TimelineLite({onComplete: showtext, onCompleteParams: [3]})
            tl_travelling_2
                .to(camera.position, 1, {y: camera.position.y + 4})
                .to(camera.position, 1, {z: camera.position.z -5})
                .to(camera.rotation, 1.5, {y:1.5}, '-=.5')
                .to(camera.position, 3, {y: camera.position.y + 12, x: -155},'-=1')
                .to(camera.rotation, 2, {y:0},'-=.5')
                .to(camera.position, 3, {y: camera.position.y + 16,z: camera.position.z -25},'-=1')
                .to(camera.position, 1.5, {y: camera.position.y + 24})
                .to(camera.position, 3, {z: camera.position.z - 48})
                .to(camera.rotation, 1.5, {y:-1.5},'-=1')
                .to(camera.position, 3, {x: -120, y: camera.position.y + 37 })
                .to(camera.rotation, 3, {y:1.5},'-=.5')
                .to(camera.position, 2, {y: camera.position.y + 41, z: camera.position.z - 60})
                .to(camera.position, 1, {x: -130, y: camera.position.y + 51})
                .to(camera.position, 1, {x: -148})
                .to(camera.position, 1, {y: camera.position.y + 58})
                .to(camera.position, 1, {x: -158})
                .to(camera.rotation, 1, {y:3})
                .to(camera.position, 1, {y: camera.position.y + 68})
                .to(camera.position, 1, {z: camera.position.z - 44})
                .to(camera.rotation, 1, {y:1.5})
                .to(camera.position, 1, {x: -164, y: camera.position.y + 72})
                .to(camera.position, 1, {x: -174})
                .to(camera.position, 1, {y: camera.position.y + 82})
                .to(camera.position, 1, {x: -199, z: camera.position.z - 48})
                .to(camera.rotation, 1, {y:0})
            currentPhase++
            break;
        case 3:
            TweenLite.to(press_right_arrow, 1, {autoAlpha: 0})
            textContainer_text.innerHTML= ""
            const tl_travelling_3 = new TimelineLite({onComplete: switchScene})
            tl_travelling_3
                .to(camera.position, 1, {y: camera.position.y + 2, z: camera.position.z - 16})
                .to(camera.position, 1, {y: camera.position.y + 3, x: -194})
                .to(camera.position, 1, {z: camera.position.z - 50})
                .to(camera.rotation, 1.5, {x: .5})
                .to(camera.rotation, 1.5, {x: 0})
                .to(camera.position, 1, {z: camera.position.z - 75})
                currentPhase++
            break;
        case 4:
            const tl_travelling_4 = new TimelineLite()
            tl_travelling_4
                .to(camera.position, 1.5, {x: -165})
        default:
            break;
            
    }
}

const switchScene = () =>
{
    player_lotr_2.currentTime = 0
    player_lotr_2.play()
    scene_inside.add(camera)
    camera.position.set(-58, -30, -954)
    currentScene = scene_inside
    renderer.render(currentScene, camera)
    TweenLite.to(camera.rotation, 1, {y : 1.5});
}

var light = new THREE.AmbientLight( 0x34561A,.5);
scene.add( light )

const lampLight = new THREE.PointLight(0x28201B, .5);
lampLight.position.set(23, 200, 1.1211640024934584);
lampLight.castShadow = true;
scene.add(lampLight);

const lavaLight = new THREE.PointLight(0xAE4B0D, .3);
lavaLight.position.set(-192, 10, -894);
lavaLight.castShadow = true;
scene.add(lavaLight);

const pointLight = new THREE.PointLight(0x34561A, .8);
pointLight.position.set(-212, 6, -837);
pointLight.castShadow = true;
scene.add(pointLight);

var mountdoomLoader = new THREE.OBJLoader();
var material = new THREE.MeshStandardMaterial({color: 0xAE4B0D,side: THREE.DoubleSide});
mountdoomLoader.load('./../assets/objects/MountDoomv2_0.obj', function (mountdoom) {
    mountdoom.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = material;
        }
    });
    mountdoom.scale.set(100,100,100);
    mountdoom.castShadow = false;
    mountdoom.receiveShadow = true;
    mountdoom.position.z = -952;
    mountdoom.position.y = -300;
    mountdoom.position.x = -217;
    scene.add(mountdoom);
});


/**
 * Scene inside
 */

var mountdoomLoader_inside = new THREE.OBJLoader();
var material_inside = new THREE.MeshStandardMaterial({color: 0xfefefe,side: THREE.DoubleSide});
mountdoomLoader_inside.load('./../assets/objects/MountDoomInside1.0.obj', function (mountdoom_inside) {
    mountdoom_inside.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = material_inside;
        }
    });
    mountdoom_inside.scale.set(100,100,100);
    mountdoom_inside.castShadow = false;
    mountdoom_inside.receiveShadow = true;
    
    mountdoom_inside.position.z = -952;
    mountdoom_inside.position.y = -300;
    mountdoom_inside.position.x = -217;
    scene_inside.add(mountdoom_inside);
});

const lampLight_inside = new THREE.PointLight(0x28201B, 1);
lampLight_inside.position.set(-225, 0, -941);
lampLight_inside.castShadow = true;
scene_inside.add(lampLight_inside);

const lavaLight_inside = new THREE.PointLight(0xAE4B0D, .3);
lavaLight_inside.position.set(-225, 0, -941);
lavaLight_inside.castShadow = true;
scene_inside.add(lavaLight_inside);

const ring = new TorusGeometry(4,.7,16,100,6.3,'BE9A42').draw()
scene_inside.add(ring)
ring.position.x = -182
ring.position.y = -30
ring.position.z = -955

ring.rotateY(- Math.PI /2)
ring.rotateX(Math.PI/3)

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

document.addEventListener( 'click', (event) =>
{
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera )

    let intersect = raycaster.intersectObject( ring )
    if(intersect.length == 1)
    {
        mouse.x = 0
        mouse.y = 0
        audio_player_one_ring.play()
        TweenLite.to(ring.rotation, 16, {z: 10})
    }
})
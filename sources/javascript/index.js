// import Application from './components/Application.js'
//GreenSock
import {TweenMax, Power2, TimelineLite} from "gsap";

const cursor = document.querySelector(".mouse")
const mouse = {x:0, y:0}

const enter = document.querySelector(".enter");
const toggle = document.querySelector(".toggle");

enter.onclick = function () { 
    toggle.style.display = 'block';
    // enter.style.display = 'none';
    enter.style.animationName = 'enter';
};

document.addEventListener("mousemove",(event) =>{
    mouse.x = event.pageX - 15 ;
    mouse.y = event.pageY - 15 ;
    
    cursor.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
})

// Menu button
document.querySelector(".alltitle").onmousemove = function(){if (this != document.querySelector(".cursor")) document.querySelector(".cursor").style.opacity -= 0.1 };
document.querySelector(".background").onmousemove = function(){if (this != document.querySelector(".cursor")) document.querySelector(".cursor").style.opacity = 0.70 };

// Videos
const background = document.querySelector(".background");
const titlechaos = document.querySelector(".titlechaos");
const titleheat = document.querySelector(".titleheat");
const titlebirth = document.querySelector(".titlebirth");
const videochaos = document.querySelector(".videochaos");
const videoheat = document.querySelector(".videoheat");
const videobirth = document.querySelector(".videobirth");
const videobackground = document.querySelector(".videobackground");

// Sounds
const allbars = document.querySelector(".allbars");
const bar1 = document.querySelector("#bar1");
const bar2 = document.querySelector("#bar2");
const bar3 = document.querySelector("#bar3");
const bar4 = document.querySelector("#bar4");
const audiochaos = document.querySelector(".audiochaos");
const audioheat = document.querySelector(".audioheat");
const audiobirth = document.querySelector(".audiobirth");



titlechaos.addEventListener("mouseover", function( event ) {
    audiochaos.play();    
    videobackground.style.display = "none";
    videochaos.style.display = "block";
    videoheat.style.display = "none";
    videobirth.style.display = "none";
    audiobirth.pause();
    audiobirth.currentTime = 0;
    audioheat.pause();
    audioheat.currentTime = 0;
});

titleheat.addEventListener("mouseover", function( event ) {
    audioheat.play();        
    videobackground.style.display = "none";
    videochaos.style.display = "none";
    videoheat.style.display = "block";
    videobirth.style.display = "none"; 
    audiobirth.pause();
    audiobirth.currentTime = 0;
    audiochaos.pause();
    audiochaos.currentTime = 0;   
});

titlebirth.addEventListener("mouseover", function( event ) {
    audiobirth.play();          
    videobackground.style.display = "none";
    videochaos.style.display = "none";
    videoheat.style.display = "none";
    videobirth.style.display = "block";
    audiochaos.pause();
    audiochaos.currentTime = 0;
    audioheat.pause();
    audioheat.currentTime = 0;
});

background.addEventListener("mouseover", function( event ) {   
    videobackground.style.display = "block";
    videochaos.style.display = "none";
    videoheat.style.display = "none";    
    videobirth.style.display = "none";
    audiochaos.pause();
    audiochaos.currentTime = 0;
    audiobirth.pause();
    audiobirth.currentTime = 0;
    audioheat.pause();
    audioheat.currentTime = 0;
});

//Set sounds on muted false


allbars.onclick = function () {
    if ( audiobirth.muted === false ) {
        bar1.style.animationPlayState = "paused";
        bar2.style.animationPlayState = "paused";
        bar3.style.animationPlayState = "paused";
        bar4.style.animationPlayState = "paused";
        audiobirth.muted = true;
        audioheat.muted = true;
        audiochaos.muted = true;
    } else {
        bar1.style.animationPlayState = "running";
        bar2.style.animationPlayState = "running";
        bar3.style.animationPlayState = "running";
        bar4.style.animationPlayState = "running";
        audiobirth.muted = false;
        audioheat.muted = false;
        audiochaos.muted = false;
    }
}
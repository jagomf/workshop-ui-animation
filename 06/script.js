
import Vector2D from '../common/Vector2D.js'

const position = new Vector2D(50,20);
let vel = new Vector2D(1,2);
const acc = vel.clone();
acc.length = 0;
vel.length = 0;

const cuad = document.querySelector('#cuad');
cuad.addEventListener('mousedown', onMouseDown);

let startPosition, lastPosition, startTime,offsetX, offsetY, inter, moving = true;
function onMouseDown(e) {
    moving = false;
    position.x = e.pageX - e.offsetX;
    position.y = e.pageY - e.offsetY;
    lastPosition = startPosition = position.clone();
    startTime = new Date();
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    inter = setInterval(calcVelocity,1000/60);
}
function calcVelocity(){
    vel = new Vector2D(position.x - lastPosition.x, position.y - lastPosition.y);
    let time = new Date().getTime() - startTime.getTime();
    time = Math.min(time,1000);
    //vel.length = (1000 - time) * 0.01;
    lastPosition = position.clone();
    console.log(time,vel)
}
function onMouseMove(e){
    position.x = e.pageX - offsetX;
    position.y = e.pageY - offsetY;
}
function onMouseUp(e){
    moving = true;
    clearInterval(inter)
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}

function render(){
    cuad.style.transform = `translate(${position.x}px,${position.y}px)`;
}

function frame(){
    if(moving){
        position.add(vel)
    }
    vel.multiply(0.95)
    checkLimitsAndBounce();
    render();
    requestAnimationFrame(frame);
}

function checkLimitsAndBounce(){
    if(position.x >= document.documentElement.clientWidth - 50 || position.x <= 0){
        vel.x *= -1;
    }
    if(position.y >= document.documentElement.clientHeight - 50 || position.y <= 0){
        vel.y *= -1;
    }
}

requestAnimationFrame(frame)

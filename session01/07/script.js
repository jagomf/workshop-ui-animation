import Vector2D from '../common/Vector2D.js'

const position = new Vector2D(50,20);
let vel = new Vector2D(1,2);
const acc = vel.clone();
acc.length = 0;
vel.length = 0;

const cuad = document.querySelector('.container');
cuad.addEventListener('mousedown', onMouseDown);


cuad.style.width = cuad.scrollWidth + 'px';


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
    cuad.style.transform = `translate(${position.x}px,0)`;
}

function frame(){
    cuad.style.width = cuad.scrollWidth + 'px';
    if(moving){
        position.add(vel)
    }
    vel.multiply(0.95)
    checkLimitsAndBounce();
    render();
    requestAnimationFrame(frame);
}


function checkLimitsAndBounce(){
    const limitLeft = -cuad.scrollWidth + document.documentElement.clientWidth;

    if(position.x <= limitLeft){
        position.x = limitLeft;
        vel.x *= -1;
        vel.multiply(0.1);
    }
    else if(position.x >= 0){
        position.x = 0;
        vel.x *= -1;
        vel.multiply(0.1);
    }
}

requestAnimationFrame(frame)

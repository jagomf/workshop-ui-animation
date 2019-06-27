import Vector2D from '../common/Vector2D.js'

const position = new Vector2D(0,0);
const vel = new Vector2D(1,2);
const cuad = document.querySelector('#cuad');

function render(){
    cuad.style.transform = `translate(${position.x}px,${position.y}px)`;
    console.log(position);
}
function frame(){
position.add(vel)
    checkLimitsAndRespawn();
    render();
    requestAnimationFrame(frame);
}
function checkLimitsAndStop(){
    if(position.x >= document.documentElement.clientWidth - 50 ||
        position.y >= document.documentElement.clientHeight - 50){
        vel.length = 0;
    }
}
function checkLimitsAndBounce(){
    if(position.x >= document.documentElement.clientWidth - 50 || position.x <= 0){
        vel.x *= -1;
    }
    if(position.y >= document.documentElement.clientHeight - 50 || position.y <= 0){
        vel.y *= -1;
    }
}
function checkLimitsAndRespawn(){
    if(position.x >= document.documentElement.clientWidth){
        position.x = -50;
    }
    else if(position.x <= -50){
        position.x = document.documentElement.clientWidth;
    }
    if(position.y >= document.documentElement.clientHeight){
        position.y = -50;
    }
    else if(position.y <= -50){
        position.y = document.documentElement.clientHeight;
    }
}
requestAnimationFrame(frame)


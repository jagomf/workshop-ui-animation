import Vector2D from '../common/Vector2D.js'

const position = new Vector2D(0,0);
const vel = new Vector2D(1,2);
const acc = vel.clone();
acc.length = 0;
vel.length = 0;

const cuad = document.querySelector('#cuad');

function render(){
    cuad.style.transform = `translate(${position.x}px,${position.y}px)`;
    console.log(vel);
}

function frame(){
position.add(vel)
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

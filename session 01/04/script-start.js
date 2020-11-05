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
    render();
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame)


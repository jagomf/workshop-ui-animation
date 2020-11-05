import Vector2D from '../common/Vector2D.js'

const position = new Vector2D(0,0);
const cuad = document.querySelector('#cuad');

function render(){
    cuad.style.transform = `translate(${position.x}px,${position.y}px)`;
    console.log(position);
}
function frame(){
    position.x++;
    position.y += 2;
    render();
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame)


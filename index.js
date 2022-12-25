const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.9;

ctx.strokeStyle = '#045';
let color_input = document.getElementById("setColor_inp");
function set_color() {
    ctx.strokeStyle = this.value;
};
color_input.addEventListener('input', set_color);
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 30;
let drawingNow = false;
// start of drawing and end
let lastX = 0;
let lastY = 0; 
let hue = 0;
let draw = (e)=> {
    if (drawingNow) {
        // console.log(e)
        ctx.strokeStyle = `hsl(#{hue}, 100%,50%)`;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    } 
}
canvas.addEventListener('mousedown', (e) => {
    drawingNow = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', ()=> drawingNow = false);
canvas.addEventListener('mouseout', ()=> drawingNow = false);


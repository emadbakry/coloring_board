const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');

let line_w = 10;
let range_input = document.getElementById("range");
function setStroke() {
    line_w = this.value;
    ctx.lineWidth = line_w;
}
range_input.addEventListener('input', setStroke);



let w_and_h = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.88;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = line_w;
    ctx.strokeStyle = '#045';

}
w_and_h();
window.onresize = () => w_and_h();

let color_input = document.getElementById("setColor_inp");
function set_color() {
    ctx.strokeStyle = this.value;
};
color_input.addEventListener('input', set_color);

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
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        [lastX, lastY] = [e.clientX, e.clientY];
    } 
}
canvas.addEventListener('mousedown', (e) => {
    drawingNow = true;
    [lastX, lastY] = [e.clientX, e.clientY];
});
canvas.addEventListener('touchstart', (e) => {
    drawingNow = true;
    [lastX, lastY] = [e.clientX, e.clientY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('mouseup', ()=> drawingNow = false);
canvas.addEventListener('touchend', ()=> drawingNow = false);
canvas.addEventListener('mouseout', () => drawingNow = false);
canvas.addEventListener('touchcancel', () => drawingNow = false);



const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');

let line_w = 10;
let range_input = document.getElementById("range");
function setStroke() {
    line_w = this.value;
    ctx.lineWidth = line_w;
}
range_input.addEventListener('input', setStroke);

let control_height = document.querySelector('.control').scrollHeight;
if (typeof control_height != "number") {
    control_height = 50;
};

let w_and_h = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - (control_height);
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

var drawingNow = false;
// var drawingNow = "createTouch" in document || "ontouchstart" in window;

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


// save as png
let save_btn = document.querySelector(".save_btn");
function save_canva() {
    savecanvas(ctx,'sketch','png')
}
save_btn.addEventListener('click', () => {
    let dataUrl = canvas.toDataURL();
    console.log(dataUrl)
    let dl_img = document.querySelector(".dl_img");
    dl_img.href = dataUrl;
    setTimeout(() => {
        dl_img.click();
    }, 1000);
});


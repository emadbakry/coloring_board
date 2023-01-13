const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');

let line_w = 10;
let range_input = document.getElementById("range");
function setStroke() {
    line_w = this.value;
    ctx.lineWidth = line_w;
}
range_input.addEventListener('input', setStroke);

let stored_img = document.querySelector(".stored_img");
if (sessionStorage.getItem("save_canva_Emad")) {
  let img_stored_data = sessionStorage.getItem("save_canva_Emad");
  stored_img.setAttribute("src", img_stored_data);
}
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
let fix_resize = () => {
    w_and_h();
      setTimeout(() => {
        ctx.drawImage(
          stored_img,
          0,
          0,
          window.innerWidth,
          window.innerHeight - control_height
        );
      }, 0);
}
window.onresize = () => fix_resize();
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
let draw = (e) => {
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
    savecanvas(ctx, 'sketch', 'png');
}

save_btn.addEventListener('click', () => {
    let dataUrl = canvas.toDataURL();
    // console.log(dataUrl)
    let dl_img = document.querySelector(".dl_img");
    dl_img.href = dataUrl;
    setTimeout(() => {
        dl_img.click();
    }, 1000);
});

// To prevent scrolling while touching canvas
document.body.addEventListener("touchstart", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchend", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchmove", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);

canvas.addEventListener(
  "touchstart",
  function (e) {
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    canvas.dispatchEvent(mouseEvent);
  },
  false
);
canvas.addEventListener(
  "touchend",
  function (e) {
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
  },
  false
);
canvas.addEventListener(
  "touchmove",
  function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    canvas.dispatchEvent(mouseEvent);
  },
  false
);
function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}


let reset_bg = document.querySelector(".btns .reset_btn");
let reset = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sessionStorage.removeItem("save_canva_Emad");
}
reset_bg.addEventListener('click', reset);
setTimeout(() => {
    ctx.drawImage(stored_img, 0, 0, stored_img.width, stored_img.height);
}, 10);
setInterval(() => {
    stored_img.setAttribute("src", canvas.toDataURL());
    sessionStorage.setItem("save_canva_Emad", canvas.toDataURL());
}, 1000);

// minifiy the code
// add draw feature to mobile
// add forward and backward edits
// Add photos and a way to select any given photo from client.
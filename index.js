var clearButton = document.querySelector(".reset_btn button");
var canvascontainer = document.getElementById("board");
var canvas = document.getElementById("draw");
var context = canvas.getContext("2d");
var radius = (canvascontainer.clientWidth + canvascontainer.clientHeight) / 150;
var dragging = false;

function getMousePosition(e) {
  var mouseX = ((e.offsetX * canvas.width) / canvas.clientWidth) | 0;
  var mouseY = ((e.offsetY * canvas.height) / canvas.clientHeight) | 0;
  return { x: mouseX, y: mouseY };
}

context.mozImageSmoothingEnabled = false;
context.imageSmoothingEnabled = false;

canvas.width = 1280;
canvas.height = 920;
canvas.style.width = "100%";
canvas.style.height = "100%";

/* CLEAR CANVAS */
function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

clearButton.addEventListener("click", clearCanvas);

var putPoint = function (e) {
     e.preventDefault();
     e.stopPropagation();
  if (dragging) {
    context.lineTo(getMousePosition(e).x, getMousePosition(e).y);
    context.lineWidth = radius * 2;
    context.stroke();
    context.beginPath();
    context.arc(
      getMousePosition(e).x,
      getMousePosition(e).y,
      radius,
      0,
      Math.PI * 2
    );
    context.fill();
    context.beginPath();
    context.moveTo(getMousePosition(e).x, getMousePosition(e).y);
  }
};
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
var engage = function (e) {
  dragging = true;
  putPoint(e);
};
var disengage = function () {
  dragging = false;
  context.beginPath();
};

canvas.addEventListener("mousedown", engage);
canvas.addEventListener("mousemove", putPoint);
canvas.addEventListener("mouseup", disengage);
document.addEventListener("mouseup", disengage);
canvas.addEventListener("contextmenu", disengage);

canvas.addEventListener("touchstart", engage, false);
canvas.addEventListener("touchmove", putPoint, false);
canvas.addEventListener("touchend", disengage, false);

window.onresize = () => fix_resize();
let color_input = document.getElementById("setColor_inp");
function set_color() {
  context.strokeStyle = this.value;
}
color_input.addEventListener("input", set_color);
var drawingNow = false;

// save as png
let save_btn = document.querySelector(".save_btn");
function save_canva() {
  savecanvas(ctx, "sketch", "png");
}

save_btn.addEventListener("click", () => {
  let dataUrl = canvas.toDataURL();
  // console.log(dataUrl)
  let dl_img = document.querySelector(".dl_img");
  dl_img.href = dataUrl;
  setTimeout(() => {
    dl_img.click();
  }, 1000);
});

let reset_bg = document.querySelector(".btns .reset_btn");
let reset = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sessionStorage.removeItem("save_canva_Emad");
};
reset_bg.addEventListener("click", reset);
setTimeout(() => {
//   context.drawImage(stored_img, 0, 0, stored_img.width, stored_img.height);
}, 10);
setInterval(() => {
//   stored_img.setAttribute("src", canvas.toDataURL());
  sessionStorage.setItem("save_canva_Emad", canvas.toDataURL());
}, 1000);

// minifiy the code
// add draw feature to mobile
// add forward and backward edits
// Add photos and a way to select any given photo from client.

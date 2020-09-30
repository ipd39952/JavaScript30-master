const canvas = document.querySelector("#draw");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#BADA55'
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 40;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e){
  if(!isDrawing) return; //stop the function if the user isn't drawing

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
  ctx.beginPath();
  //starts from this location
  ctx.moveTo(lastX, lastY);
  //and goes to this localtion
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  [lastX, lastY] = [e.offsetX, e.offsetY]; //destructuring an array!
  hue++; //change the hue color after being done with current line
  if(hue >= 360){
    hue = 0;
  }
  if(ctx.lineWidth >= 40 || ctx.lineWidth <= 10){
    direction = !direction;
  }
  if(direction){
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }

}


canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  console.log(lastX, lastY);
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

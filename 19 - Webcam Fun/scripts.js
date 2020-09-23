const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
  // mediaDevices is new for newer browsers
  // line below returns a Promise!
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaStream => {
      console.log(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error(`Error occured`, err);
    });
}

function paintToCanvas(){
  // Destructuring
  const [width, height] = [video.videoWidth, video.videoHeight];
  console.log(width, height);
  [canvas.width, canvas.height] = [width, height]

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // take the pixels out of the canvas
    let pixels = ctx.getImageData(0, 0, width, height);
    // change some of their values

    // pixels = redEffect(pixels);
    // pixels = rgbSplit(pixels);
    pixels = greenScreen(pixels);
    // display them back on canvas
    ctx.putImageData(pixels, 0, 0);
  }, 16); // draw to canvas each 16 milliseconds
}

function takePhoto(){
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg'); // data is base64 representation of the current frame/picture
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Handosme Person!"/>`
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels){
  for(let i = 0; i < pixels.data.length; i+=4){
    // pixels[i] - red, pixels[i+1] - green, pixels[i+2] - blue, pixesl[i+3] - alpha
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

function rgbSplit(pixels){
  for(let i = 0; i < pixels.data.length; i+=4){
    // pixels[i] - red, pixels[i+1] - green, pixels[i+2] - blue, pixesl[i+3] - alpha
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

function greenScreen(pixels){
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}


getVideo();
video.addEventListener('canplay', paintToCanvas);

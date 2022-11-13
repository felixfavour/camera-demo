const cameraVideoStream = document.getElementById('camera-stream')
const shutterButton = document.getElementById('shutter')
const photosButton = document.getElementById('photos-btn')
const gallery = document.querySelector('.gallery-view')
const currentImageElement = document.querySelector('.gallery-view img')
const closeGalleryButton = document.getElementById('close-gallery')
const nextButton = document.getElementById('next')
const prevButton = document.getElementById('prev')
const canvas = document.getElementById('canvas')

let width = 1280
let height = 1360
let streaming = false

cameraVideoStream.height = height
cameraVideoStream.width = width

canvas.width 

canvas.setAttribute("width", width);
canvas.setAttribute("height", height);

const capturedImages = []
const currentImage = 0

// Connect media device
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia()) {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then ((stream) => {
    cameraVideoStream.srcObject = stream
    cameraVideoStream.play()
  })
} 

// cameraVideoStream.addEventListener(
//   "canplay",
//   (ev) => {
//     if (!streaming) {
//       // height = (cameraVideoStream.videoHeight / cameraVideoStream.videoWidth) * width;
//       height = 1360;

//       canvas.setAttribute("width", width);
//       canvas.setAttribute("height", height);
//       streaming = true;
//     }
//   },
//   false
// );

// Capture snapshots using HTML Canvas
function captureImage () {
  const canvasContext = canvas.getContext('2d')
  canvasContext.drawImage(cameraVideoStream, 10, 10, height, width)

  // Convert captured data to image (base64)
  const data = canvas.toDataURL('image/png')
  currentImageElement.src = data
  photosButton.style.backgroundImage = `url(${data})`
  capturedImages.push(data)
}
shutterButton.addEventListener('click', () => captureImage())

// Event handlers to close and open gallery
photosButton.addEventListener('click', () => gallery.classList.add('show-gallery'))
closeGalleryButton.addEventListener('click', () => gallery.classList.remove('show-gallery'))

// Event handlers to browse gallery (next and previous)
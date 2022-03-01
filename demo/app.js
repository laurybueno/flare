const canvas = document.querySelector('canvas');
const video = document.querySelector('video');
const brightnessSlider = document.querySelector('input[type=range]#brightness');
const exposureTimeSlider = document.querySelector('input[type=range]#exposureTime');


brightnessSlider.onchange = () => {
  navigator.mediaDevices.enumerateDevices()
  .then(getMedia);
}

exposureTimeSlider.onchange = () => {
  navigator.mediaDevices.enumerateDevices()
  .then(getMedia);
}

function display_image_blob(blob) {
  var urlCreator = window.URL || window.webkitURL;
  var imageUrl = urlCreator.createObjectURL(blob);
  document.querySelector("#image").src = imageUrl;
}


console.log("supported constraints", navigator.mediaDevices.getSupportedConstraints());

navigator.mediaDevices.enumerateDevices()
  .then(getMedia);

function getMedia(devices) {
  console.log("devices", devices);
  mediaStream = navigator.mediaDevices.getUserMedia({"video": {
      "deviceId": devices[4].deviceId,
    }
  }).then(gotMedia);
}

function gotMedia(mediaStream) {
  
  console.log("mediaStream", mediaStream);
  const track = mediaStream.getVideoTracks()[0];
  console.log("capabilities", track.getCapabilities());
  
  track.applyConstraints({
    "advanced": [
      {
        "exposureMode": "manual",
        "brightness": brightnessSlider.value,
        "exposureTime": exposureTimeSlider.value,
      }  
    ],
    "exposureMode": "manual",
    "brightness": brightnessSlider.value,
    "exposureTime": exposureTimeSlider.value,
  }).then(() => {
    console.log("Constraints aplicadas");
    console.log("track constrains", track.getConstraints());
    console.log("track setting", track.getSettings());
    
    // video.srcObject = new MediaStream([track]);
    video.srcObject = mediaStream;
    video.onloadedmetadata = (e) => {
        video.play();
    };

    // const imageCapture = new ImageCapture(track);
    // imageCapture.takePhoto()
    // // imageCapture.grabFrame()
    //   .then(imageBitmap => {
    //     canvas.width = imageBitmap.width;
    //     canvas.height = imageBitmap.height;
    //     // display_image_blob(imageBitmap)
    //     canvas.getContext('2d').drawImage(imageBitmap, 0, 0);
    //   })
    //   .catch(error => console.error('takePhoto() error:', error));

  }).catch((reason) => {
    console.log("deu errado", reason);
  });
}

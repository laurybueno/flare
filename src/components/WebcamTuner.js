import { useEffect, useState } from 'react';
import Video from './Video';
import styles from './WebcamTuner.module.css';

function WebcamTuner() {
  const [brightness, setBrightness] = useState(0);
  const [exposureTime, setExposureTime] = useState(10);
  const [mediaStream, setMediaStream] = useState(null);

  const getTrackFromStream = s => s.getVideoTracks()[0];
  const activateStream = async () => {
    await navigator.mediaDevices.getUserMedia({video:true});
    const devices = await navigator.mediaDevices.enumerateDevices();
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      "video": {
        "deviceId": devices[2].deviceId,
      }
    });
    return mediaStream;
  }

  const tuneCam = async () => {
    if(!mediaStream) return;
    const track = getTrackFromStream(mediaStream);
    await track.applyConstraints({
      "advanced": [
        {
          "exposureMode": "manual",
          "brightness": brightness,
          "exposureTime": exposureTime,
        }  
      ],
    });
  }
  useEffect(() => {
    activateStream().then(s => setMediaStream(s));
  }, []);

  tuneCam();
  
  return (
    <div>
      WebcamTuner
      {mediaStream ? <Video srcObject={mediaStream} /> : null}
      <input type="range" id="brightness" className={styles.range_brightness} min="0" max="255" onChange={e => setBrightness(e.target.value)} />
      <input type="range" id="exposureTime" min="3" max="2047" onChange={e => setExposureTime(e.target.value)} />
    </div>
  );
}

export default WebcamTuner;

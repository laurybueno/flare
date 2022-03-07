import { useState } from 'react';
import Capabilities from './Capabilities';
import DeviceSelector from './DeviceSelector';
import Video from './Video';
import './WebcamTuner.module.css';

function WebcamTuner() {
  const [mediaStream, setMediaStream] = useState(null);

  const getPermissons = async () => {
    const cameraPerm = await navigator.permissions.query({
      name: "camera",
    });
    if(cameraPerm.name !== "video_capture" || cameraPerm.state !== "granted") {
      console.log("Requesting camera permissions");
      await navigator.mediaDevices.getUserMedia({ video: true });
      window.location.reload();
    }
  }
  getPermissons();

  return (
    <div>
      WebcamTuner
      <DeviceSelector setMediaStream={setMediaStream} />
      {mediaStream ? <Video srcObject={mediaStream} /> : null}
      <Capabilities stream={mediaStream} />
    </div>
  );
}

export default WebcamTuner;

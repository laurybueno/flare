import { useState } from 'react';
import Capability from './Capability';
import DeviceSelector from './DeviceSelector';
import Video from './Video';
import './WebcamTuner.module.css';

function WebcamTuner() {
  const [mediaStream, setMediaStream] = useState(null);
  const [constraints, setConstraints] = useState({});

  const getTrackFromStream = s => s.getVideoTracks()[0];

  if(mediaStream && Object.keys(constraints).length === 0) {
    const track = getTrackFromStream(mediaStream);
    setConstraints(track.getSettings());
  }

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

  const updateConstraint = async (k, v) => {
    const track = getTrackFromStream(mediaStream);
    await track.applyConstraints({
      "advanced": [
        {
          [k]: v,
        }
      ],
    });
    setConstraints(track.getSettings());
  };

  const listCapabilities = () => {
    if(!mediaStream) return null;
    const track = getTrackFromStream(mediaStream);
    const capabilities = track.getCapabilities();
    console.log("settings", constraints);
    const capabilitiesElem = [];
    for (const c in capabilities) {
      capabilitiesElem.push(
        <Capability key={c} name={c} data={capabilities[c]} value={constraints[c]}  update={updateConstraint} />
      );
    }
    return capabilitiesElem;
  };

  return (
    <div>
      WebcamTuner
      <DeviceSelector setMediaStream={setMediaStream} />
      {mediaStream ? <Video srcObject={mediaStream} /> : null}
      { listCapabilities() }
    </div>
  );
}

export default WebcamTuner;

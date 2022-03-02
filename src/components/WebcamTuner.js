import { useEffect, useState } from 'react';
import Capability from './Capability';
import Video from './Video';
import styles from './WebcamTuner.module.css';

function WebcamTuner() {
  const [mediaStream, setMediaStream] = useState(null);
  const [constraints, setConstraints] = useState({});

  const getTrackFromStream = s => s.getVideoTracks()[0];

  if(mediaStream && Object.keys(constraints).length === 0) {
    const track = getTrackFromStream(mediaStream);
    setConstraints(track.getSettings());
  }

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

  useEffect(() => {
    activateStream().then(s => setMediaStream(s));
  }, []);

  return (
    <div>
      WebcamTuner
      {mediaStream ? <Video srcObject={mediaStream} /> : null}
      { listCapabilities() }
    </div>
  );
}

export default WebcamTuner;

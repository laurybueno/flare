import { useEffect, useState } from 'react';

function DeviceSelector({ setMediaStream, ...props }) {
  const [devices, setDevices] = useState([]);

  const getDevices = async () => {
    return await navigator.mediaDevices.enumerateDevices();
  }

  const getStream = async event => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      "video": {
        "deviceId": event.target.value,
      }
    });
    setMediaStream(mediaStream);
  }

  useEffect(() => {
    getDevices().then(ds => setDevices(ds));
  }, []);

  return (
      <select onChange={getStream}>
        <option>Select webcam</option>
        { devices.filter(d => d.kind === "videoinput").map(d => {
          return <option key={d.deviceId} value={d.deviceId} >{d.label}</option>
        }) }
      </select>
  )
}

export default DeviceSelector

import { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel } from '@mui/material';

function DeviceSelector({ setMediaStream, ...props }) {
  const [device, setDevice] = useState("");
  const [devices, setDevices] = useState([]);

  const getDevices = async () => {
    return await navigator.mediaDevices.enumerateDevices();
  }

  const updateDevice = event => {
    setDevice(event.target.value);
  };

  useEffect(() => {
    getDevices().then(ds => setDevices(ds));
  }, []);

  useEffect(() => {
    const getStream = async () => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        "video": {
          "deviceId": device,
        }
      });
      setMediaStream(mediaStream);
    };
    if (device)
      getStream(); 
  }, [device]);

  return (
    <FormControl fullWidth>
      <InputLabel>Select webcam</InputLabel>
      <Select 
        label="Select webcam"
        value={device}
        onChange={updateDevice}
      >
        { devices.filter(d => d.kind === "videoinput").map(d => {
          return <MenuItem key={d.deviceId} value={d.deviceId}>{d.label}</MenuItem>
        }) }
      </Select>
    </FormControl>
  )
}

export default DeviceSelector

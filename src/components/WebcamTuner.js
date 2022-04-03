import { Grid, Container } from '@mui/material';
import { useState } from 'react';
import Capabilities from './Capabilities';
import DeviceSelector from './DeviceSelector';
import Header from './header';
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
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={1} sm={3} />
        <Grid item xs={10} sm={6}>
          <Header />
        </Grid>
        <Grid item xs={1} sm={3} />
        
        <Grid item xs={1} sm={3} />
        <Grid item xs={10} sm={6}>
          <DeviceSelector setMediaStream={setMediaStream} />
        </Grid>
        <Grid item xs={1} sm={3} />
        
        <Grid item xs={1} sm={3} />
        <Grid item xs={10} sm={6}>
          {mediaStream ? <Video srcObject={mediaStream} /> : null}
        </Grid>
        <Grid item xs={1} sm={3} />
        
        <Grid item xs={1} sm={3} />
        <Grid item xs={10} sm={6}>
          <Capabilities stream={mediaStream} />
        </Grid>
        <Grid item xs={1} sm={3} />
      </Grid>
    </Container>
  );
}

export default WebcamTuner;

import { Stack } from '@mui/material';
import { getEnabledCapabilities } from '../utils/capabilities';
import Capability from './Capability';

function Capabilities({stream, ...props}) {

  if(stream === null || stream === undefined) return null;

  const capabilities = getEnabledCapabilities(stream);
  const capabilitiesElem = [];
  for (const c in capabilities) {
    capabilitiesElem.push(
      <Capability 
        key={c}
        stream={stream}
        supportedCapability={capabilities[c]}
      />
    );
  }

  return (
    <Stack spacing={2}>
      { capabilitiesElem }
    </Stack>
  );
}

export default Capabilities;

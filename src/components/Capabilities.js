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
    <div>
      { capabilitiesElem }
    </div>
  );
}

export default Capabilities;

import { useState } from 'react';

function Capabilities({stream, ...props}) {
  const [constraints, setConstraints] = useState({});

  if(stream === null || stream === undefined) return null;

  const track = stream.getVideoTracks()[0];
  if(Object.keys(constraints).length === 0) {
    setConstraints(track.getSettings());
  }

  const updateConstraint = async (k, v) => {
    await track.applyConstraints({
      "advanced": [
        {
          [k]: v,
        }
      ],
    });
    setConstraints(track.getSettings());
  };

  const RangeCapability = ({ name, data, value }) => {
    return (
      <div>
        <span>{name}</span>
        <input 
          type="range"
          min={data?.min}
          max={data?.max}
          step={data?.step}
          value={value}
          onChange={e => updateConstraint(name, e.target.value)}
        />
      </div>
    );
  };

  const OptionCapability = ({ name, options, value }) => {
    return (
      <div>
        <span>{name}</span>
        <select onChange={e => updateConstraint(name, e.target.value)} value={value}>
          <option>Select option</option>
          { options.map(o => <option key={o} value={o}>{o}</option>) }
        </select>
      </div>
    );
  };

  const capabilities = track.getCapabilities();
  const capabilitiesElem = [];
  for (const c in capabilities) {
    const capability = capabilities[c];
    const constraint = constraints[c];

    // Bypass identifiers mixed on the capabilities listing
    if (typeof capability === "string" || capability instanceof String) {
      continue;
    }

    if (Array.isArray(capability) && capability.length > 0) {
      capabilitiesElem.push(
        <OptionCapability key={c} name={c} options={capability} value={constraint} />
      );
    }
    
    if (
      typeof capability === "object" &&
      !Array.isArray(capability) &&
      capability !== null
    ) {
      capabilitiesElem.push(
        <RangeCapability key={c} name={c} data={capability} value={constraint} />
      );
    }
  }
  
  return (
    <div>
      { capabilitiesElem }
    </div>
  );
}

export default Capabilities;

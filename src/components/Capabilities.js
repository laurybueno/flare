import { useState } from 'react';

function Capabilities({stream, ...props}) {
  const [constraints, setConstraints] = useState({});

  if(stream === null || stream === undefined) return null;
  const getTrackFromStream = s => s.getVideoTracks()[0];

  const track = getTrackFromStream(stream);
  if(Object.keys(constraints).length === 0) {
    setConstraints(track.getSettings());
  }

  const updateConstraint = async (k, v) => {
    const track = getTrackFromStream(stream);
    await track.applyConstraints({
      "advanced": [
        {
          [k]: v,
        }
      ],
    });
    setConstraints(track.getSettings());
  };

  const Capability = ({ name, data, value, update }) => {
    if (typeof data === 'string' || data instanceof String) {
      return null;
    }
  
    if (Array.isArray(data)) {
      return null;
    }

    return (
      <div>
        <span>{name}</span>
        <input 
          type="range"
          min={data?.min}
          max={data?.max}
          step={data?.step}
          value={value}
          onChange={e => update(name, e.target.value)}
        />
      </div>
    );
  };
  
  const capabilities = track.getCapabilities();
  const capabilitiesElem = [];
  for (const c in capabilities) {
    capabilitiesElem.push(
      <Capability key={c} name={c} data={capabilities[c]} value={constraints[c]}  update={updateConstraint} />
    );
  }
  
  return (
    <div>
      { capabilitiesElem }
    </div>
  );
}

export default Capabilities;

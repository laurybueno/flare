import { useState } from 'react';
import { Slider } from '@mui/material';
import { getConstraints, updateConstraint, getEnabledCapabilities } from '../utils/capabilities';

function Capabilities({stream, ...props}) {
  const [constraints, setConstraints] = useState({});

  if(stream === null || stream === undefined) return null;

  if(Object.keys(constraints).length === 0) {
    setConstraints(getConstraints(stream));
  }

  const onChangeCapability = async (name, value) => {
    await updateConstraint(stream, name, value);
    setConstraints(getConstraints(stream));
  };

  const RangeCapability = ({ name, data, value }) => {
    return (
      <div>
        <span>{name}</span>
        <Slider
          aria-label={name}
          defaultValue={value}
          valueLabelDisplay="auto"
          step={data?.step}
          min={data?.min}
          max={data?.max}
          onChange={e => onChangeCapability(name, e.target.value)}
        />
      </div>
    );
  };

  const OptionCapability = ({ name, options, value }) => {
    return (
      <div>
        <span>{name}</span>
        <select onChange={e => onChangeCapability(name, e.target.value)} value={value}>
          <option>Select option</option>
          { options.map(o => <option key={o} value={o}>{o}</option>) }
        </select>
      </div>
    );
  };

  const capabilities = getEnabledCapabilities(stream);
  const capabilitiesElem = [];
  for (const c in capabilities) {
    const range = capabilities[c].range;
    const toggle = capabilities[c].toggle;
    
    if (range) {
      capabilitiesElem.push(
        <RangeCapability 
          key={range.id}
          name={range.id} 
          data={range.parameters(stream)}
          value={constraints[range.id]}
        />
      );
    }

    if (toggle) {
      capabilitiesElem.push(
        <OptionCapability 
          key={toggle.id}
          name={toggle.id}
          options={toggle.parameters(stream)}
          value={constraints[toggle.id]}
        />
      );
    }
  }

  console.log("capabilities", capabilities);
  console.log("constraints", constraints);

  return (
    <div>
      { capabilitiesElem ? capabilitiesElem :  null }
    </div>
  );
}

export default Capabilities;

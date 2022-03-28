import { useState } from 'react';
import { FormControlLabel, FormGroup, Slider, Switch } from '@mui/material';
import { updateConstraint } from '../utils/capabilities';

function Capability({stream, supportedCapability, ...props}) {
  const [enabled, setEnabled] = useState(false);

  const toggle = supportedCapability.toggle;
  const range = supportedCapability.range;

  const RangeCapability = ({ id, name, capability, value }) => {
    return (
      <div>
        <span>{name}</span>
        <Slider
          aria-label={name}
          defaultValue={value}
          valueLabelDisplay="auto"
          step={capability?.step}
          min={capability?.min}
          max={capability?.max}
          onChange={e => updateConstraint(stream, id, e.target.value)}
        />
      </div>
    );
  };

  const getConstraintValue = b => b ? "manual" : "continuous";
  const OptionCapability = ({ id }) => {
    return (
      <div>
        <FormGroup>
          <FormControlLabel control={
            <Switch 
              checked={ enabled }
              onChange={e => {
                updateConstraint(stream, id, getConstraintValue(e.target.checked));
                setEnabled(e.target.checked);
              }}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          } label={"Manual " + supportedCapability.name} />
        </FormGroup>
      </div>
    );
  };

  const capElems = []
  if (toggle) {
    capElems.push(
      <OptionCapability 
        key={toggle.id}
        id={toggle.id}
      />
    );
  }
  if (range) {
    capElems.push(
      <RangeCapability
        key={range.id}
        id={range.id}
        name={supportedCapability.name}
        capability={range.parameters(stream)}
        value={range.value(stream)}
      />
    );
  }

  return (
    <div>
      { capElems }
    </div>
  )
}
    
export default Capability;

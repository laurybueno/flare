import { useEffect, useState } from 'react';
import { FormControlLabel, FormGroup, Slider, Switch, Card, CardContent } from '@mui/material';
import { updateConstraint } from '../utils/capabilities';

function Capability({stream, supportedCapability, ...props}) {
  const [autoEnabled, setAutoEnabled] = useState(true);

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

  const getConstraintFromBool = b => b ? "continuous" : "manual";
  const getBoolFromConstraint = s => s === "continuous" ? true : false;
  const OptionCapability = ({ id }) => {
    return (
      <div>
        <FormGroup>
          <FormControlLabel control={
            <Switch
              checked={ autoEnabled }
              onChange={e => {
                updateConstraint(stream, id, getConstraintFromBool(e.target.checked));
                setAutoEnabled(e.target.checked);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          } label={"Automatic " + supportedCapability.name} />
        </FormGroup>
      </div>
    );
  };

  useEffect(() => {
    if (toggle) {
      setAutoEnabled(
        getBoolFromConstraint(
          toggle.value(stream)
      ));
    }
  }, []);
  
  const capElems = [];
  if (toggle) {
    capElems.push(
      <OptionCapability 
        key={toggle.id}
        id={toggle.id}
      />
    );
  }
  if (!toggle || (toggle && !autoEnabled)) {
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
    <Card sx={{ backgroundColor: "#4D243D" }}>
      <CardContent>
        { capElems }
      </CardContent>
    </Card>
  )
}
    
export default Capability;

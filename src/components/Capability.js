
function Capability({name, data, value, update, ...props}) {
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
}

export default Capability;

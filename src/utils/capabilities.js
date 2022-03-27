
export const getTrack = stream => stream.getVideoTracks()[0];
export const getConstraints = stream => getTrack(stream).getSettings();
export const getCapabilities = stream => getTrack(stream).getCapabilities();

export const getCapability = function(stream) { 
  return getCapabilities(stream)[this.id];
}

export const updateConstraint = async (s, k, v) => {
  await getTrack(s).applyConstraints({
    "advanced": [
      {
        [k]: v,
      }
    ],
  });
};

// Application supported capabilities
// FIXME: there is a lot of code duplication here. Turn this into a class based hierarchy
// FIXME: the browser capabilities API gets called far more than necessary below.
//        A call is only really required if the stream has changed
const supportedCapabilities = {
  brightness: {
    name: "Brightness",
    range: {
      id: "brightness",
      parameters: getCapability,
    },
    isSupported: function(s) {
      return this.range.id in getCapabilities(s);
    },
  },
  contrast: {
    name: "Contrast",
    range: {
      id: "contrast",
      parameters: getCapability,
    },
    isSupported: function(s) {
      return this.range.id in getCapabilities(s);
    },
  },
  saturation: {
    name: "Saturation",
    range: {
      id: "saturation",
      parameters: getCapability,
    },
    isSupported: function(s) {
      return this.range.id in getCapabilities(s);
    },
  },
  sharpness: {
    name: "Sharpness",
    range: {
      id: "sharpness",
      parameters: getCapability,
    },
    isSupported: function(s) {
      return this.range.id in getCapabilities(s);
    },
  },
  colorTemperature: {
    name: "Color Temperature",
    range: {
      id: "colorTemperature",
      parameters: getCapability,
    },
    toggle: {
      id: "whiteBalanceMode",
      parameters: getCapability,
    },
    isSupported: function(s) {
      const caps = getCapabilities(s);
      return this.range.id in caps && this.toggle.id in caps;
    },
  },
  focus: {
    name: "Focus",
    range: {
      id: "focusDistance",
      parameters: getCapability,
    },
    toggle: {
      id: "focusMode",
      parameters: getCapability,
    },
    isSupported: function(s) {
      const caps = getCapabilities(s);
      return this.range.id in caps && this.toggle.id in caps;
    },
  },
  exposure: {
    name: "Exposure",
    range: {
      id: "exposureTime",
      parameters: getCapability,
    },
    toggle: {
      id: "exposureMode",
      parameters: getCapability,
    },
    isSupported: function(s) {
      const caps = getCapabilities(s);
      return this.range.id in caps && this.toggle.id in caps;
    },
  },
};

// Browser enabled capabilities
export const getEnabledCapabilities = stream => {
  const availableCapabilities = {};
  for (const cap in supportedCapabilities) {
    if (supportedCapabilities[cap].isSupported(stream)) {
      availableCapabilities[cap] = supportedCapabilities[cap];
    }
  }
  return availableCapabilities;
};

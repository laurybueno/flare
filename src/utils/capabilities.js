
// Application supported capabilities
const supported_capabilities = {
  "brightness": {
    "name": "Brightness",
    "range": {
      "id": "brightness",
      "capabilities": null,
    },
  },
  "contrast": {
    "name": "Contrast",
    "range": {
      "id": "contrast",
      "capabilities": null,
    },
  },
  "saturation": {
    "name": "Saturation",
    "range": {
      "id": "saturation",
      "capabilities": null,
    },
  },
  "sharpness": {
    "name": "Sharpness",
    "range": {
      "id": "sharpness",
      "capabilities": null,
    },
  },
  "colorTemperature": {
    "name": "Color Temperature",
    "range": {
      "id": "colorTemperature",
      "capabilities": null,
    },
    "toggle": {
      "id": "whiteBalanceMode",
      "capabilities": null,
    },
  },
  "focus": {
    "name": "Focus",
    "range": {
      "id": "focusDistance",
      "capabilities": null,
    },
    "toggle": {
      "id": "focusMode",
      "capabilities": null,
    },
  },
  "exposure": {
    "name": "Exposure",
    "range": {
      "id": "exposureTime",
      "capabilities": null,
    },
    "toggle": {
      "id": "exposureMode",
      "capabilities": null,
    },
  },
};

export const getTrack = stream => stream.getVideoTracks()[0];
export const getConstraints = stream => getTrack(stream).getSettings();
export const getCapabilities = stream => getTrack(stream).getCapabilities();

export const updateConstraint = async (s, k, v) => {
  await getTrack(s).applyConstraints({
    "advanced": [
      {
        [k]: v,
      }
    ],
  });
};

// Browser enabled capabilities
export const getEnabledCapabilities = stream => {
  return getCapabilities(stream);
};

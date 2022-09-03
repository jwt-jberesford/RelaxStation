const audioLimitReducer = (state = 100, action) => {
  switch (action.type) {
    case "SET_AUDIO_0":
      return (state = 0);
    case "SET_AUDIO_25":
      return (state = 25);
    case "SET_AUDIO_50":
      return (state = 50);
    case "SET_AUDIO_75":
      return (state = 75);
    case "SET_AUDIO_100":
      return (state = 100);
    default:
      return state;
  }
};

export default audioLimitReducer;

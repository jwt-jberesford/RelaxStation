// this is called when the screensize is 750px or under
// and becomes false once the user clicks I understand

const initState = {
  understood: false, // false meaning message has not been okay'd by user
  presenceRequired: false, // false meaning message is not displayed
};

const sizeMessageReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_PRESENCE_REQUIRED":
      return {
        ...state,
        presenceRequired: action.payload.presenceRequired,
      };
    case "SET_MESSAGE_UNDERSTOOD":
      return {
        understood: true,
        presenceRequired: false,
      };
    default:
      return { ...state };
  }
};

export default sizeMessageReducer;

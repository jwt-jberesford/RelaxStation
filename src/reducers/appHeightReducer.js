const initState = {
  appHeight: 1,
  reduceRecordSize: false,
};

const appHeightReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_APP_HEIGHT":
      return { ...state, appHeight: action.payload.appHeight };

    case "SET_REDUCE_RECORD":
      return {
        ...state,
        reduceRecordSize: action.payload.reduceRecordSize,
      };

    default:
      return { ...state };
  }
};

export default appHeightReducer;

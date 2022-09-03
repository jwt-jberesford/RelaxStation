const initState = {
  navWidth: 1,
  rightBarWidth: 1,
  screenWidth: 1,
  mainWidth: 1,
};

const widthReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_SCREEN_WIDTH":
      return {
        ...state,
        screenWidth: action.payload.screenWidth,
      };
    case "SET_NAV_WIDTH":
      return {
        ...state,
        navWidth: action.payload.navWidth,
      };
    case "SET_RIGHT_BAR_WIDTH":
      return {
        ...state,
        rightBarWidth: action.payload.rightBarWidth,
      };

    case "SET_MAIN_WIDTH":
      return {
        ...state,
        mainWidth: action.payload.mainWidth,
      };
    case "SET_ALL_WIDTH":
      return {
        navWidth: action.payload.navWidth,
        rightBarWidth: action.payload.rightBarWidth,
        screenWidth: action.payload.mainWidth,
      };

    default:
      return { ...state };
  }
};

export default widthReducer;

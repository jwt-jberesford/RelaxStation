const initState = "settings";

const rightBarSelectionReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_RIGHT_BAR_SETTINGS":
      return (state = "settings");
    case "SET_RIGHT_BAR_RECENTLY_PLAYED":
      return (state = "recently_played");
    default:
      return state;
  }
};

export default rightBarSelectionReducer;

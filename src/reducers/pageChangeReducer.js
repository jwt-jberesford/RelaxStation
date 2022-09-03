const initState = {
  animationVal: false,
  newLocation: "/",
};

const pageChangeReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_PAGE_CHANGE_ANIM":
      return {
        animationVal: action.payload.animationVal,
        newLocation: action.payload.newLocation,
      };
    default:
      return { ...state };
  }
};

export default pageChangeReducer;

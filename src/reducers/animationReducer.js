const animationReducer = (state = true, action) => {
  switch (action.type) {
    case "SET_ANIMATION":
      return (state = action.payload);

    default:
      return state;
  }
};

export default animationReducer;

// when selection occurd from the home page, to show
// this is happening, set the state to true
// otherwise, state will always be false. This is
// so the return home arrow on selection knowns when to
// render

const homeSelectionReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_HOME_SELECTION_VALUE":
      return (state = action.payload);
    default:
      return state;
  }
};

export default homeSelectionReducer;

// False is search bar container closed, true is container open

const searchBarReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_SEARCH_BAR":
      return (state = action.payload);

    default:
      return state;
  }
};

export default searchBarReducer;

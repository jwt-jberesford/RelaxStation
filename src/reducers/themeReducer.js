const themeReducer = (state = "light", action) => {
  switch (action.type) {
    case "SET_THEME_LIGHT":
      return (state = "light");
    case "SET_THEME_DARK":
      return (state = "dark");
    default:
      return state;
  }
};

export default themeReducer;

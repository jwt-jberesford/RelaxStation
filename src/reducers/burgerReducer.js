const initState = {
  navBurger: false,
  settingsBurger: false,
  recentlyPlayedBurger: false,
}; // false is closed, true is open

const burgerReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_NAV_BURGER":
      return {
        ...state,
        navBurger: action.payload,
      };
    case "SET_SETTINGS_BURGER":
      return {
        ...state,
        settingsBurger: action.payload,
      };
    case "SET_RECENTLY_PLAYED_BURGER":
      return {
        ...state,
        recentlyPlayedBurger: action.payload,
      };
    case "SET_ALL_CLOSED":
      return {
        recentlyPlayedBurger: false,
        settingsBurger: false,
        navBurger: false,
      };
    case "SET_RIGHT_BAR_BURGERS":
      return {
        ...state,
        recentlyPlayedBurger: action.payload.rpBurger,
        settingsBurger: action.payload.sBurger,
      };
    default:
      return {
        ...state,
      };
  }
};

export default burgerReducer;

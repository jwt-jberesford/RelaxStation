import { combineReducers } from "redux";
import themeReducer from "./themeReducer";
import audioLimitReducer from "./audioLimitReducer";
import rightBarSelectionReducer from "./rightBarSelectionReducer";
import burgerReducer from "./burgerReducer";
import widthReducer from "./widthReducer";
import gridReducer from "./gridReducer";
import appHeightReducer from "./appHeightReducer";
import selectionReducer from "./selectionReducer";
import songReducer from "./songReducer";
import searchBarReducer from "./searchBarReducer";
import currentAlbumReducer from "./currentAlbumReducer";
import animationReducer from "./animationReducer";
import pageChangeReducer from "./pageChangeReducer";
import csOverrideReducer from "./CSOverride";
import sizeMessageReducer from "./sizeMessageReducer";

const allReducers = combineReducers({
  selection: selectionReducer,
  theme: themeReducer,
  audioLimit: audioLimitReducer,
  rightBarSelection: rightBarSelectionReducer,
  burger: burgerReducer,
  width: widthReducer,
  appHeight: appHeightReducer,
  grid: gridReducer,
  song: songReducer,
  searchBar: searchBarReducer,
  currentAlbum: currentAlbumReducer,
  animations: animationReducer,
  pageChangeAnim: pageChangeReducer,
  csOverride: csOverrideReducer,
  sizeMessage: sizeMessageReducer,
});

export default allReducers;

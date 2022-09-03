// Libraries
import styled from "styled-components";
import { Switch, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useLayoutEffect } from "react";

// Pages & Components
import Albums from "../Pages/Albums";
import Artists from "../Pages/Artists";
import Home from "../Pages/Home";
import Playlists from "../Pages/Playlists";
import SearchBar from "./SearchBar";
import RecordsTop from "./RecordsTop";
import Selection from "./Selection";
import HomeBanner from "./HomeBanner";
import { motion } from "framer-motion";

const Main = () => {
  // Grab needed width state
  const navWidth = useSelector((state) => state.width.navWidth);
  const rightBarWidth = useSelector((state) => state.width.rightBarWidth);
  const mainRef = useRef(null);
  const mainWidthState = useSelector((state) => state.width.mainWidth);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const selectionActive = useSelector((state) => state.selection.active);
  const appHeight = useSelector((state) => state.appHeight.appHeight);

  //  Update main width when neeeded
  useLayoutEffect(() => {
    if (mainRef.current.offsetWidth !== mainWidthState) {
      dispatch({
        type: "SET_MAIN_WIDTH",
        payload: {
          mainWidth: mainRef.current.offsetWidth,
        },
      });
    }

    // Workout how much room the search bar, title + arrows, and margin takes
    // If selection is active but not on home page

    let child1MTop = parseInt(
      window
        .getComputedStyle(mainRef.current.children[0])
        .getPropertyValue("margin-top")
        .split(" ")[0]
        .split("p")[0]
    );

    let child2MTop = parseInt(
      window
        .getComputedStyle(mainRef.current.children[1])
        .getPropertyValue("margin-top")
        .split(" ")[0]
        .split("p")[0]
    );
    let child3MTop = 0;

    // Child 3 margin top value is different depending on selection and location
    if (selectionActive & (pathname !== "/home")) {
      child3MTop = parseInt(
        window
          .getComputedStyle(mainRef.current.children[2])
          .getPropertyValue("margin-top")
          .split(" ")[0]
          .split("p")[0]
      );
    } else if (!selectionActive & (pathname !== "/home")) {
      child3MTop = 0;
    } else if (pathname === "/home") {
      child3MTop = parseInt(
        window
          .getComputedStyle(mainRef.current.children[2].children[0])
          .getPropertyValue("margin-top")
          .split(" ")[0]
          .split("p")[0]
      );
    }

    const childrenMTop = child1MTop + child2MTop + child3MTop;
    const child1Height = mainRef.current.children[0].offsetHeight;
    const child2Height = mainRef.current.children[1].offsetHeight;

    dispatch({
      type: "UPDATE_ABOVE_RECORDS_HEIGHT",
      payload: {
        aboveRecordsHeight: childrenMTop + child1Height + child2Height + 65,
      },
    });
  }, [mainWidthState, appHeight, pathname, selectionActive]);

  return (
    <StyledMain navWidth={navWidth} rightBarWidth={rightBarWidth} ref={mainRef}>
      <motion.div style={{ zIndex: 9999999 }}>
        <SearchBar />
      </motion.div>
      {pathname === "/home" ? <HomeBanner /> : <Selection />}
      {pathname === "/home" ? "" : <RecordsTop />}

      <Switch>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/artists">
          <Artists />
        </Route>
        <Route path="/albums">
          <Albums />
        </Route>
        <Route path="/playlists">
          <Playlists />
        </Route>
      </Switch>
    </StyledMain>
  );
};

const StyledMain = styled.div`
  left: ${(props) => props.navWidth}px;
  width: calc(
    100vw - ${(props) => props.navWidth + props.rightBarWidth}px - 1.7rem
  );
  z-index: 995;
`;

export default Main;

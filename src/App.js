// Libraries
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// Components & Pages
import Main from "./Components/Main";
import Nav from "./Components/Nav";
import RightBar from "./Components/RightBar";
import GlobalStyles from "./Components/GlobalStyles";
import useWindowSize from "./Components/Logic";
import PlayerBar from "./Components/PlayerBar";
import data from "./data/data";
import ScreenSizeMessage from "./Components/ScreenSizeMessage";

function App() {
  // State
  const theme = useSelector((state) => state.theme);
  const navBurger = useSelector((state) => state.burger.navBurger);
  const settingsBurger = useSelector((state) => state.burger.settingsBurger);
  const appHeightState = useSelector((state) => state.appHeight.appHeight);
  const recentlyPlayedBurger = useSelector(
    (state) => state.burger.recentlyPlayedBurger
  );

  const dispatch = useDispatch();
  const clearSelection = useSelector((state) => state.selection.clearSelection);
  const [dataDeclared, setDataDeclared] = useState(false);
  const animationState = useSelector((state) => state.animations);
  const searchBarState = useSelector((state) => state.searchBar);
  const sizeMessagePresenceRequired = useSelector(
    (state) => state.sizeMessage.presenceRequired
  );
  const sizeMessageUnderstood = useSelector(
    (state) => state.sizeMessage.understood
  );

  // Vars
  const screenWidth = useWindowSize();
  const { pathname } = useLocation();
  const appRef = useRef(null);
  const pageChangeAnimState = useSelector(
    (state) => state.pageChangeAnim.animationVal
  );
  const csOverride = useSelector((state) => state.csOverride);

  // On load change location to home page
  useEffect(() => {
    if (pathname === "/") {
      window.location.href = "/home";
    }
  }, [pathname]);

  // On location change, clear selectiopn change unless specified not to
  useEffect(() => {
    if (clearSelection & (pathname !== "/home") & !csOverride) {
      dispatch({
        type: "REMOVE_SELECTION",
      });
    } else {
      dispatch({
        type: "SET_CLEAR_SELECTION",
        payload: { clearSelection: true },
      });
    }
  }, [pathname, dispatch]);

  // Open / close search bar relative to e.target location
  const appHandler = (e) => {
    // If the user clicks off the right bar when it's open
    if (
      !e.target.className.split(" ").includes("rightBar") & settingsBurger ||
      !e.target.className.split(" ").includes("rightBar") & recentlyPlayedBurger
    ) {
      dispatch({
        type: "SET_RIGHT_BAR_BURGERS",
        payload: {
          rpBurger: false,
          sBurger: false,
        },
      });
    }

    // If user clicks off nav when nav is open
    if (!e.target.className.split(" ").includes("navBar") & navBurger) {
      dispatch({
        type: "SET_NAV_BURGER",
        payload: false,
      });
    }

    // If the user clicks on or off the search bar
    if (
      e.target.className.includes("item") &
        (e.target.className.split(" ")[2] !== "item") ||
      e.target.className.includes("searchbar")
    ) {
      dispatch({
        type: "SET_SEARCH_BAR",
        payload: true,
      });
    } else {
      dispatch({
        type: "SET_SEARCH_BAR",
        payload: false,
      });
    }
  };

  // On launch of app, set a random albums 1st song to current song
  useEffect(() => {
    const randomAlbum = data()[Math.floor(Math.random() * data().length)];
    if (!dataDeclared) {
      dispatch({
        type: "SET_CURRENT_ALBUM",
        payload: {
          id: randomAlbum.id,
          album_name: randomAlbum.album_name,
          album_photo: randomAlbum.album_photo,
          artist_name: randomAlbum.artist_name,
          artist_photo: randomAlbum.artist_photo,
          song_audio: randomAlbum.song_audio,
          song_names: randomAlbum.song_names,
          current_index: 0,
          type: "album",
          song_lengths: randomAlbum.song_lengths,
        },
      });
      dispatch({
        type: "SET_CURRENT_SONG_STOP",
        payload: {
          audioSrc: randomAlbum.song_audio[0],
          songName: randomAlbum.song_names[0],
          artistName: randomAlbum.artist_name,
          thumbnailPic: randomAlbum.artist_photo,
        },
      });
      setDataDeclared(true);
    }
  }, [dispatch, pathname]);

  // Stop the window scrolling down on press of space bar
  window.addEventListener("keydown", function (e) {
    if ((e.keyCode === 27) & searchBarState) {
      dispatch({
        type: "SET_SEARCH_BAR",
        payload: false,
      });
    }

    // Space bar, remove scrolling
    else if (e.keyCode === 32 && e.target === document.body) {
      e.preventDefault();
    }
  });

  // on change of screen width to 750px or under,
  // if sizeMessageUnderstood is false, display message
  useEffect(() => {
    if ((screenWidth <= 750) & !sizeMessageUnderstood) {
      dispatch({
        type: "SET_PRESENCE_REQUIRED",
        payload: {
          presenceRequired: true,
        },
      });
    } else {
      dispatch({
        type: "SET_PRESENCE_REQUIRED",
        payload: {
          presenceRequired: false,
        },
      });
    }
  }, [screenWidth]);

  return (
    <StyledApp
      theme={theme}
      screenWidth={screenWidth}
      navBurger={navBurger}
      settingsBurger={settingsBurger}
      recentlyPlayedBurger={recentlyPlayedBurger}
      ref={appRef}
      onClick={appHandler}
      appHeight={appHeightState}
      animationState={animationState}
    >
      <ScreenSizeMessage />
      <PlayerBar />
      <StyledMain
        sizeMessagePresenceRequired={sizeMessagePresenceRequired}
        sizeMessageUnderstood={sizeMessageUnderstood}
        animationState={animationState}
        theme={theme}
        screenWidth={screenWidth}
        appHeight={appHeightState}
      >
        <GlobalStyles theme={theme} animationState={animationState} />
        <Nav />
        <motion.div
          style={{ zIndex: 987 }}
          animate={
            pageChangeAnimState & animationState
              ? {
                  opacity: 0,
                  transition: { duration: 0.5 },
                }
              : {
                  opacity: 1,
                  transition: { duration: 0.5 },
                }
          }
        >
          <Main />
        </motion.div>
        <RightBar />

        <NavShadow
          navBurger={navBurger}
          settingsBurger={settingsBurger}
          recentlyPlayedBurger={recentlyPlayedBurger}
          screenWidth={screenWidth}
          height={appHeightState}
          animationState={animationState}
          animate={
            animationState
              ? navBurger & (screenWidth < 1300) ||
                recentlyPlayedBurger & (screenWidth < 1300) ||
                settingsBurger & (screenWidth < 1300) ||
                (screenWidth <= 750) & !sizeMessageUnderstood
                ? {
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      ease: "easeOut",
                    },
                  }
                : { opacity: 0, transition: { duration: 0.8 } }
              : navBurger & (screenWidth < 1300) ||
                recentlyPlayedBurger & (screenWidth < 1300) ||
                settingsBurger & (screenWidth < 1300) ||
                (screenWidth <= 750) & !sizeMessageUnderstood
              ? {
                  opacity: 1,
                  transition: {
                    duration: 0,
                    ease: "easeOut",
                  },
                }
              : { opacity: 0, transition: { duration: 0 } }
          }
        />
      </StyledMain>
    </StyledApp>
  );
}

const StyledMain = styled.div`
  display: flex;
  flex-direction: row;
  height: ${(props) => props.appHeight - 40}px;
  transition: ${(props) => (props.animationState ? "all 0.5s ease" : "")};
  pointer-events: ${(props) =>
    props.sizeMessagePresenceRequired & !props.sizeMessageUnderstood
      ? "none"
      : "auto"};
`;

const StyledApp = styled.div`
  background: ${(props) => (props.theme === "light" ? "white" : "#121212")};
  display: flex;
  flex-direction: column;
  height: ${(props) => props.appHeight + 40}px;
  position: relative;
  overflow: hidden;
  transition: ${(props) => (props.animationState ? "all 0.5s ease" : "")};
`;

const NavShadow = styled(motion.div)`
  width: 100%;
  height: ${(props) => props.height}px;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 998;
  pointer-events: none;
`;

export default App;

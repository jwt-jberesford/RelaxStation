// Libraries
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

// Components
import { StyledBar, StyledTop } from "./styles";
import RightBarButtons from "./rightBarButtons";
import RightBarSettings from "./rightBarSettings";
import RecentlyPlayed from "./RecentlyPlayed";
import { PointedArrow } from "./icons";

const DesktopRightBar = () => {
  // Grab needed state and set vars
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const rightBarState = useSelector((state) => state.rightBarSelection);
  const screenWidth = useSelector((state) => state.width.screenWidth);
  const appHeightState = useSelector((state) => state.appHeight.appHeight);
  const animationState = useSelector((state) => state.animations);
  const settingsBurger = useSelector((state) => state.burger.settingsBurger);
  const recentlyPlayedBurger = useSelector(
    (state) => state.recentlyPlayedBurger
  );
  const mobileStyles = {
    background: `${theme === "light" ? "white" : "#121212"}`,
    zIndex: 999,
    position: "absolute",
    top: "-5.1rem",
    right: "-6.15rem",
    height: `calc(${appHeightState}px - 5rem)`,
    borderLeft: `3px solid ${
      settingsBurger || recentlyPlayedBurger
        ? theme === "light"
          ? "rgba(0, 0, 0, 0.25)"
          : "rgba(255, 255, 255, 0.125)"
        : "rgba(255, 255, 255, 0)"
    }`,
  };

  // handlers
  const closeBarHandler = () => {
    dispatch({ type: "SET_ALL_CLOSED" });
  };

  return (
    <StyledRightBar
      theme={theme}
      width={screenWidth}
      style={screenWidth < 1299 ? mobileStyles : {}}
      className="rightBar desktop"
      animationState={animationState}
    >
      {/* 
        Top of screen will render buttons if on desktop version,
        or the title of the current selection if on mobile version 
       */}
      {screenWidth > 1299 ? (
        <RightBarButtons className="rightBar buttons-top" />
      ) : (
        <RightBarTop
          theme={theme}
          className="rightBar top-parent-container"
          animationState={animationState}
        >
          <motion.h1 className="rightBar main-title">
            {settingsBurger ? "Settings" : "Recently played"}
          </motion.h1>
          <motion.button
            onClick={closeBarHandler}
            className="rightBar arrow-exit"
          >
            <PointedArrow className="rightBar pointed-arrow" />
          </motion.button>
        </RightBarTop>
      )}

      {/* 
        Desktop renders relative to the rightBarState
      */}
      {screenWidth > 1299 ? (
        <motion.div
          style={{
            width: "calc(100% + 3px)",
            translateX: "-3px",
            overflow: "hidden",
          }}
        >
          <motion.div
            animate={
              rightBarState === "settings"
                ? {
                    translateX: "calc(0% + 3px)",
                    transition: animationState
                      ? { duration: 0.5 }
                      : { duration: 0 },
                  }
                : {
                    translateX: "calc(-105% + 3px)",
                    transition: animationState
                      ? { duration: 0.5 }
                      : { duration: 0 },
                  }
            }
          >
            <RightBarSettings className="rightBar settings" />
          </motion.div>
          <motion.div
            style={{ translateY: "calc(-82% + 3px)" }}
            animate={
              rightBarState === "settings"
                ? {
                    translateX: "calc(105% + 3px)",
                    transition: animationState
                      ? { duration: 0.5 }
                      : { duration: 0 },
                  }
                : {
                    translateX: "calc(0% + 3px)",
                    transition: animationState
                      ? { duration: 0.5 }
                      : { duration: 0 },
                  }
            }
          >
            <RecentlyPlayed className="rightBar recent-played" />
          </motion.div>
        </motion.div>
      ) : // Mobile renders - Where I render relative,  to the
      //     settingsBurger and recentlyPlayedBurger. Cannot put this as
      //     statement above because one of the vars may be out of date
      settingsBurger ? (
        <RightBarSettings className="rightBar settings" />
      ) : (
        <RecentlyPlayed className="rightBar recently-played" />
      )}
    </StyledRightBar>
  );
};

const StyledRightBar = styled(StyledBar)`
  width: 30rem;
  transition: ${(props) => (props.animationState ? "all 0.5s ease" : "")};
  background: ${(props) => (props.theme === "light" ? "white" : "#121212")};
  z-index: 998;
  position: relative;
`;

const RightBarTop = styled(StyledTop)`
  display: flex;
  flex-direction: row;
  transform: translateX(-5px);
  transition: ${(props) => (props.animationState ? "all 0.5s ease" : "")};
  h1 {
    color: #3ca8c9;
    transform: translateY(-13px) translateX(2px);
    width: 75%;
  }
  button {
    transform: translateY(-6px);
    width: 25%;
    height: 2rem;
    svg {
      height: 100%;
      transition: ${(props) => (props.animationState ? "all .1s ease" : "")};
    }

    &:hover {
      svg {
        transform: scale(1.2);
      }
    }
  }

  .arrow-exit {
    transform: translateX(-5rem) translateY(-6px);
  }
`;

export default DesktopRightBar;

// Libraries
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { motion } from "framer-motion";

// Components and icons
import { StyledContainer } from "./styles";
import { SunIcon, MoonIcon, BulletPointIcon, FilmReelIcon } from "./icons";

const RightBarSettings = () => {
  // Grab needed state and set vars
  const theme = useSelector((state) => state.theme);
  const volumeLimit = useSelector((state) => state.audioLimit);
  const dispatch = useDispatch();
  const screenWidth = useSelector((state) => state.width.screenWidth);
  const animationState = useSelector((state) => state.animations);
  const [rightBarHoverState, setRightBarHoverState] = useState({
    lightMode: false,
    darkMode: false,
    zeroPer: false,
    twentyFivePer: false,
    fiftyPer: false,
    seventyFivePer: false,
    oneHundredPer: false,
    animOn: false,
    animOff: false,
  });

  // Style funcs
  const themeStyleBorder = (word) => {
    return {
      borderLeft: `3px solid ${word === theme ? " #3ca8c9" : "rgba(0,0,0,0)"} `,
      transition: `${animationState ? "all .75s ease" : "none"}`,
    };
  };

  const volumeStyleBorder = (value) => {
    return {
      borderLeft: `3px solid ${
        value === volumeLimit ? " #3ca8c9" : "rgba(0,0,0,0)"
      } `,
      transition: `${animationState ? "all .75s ease" : "none"}`,
    };
  };

  const volumeStyleColor = (value) => {
    return {
      color: `${volumeLimit === value ? " #3ca8c9" : ""} `,
      transition: `${animationState ? "all .75s ease" : "none"}`,
    };
  };

  const animationBorderStyle = (value) => {
    return {
      borderLeft: `${
        animationState === value
          ? "3px solid #3ca8c9"
          : "3px solid rgba(0,0,0,0)"
      }`,
      transition: `${animationState ? "all .75s ease" : "none"}`,
    };
  };

  const animationButtonStyle = (value) => {
    return {
      color: `${
        value === animationState
          ? "#3ca8c9"
          : theme === "light"
          ? "#898989"
          : "white"
      }`,
    };
  };

  // Handlers
  const themeHandler = (themeName) => {
    if (themeName !== theme) {
      dispatch({
        type: `SET_THEME_${themeName.toUpperCase()}`,
      });
      closeBurger();
    }
  };

  const volumeButtonHandler = (volumeValue) => {
    if (volumeValue !== volumeLimit) {
      dispatch({
        type: `SET_AUDIO_${volumeValue}`,
      });
      closeBurger();
    }
  };

  const closeBurger = () => {
    if (screenWidth < 1300) {
      dispatch({ type: "SET_ALL_CLOSED" });
    }
  };

  const animationHandler = (value) => {
    if (value !== animationState) {
      dispatch({
        type: "SET_ANIMATION",
        payload: value,
      });
    }
  };

  const rightBarHoverHandler = (item, boolVal) => {
    if (item === "lightMode") {
      setRightBarHoverState({
        lightMode: boolVal,
        darkMode: false,
        zeroPer: false,
        twentyFivePer: false,
        fiftyPer: false,
        seventyFivePer: false,
        oneHundredPer: false,
        animOn: false,
        animOff: false,
      });
    } else if (item === "darkMode") {
      setRightBarHoverState({
        lightMode: false,
        darkMode: boolVal,
        zeroPer: false,
        twentyFivePer: false,
        fiftyPer: false,
        seventyFivePer: false,
        oneHundredPer: false,
        animOn: false,
        animOff: false,
      });
    } else if (item === "zeroPer") {
      setRightBarHoverState({
        lightMode: false,
        darkMode: false,
        zeroPer: boolVal,
        twentyFivePer: false,
        fiftyPer: false,
        seventyFivePer: false,
        oneHundredPer: false,
        animOn: false,
        animOff: false,
      });
    } else if (item === "twentyFivePer") {
      setRightBarHoverState({
        lightMode: false,
        darkMode: false,
        zeroPer: false,
        twentyFivePer: boolVal,
        fiftyPer: false,
        seventyFivePer: false,
        oneHundredPer: false,
        animOn: false,
        animOff: false,
      });
    } else if (item === "fiftyPer") {
      setRightBarHoverState({
        lightMode: false,
        darkMode: false,
        zeroPer: false,
        twentyFivePer: false,
        fiftyPer: boolVal,
        seventyFivePer: false,
        oneHundredPer: false,
        animOn: false,
        animOff: false,
      });
    } else if (item === "seventyFivePer") {
      setRightBarHoverState({
        lightMode: false,
        darkMode: false,
        zeroPer: false,
        twentyFivePer: false,
        fiftyPer: false,
        seventyFivePer: boolVal,
        oneHundredPer: false,
        animOn: false,
        animOff: false,
      });
    } else if (item === "oneHundredPer") {
      setRightBarHoverState({
        lightMode: false,
        darkMode: false,
        zeroPer: false,
        twentyFivePer: false,
        fiftyPer: false,
        seventyFivePer: false,
        oneHundredPer: boolVal,
        animOn: false,
        animOff: false,
      });
    } else if (item === "animOn") {
      setRightBarHoverState({
        lightMode: false,
        darkMode: false,
        zeroPer: false,
        twentyFivePer: false,
        fiftyPer: false,
        seventyFivePer: false,
        oneHundredPer: false,
        animOn: boolVal,
        animOff: false,
      });
    } else if (item === "animOff") {
      setRightBarHoverState({
        lightMode: false,
        darkMode: false,
        zeroPer: false,
        twentyFivePer: false,
        fiftyPer: false,
        seventyFivePer: false,
        oneHundredPer: false,
        animOn: false,
        animOff: boolVal,
      });
    }
  };

  return (
    <FullContainer className="rightBar settings">
      <StyledBarContainer
        theme={theme}
        screenWidth={screenWidth}
        className="rightBar container1"
        animationState={animationState}
      >
        <h4 className="rightBar container1 title">VIEW</h4>
        <li
          className="rightBar light-theme"
          style={
            rightBarHoverState.lightMode
              ? {
                  borderLeft: "3px solid #3ca8c9",
                  transition: `${animationState ? "all .5s ease" : "none"}`,
                }
              : themeStyleBorder("light")
          }
          onClick={() => {
            themeHandler("light");
          }}
          onMouseEnter={() => {
            rightBarHoverHandler("lightMode", true);
          }}
          onMouseLeave={() => {
            rightBarHoverHandler("lightMode", false);
          }}
        >
          <button
            className="rightBar light-theme-button"
            animationState={animationState}
            style={{
              color:
                theme === "light" || rightBarHoverState.lightMode
                  ? "#3ca8c9"
                  : "white",
            }}
          >
            <SunIcon
              theme={theme}
              className="rightBar light-theme-icon"
              hoverState={rightBarHoverState.lightMode}
            />
            Light mode
          </button>
        </li>

        <li
          style={
            rightBarHoverState.darkMode
              ? {
                  borderLeft: "3px solid #3ca8c9",
                  transition: `${animationState ? "all .5s ease" : "none"}`,
                }
              : themeStyleBorder("dark")
          }
          className="rightBar dark-theme-li"
          onClick={() => {
            themeHandler("dark");
          }}
          onMouseEnter={() => {
            rightBarHoverHandler("darkMode", true);
          }}
          onMouseLeave={() => {
            rightBarHoverHandler("darkMode", false);
          }}
        >
          <button
            animationState={animationState}
            style={{
              color:
                theme === "dark" || rightBarHoverState.darkMode
                  ? "#3ca8c9"
                  : "#898989",
            }}
            className="rightBar dark-theme-button"
          >
            <MoonIcon
              theme={theme}
              className="rightBar dark-theme-icon"
              hoverState={rightBarHoverState.darkMode}
            />
            Dark mode
          </button>
        </li>
      </StyledBarContainer>

      <StyledBarContainer
        theme={theme}
        className="rightBar container2"
        animationState={animationState}
      >
        <h4 className="rightBar container2 title">VOLUME LIMIT</h4>

        <li
          style={
            rightBarHoverState.zeroPer
              ? {
                  borderLeft: "3px solid #3ca8c9",
                  transition: `${animationState ? "all .5s ease" : "none"}`,
                }
              : volumeStyleBorder(0)
          }
          onClick={() => {
            volumeButtonHandler(0);
          }}
          className="rightBar volume-li-0"
          onMouseEnter={() => {
            rightBarHoverHandler("zeroPer", true);
          }}
          onMouseLeave={() => {
            rightBarHoverHandler("zeroPer", false);
          }}
        >
          <button
            animationState={animationState}
            style={
              rightBarHoverState.zeroPer
                ? { color: "#3ca8c9" }
                : volumeStyleColor(0)
            }
            className="rightBar volumeButton 0"
          >
            <BulletPointIcon
              theme={theme}
              state={volumeLimit}
              value={0}
              className="rightBar volumeSvg 0"
              hoverState={rightBarHoverState.zeroPer}
            />
            0%
          </button>
        </li>

        <li
          style={
            rightBarHoverState.twentyFivePer
              ? {
                  borderLeft: "3px solid #3ca8c9",
                  transition: `${animationState ? "all .5s ease" : "none"}`,
                }
              : volumeStyleBorder(25)
          }
          className="rightBar volume-li-25"
          onClick={() => {
            volumeButtonHandler(25);
          }}
          onMouseEnter={() => {
            rightBarHoverHandler("twentyFivePer", true);
          }}
          onMouseLeave={() => {
            rightBarHoverHandler("twentyFivePer", false);
          }}
        >
          <button
            animationState={animationState}
            style={
              rightBarHoverState.twentyFivePer
                ? { color: "#3ca8c9" }
                : volumeStyleColor(25)
            }
            className="rightBar volumeButton 25"
          >
            <BulletPointIcon
              theme={theme}
              state={volumeLimit}
              value={25}
              className="rightBar volumeSvg 25"
              hoverState={rightBarHoverState.twentyFivePer}
            />
            25%
          </button>
        </li>

        <li
          style={
            rightBarHoverState.fiftyPer
              ? {
                  borderLeft: "3px solid #3ca8c9",
                  transition: `${animationState ? "all .5s ease" : "none"}`,
                }
              : volumeStyleBorder(50)
          }
          className="rightBar volume-li-50"
          onClick={() => {
            volumeButtonHandler(50);
          }}
          onMouseEnter={() => {
            rightBarHoverHandler("fiftyPer", true);
          }}
          onMouseLeave={() => {
            rightBarHoverHandler("fiftyPer", false);
          }}
        >
          <button
            animationState={animationState}
            style={
              rightBarHoverState.fiftyPer
                ? { color: "#3ca8c9" }
                : volumeStyleColor(50)
            }
            className="volumeButton rightBar volumeButton-50  volumeButton 50"
          >
            <BulletPointIcon
              theme={theme}
              state={volumeLimit}
              value={50}
              className="rightBar volumeSvg 50 "
              hoverState={rightBarHoverState.fiftyPer}
            />
            50%
          </button>
        </li>

        <li
          style={
            rightBarHoverState.seventyFivePer
              ? {
                  borderLeft: "3px solid #3ca8c9",
                  transition: `${animationState ? "all .5s ease" : "none"}`,
                }
              : volumeStyleBorder(75)
          }
          className="rightBar volume-li-75"
          onClick={() => {
            volumeButtonHandler(75);
          }}
          onMouseEnter={() => {
            rightBarHoverHandler("seventyFivePer", true);
          }}
          onMouseLeave={() => {
            rightBarHoverHandler("seventyFivePer", false);
          }}
        >
          <button
            animationState={animationState}
            className="rightBar volumeButton 75"
            style={
              rightBarHoverState.seventyFivePer
                ? { color: "#3ca8c9" }
                : volumeStyleColor(75)
            }
          >
            <BulletPointIcon
              theme={theme}
              state={volumeLimit}
              value={75}
              className="rightBar volumeSvg 75"
              hoverState={rightBarHoverState.seventyFivePer}
            />
            75%
          </button>
        </li>

        <li
          style={
            rightBarHoverState.oneHundredPer
              ? {
                  borderLeft: "3px solid #3ca8c9",
                  transition: `${animationState ? "all .5s ease" : "none"}`,
                }
              : volumeStyleBorder(100)
          }
          className="rightBar volume-li-100"
          onClick={() => {
            volumeButtonHandler(100);
          }}
          onMouseEnter={() => {
            rightBarHoverHandler("oneHundredPer", true);
          }}
          onMouseLeave={() => {
            rightBarHoverHandler("oneHundredPer", false);
          }}
        >
          <button
            animationState={animationState}
            className="rightBar volumeButton 100"
            style={
              rightBarHoverState.oneHundredPer
                ? { color: "#3ca8c9" }
                : volumeStyleColor(100)
            }
          >
            <BulletPointIcon
              theme={theme}
              state={volumeLimit}
              value={100}
              className="rightBar volumeSvg 100"
              hoverState={rightBarHoverState.oneHundredPer}
            />
            100%
          </button>
        </li>
      </StyledBarContainer>

      <StyledBarContainer
        className="rightBar container3"
        animationState={animationState}
      >
        <h4 className="rightBar container3-title">Animations</h4>

        <li
          className="rightBar animations-on"
          onClick={() => animationHandler(true)}
          style={
            rightBarHoverState.animOn
              ? {
                  borderLeft: "3px solid #3ca8c9",
                  transition: `${animationState ? "all .5s ease" : "none"}`,
                }
              : animationBorderStyle(true)
          }
          onMouseEnter={() => {
            rightBarHoverHandler("animOn", true);
          }}
          onMouseLeave={() => {
            rightBarHoverHandler("animOn", false);
          }}
        >
          <button
            animationState={animationState}
            className="rightBar animations-on-button"
            style={
              rightBarHoverState.animOn
                ? { color: "#3ca8c9" }
                : animationButtonStyle(true)
            }
          >
            <FilmReelIcon
              theme={theme}
              value={true}
              state={animationState}
              className="rightBar animation-on-icon"
              hoverState={rightBarHoverState.animOn}
              animationState={animationState}
            />
            On
          </button>
        </li>

        <li
          className="rightBar animations-off"
          onClick={() => animationHandler(false)}
          style={
            rightBarHoverState.animOff
              ? {
                  borderLeft: "3px solid #3ca8c9",
                  transition: `${animationState ? "all .5s ease" : "none"}`,
                }
              : animationBorderStyle(false)
          }
          onMouseEnter={() => {
            rightBarHoverHandler("animOff", true);
          }}
          onMouseLeave={() => {
            rightBarHoverHandler("animOff", false);
          }}
        >
          <button
            animationState={animationState}
            className="rightBar animations-off-button"
            style={
              rightBarHoverState.animOff
                ? { color: "#3ca8c9" }
                : animationButtonStyle(false)
            }
          >
            <FilmReelIcon
              theme={theme}
              value={false}
              state={animationState}
              className="rightBar animation-off-icon"
              hoverState={rightBarHoverState.animOff}
              animationState={animationState}
            />
            Off
          </button>
        </li>
      </StyledBarContainer>
    </FullContainer>
  );
};

const FullContainer = styled(motion.div)`
  transform: translateY(-4.1rem);
`;

const StyledBarContainer = styled(StyledContainer)`
  margin-left: 0;
  transition: ${(props) => (props.animationState ? "all 0.75s ease" : "")};

  h4 {
    margin-left: 4rem;
    transform: ${(props) =>
      props.screenWidth < 1299 ? "translateX(-3px)" : "translateX(-4px)"};
  }

  li {
    width: calc(100% + 3px);
    transform: translateX(-3px);
    transition: ${(props) =>
      props.animationState ? "transition all 0.75s ease" : ""};
    margin-bottom: 2.1rem;
  }

  button {
    display: flex;
    margin-left: 3.5rem;
    transform: translateX(-3px);
    transition: ${(props) => (props.animationState ? "all 0.5s ease" : "")};

    svg {
      transform: translateY(0.25rem) translateX(2px);
      margin-right: calc(2rem - 9px);
    }
  }

  .volumeButton {
    transform: translateX(0px);
    svg {
      transform: translateY(0.25rem) translateX(-5px);
    }
  }

  .light-theme-button,
  .dark-theme-button {
    transform: translateX(-1px);

    svg {
      transform: translateX(-4px);
    }
  }

  .animations-off,
  .animations-on {
    button {
      transform: translateX(0px);
    }

    svg {
      transform: translateX(-3px) translateY(1px);
    }
  }
`;

export default RightBarSettings;

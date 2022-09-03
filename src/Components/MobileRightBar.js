// Libraries
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

// Components & icons
import { StyledBar, StyledContainer } from "./styles";
import { RecentlyPlayedIcon, SettingsIcon, QuitIcon } from "./icons";

const MobileRightBar = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const screenHeight = useSelector((state) => state.appHeight.appHeight);
  const [iconHover, setIconHover] = useState({
    settingsIcon: false,
    recentlyPlayedIcon: false,
    quitIcon: false,
  });
  const animationState = useSelector((state) => state.animations);
  const screenWidth = useSelector((state) => state.width.screenWidth);

  // Icon handler
  const iconHandler = (icon) => {
    dispatch({
      type: `SET_${icon.toUpperCase()}_BURGER`,
      payload: true,
    });
  };

  // if scrollbar is visible, then make width 58px. else set width to 41
  useEffect(() => {
    if (window.innerHeight >= screenHeight) {
      dispatch({
        type: "SET_RIGHT_BAR_WIDTH",
        payload: {
          rightBarWidth: 48,
        },
      });
    } else {
      dispatch({
        type: "SET_RIGHT_BAR_WIDTH",
        payload: {
          rightBarWidth: 65,
        },
      });
    }
  }, [screenHeight, screenWidth]);

  return (
    <StyledMobileRightBar animationState={animationState}>
      <RightBarContainer
        screenHeight={screenHeight}
        animationState={animationState}
      >
        <button
          animationState={animationState}
          className="settingsIcon"
          onClick={() => iconHandler("settings")}
          style={
            iconHover.settingsIcon
              ? {
                  borderLeft: "3px solid #3ca8c9",
                }
              : {
                  borderLeft: "3px solid rgba(0, 0, 0, 0)",
                }
          }
          onMouseEnter={() => {
            setIconHover({
              settingsIcon: true,
              recentlyPlayedIcon: false,
              quitIcon: false,
            });
          }}
          onMouseLeave={() => {
            setIconHover({
              settingsIcon: false,
              recentlyPlayedIcon: false,
              quitIcon: false,
            });
          }}
        >
          <SettingsIcon
            rightBarState={""}
            theme={theme}
            hoverState={iconHover.settingsIcon}
            animationState={animationState}
          />
        </button>

        <button
          animationState={animationState}
          className="recentlyPlayedIcon"
          onClick={() => iconHandler("recently_played")}
          onMouseEnter={() => {
            setIconHover({
              settingsIcon: false,
              recentlyPlayedIcon: true,
              quitIcon: false,
            });
          }}
          onMouseLeave={() => {
            setIconHover({
              settingsIcon: false,
              recentlyPlayedIcon: false,
              quitIcon: false,
            });
          }}
          style={
            iconHover.recentlyPlayedIcon
              ? {
                  borderLeft: "3px solid #3ca8c9",
                }
              : {
                  borderLeft: "3px solid rgba(0, 0, 0, 0)",
                }
          }
        >
          <RecentlyPlayedIcon
            rightBarState={""}
            theme={theme}
            hoverState={iconHover.recentlyPlayedIcon}
          />
        </button>

        <button
          animationState={animationState}
          className="quitIcon"
          onClick={() => iconHandler("quit")}
          onMouseEnter={() => {
            setIconHover({
              settingsIcon: false,
              recentlyPlayedIcon: false,
              quitIcon: true,
            });
          }}
          onMouseLeave={() => {
            setIconHover({
              settingsIcon: false,
              recentlyPlayedIcon: false,
              quitIcon: false,
            });
          }}
          style={
            iconHover.quitIcon
              ? {
                  borderLeft: "3px solid #3ca8c9",
                }
              : {
                  borderLeft: "3px solid rgba(0, 0, 0, 0)",
                }
          }
        >
          <QuitIcon theme={theme} hoverState={iconHover.quitIcon} />
        </button>
      </RightBarContainer>
    </StyledMobileRightBar>
  );
};

const StyledMobileRightBar = styled(StyledBar)`
  width: calc(6.5rem - 10px);
  transform: translateY(-16px) translateX(-1.8px);
  position: relative;
  transition: ${(props) => (props.animationState ? "all .5s ease" : "none")};
`;

const RightBarContainer = styled(StyledContainer)`
  margin: 5.1rem 0rem 0rem 0rem;
  a,
  button {
    transition: ${(props) => (props.animationState ? "all 0.5s ease" : "none")};
    width: 6.5rem;
    margin: 4rem 0rem;
    display: flex;
    align-items: center;
    svg {
      transform: translate(calc(5rem / 3 + 5px), 0rem);
      width: calc(5rem / 3 - 1px);
      height: calc(5rem / 3);
    }
  }

  button {
    transform: scale(1) !important;
    width: calc(23rem);
  }

  .settingsIcon {
    transform: translateX(calc(0.75rem + 7px)) scale(1.1) translateY(-1px);
  }
  .recentlyPlayedIcon {
    transform: translateX(calc(0.75rem + 7px)) scale(1.1) translateY(-0.5px);
  }
  .quitIcon {
    transform: translateX(calc(0.75rem + 7px)) scale(1.1) translateY(-2.5px);
  }
`;

export default MobileRightBar;

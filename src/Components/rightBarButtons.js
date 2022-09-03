// Libraries
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

// Components and icons
import { StyledTop, ButtonBreak } from "./styles";
import { QuitIcon, SettingsIcon, RecentlyPlayedIcon } from "./icons";

const RightBarButtons = () => {
  // Grab needed state and set vars
  const theme = useSelector((state) => state.theme);
  const rightBarState = useSelector((state) => state.rightBarSelection);
  const dispatch = useDispatch();
  const animationState = useSelector((state) => state.animations);

  // Handlers
  const buttonHandler = (buttonName) => {
    if (buttonName !== rightBarState) {
      dispatch({
        type: `SET_RIGHT_BAR_${buttonName.toUpperCase()}`,
      });
    }
  };
  return (
    <StyledRightBarTop
      className="rightBar top-container"
      animationState={animationState}
    >
      <button className="rightBar quit-button">
        <QuitIcon theme={theme} className="rightBar icon-quit" />
      </button>
      <ButtonBreak theme={theme} className="rightBar button-break1" />

      <button
        onClick={() => {
          buttonHandler("settings");
        }}
        className="rightBar settings-button"
      >
        <SettingsIcon
          rightBarState={rightBarState}
          theme={theme}
          className="rightBar settings-button-svg"
        />
      </button>

      <ButtonBreak theme={theme} className="rightBar button-break2" />

      <button
        onClick={() => {
          buttonHandler("recently_played");
        }}
        className="rightBar recently-played-button "
      >
        <RecentlyPlayedIcon
          rightBarState={rightBarState}
          theme={theme}
          className="rightBar recently-played-button-svg"
        />
      </button>
    </StyledRightBarTop>
  );
};

const StyledRightBarTop = styled(StyledTop)`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-left: calc(3.6rem);
  width: 23rem;

  button {
    height: 2.4rem;
    svg {
      height: 100%;
      // static width, matching the height, keeping correct dimensions for the SVG and button
      width: 2.4rem;
      transition: ${(props) =>
        props.animationState ? "all .1s ease" : "none"};
    }

    &:hover {
      svg {
        transform: scale(1.2);
      }
    }
  }
`;

export default RightBarButtons;

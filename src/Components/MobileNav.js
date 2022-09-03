// Libraries
import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import { motion } from "framer-motion";

// Components
import { StyledBar, StyledContainer } from "./styles";

// Icons
import {
  HomeIcon,
  ArtistsIcon,
  AlbumsIcon,
  LateNightIcon,
  StudyingIcon,
  DrivingIcon,
  AmbienceIcon,
  BurgerIcon,
} from "./icons";

const MobileNav = () => {
  const dispatch = useDispatch();
  const navBurger = useSelector((state) => state.burger.navBurger);
  const newLocationAnimState = useSelector(
    (state) => state.pageChangeAnim.newLocation
  );
  const theme = useSelector((state) => state.theme);
  const activeStyle = { color: "#3ca8c9", borderRight: "3px solid #3ca8c9" };
  const inactiveStyle = {
    color: `${theme === "light" ? "#898989" : "white"}`,
  };
  const history = useHistory();
  const { pathname } = useLocation();
  const animationState = useSelector((state) => state.animations);

  // Handers
  const burgerHandler = () => {
    dispatch({
      type: "SET_NAV_BURGER",
      payload: !navBurger,
    });
  };

  const delayAndGo = (e, path) => {
    if (animationState) {
      e.preventDefault(); // prevent link working how it normally would

      const newLocation = path;

      // anim logic here
      dispatch({
        type: "SET_PAGE_CHANGE_ANIM",
        payload: {
          animationVal: true,
          newLocation: newLocation,
        },
      });

      // timeout for link func
      setTimeout(() => {
        history.push(path); // change location

        dispatch({
          type: "SET_PAGE_CHANGE_ANIM",
          payload: {
            animationVal: false,
            newLocation: newLocation,
          },
        });
      }, [500]);
    }
  };

  return (
    <StyledNav theme={theme} className="navBar mobile-nav">
      <NavContainer
        theme={theme}
        className="navBar mobile-nav-container"
        animationState={animationState}
      >
        <motion.button
          onClick={burgerHandler}
          style={{
            width: "calc(100% - .8rem)",
          }}
        >
          <BurgerIcon theme={theme} className="burgerSvg" />
        </motion.button>

        <Link
          to="/home"
          className="homeNav"
          style={
            pathname.includes("home") || newLocationAnimState === "/home"
              ? activeStyle
              : inactiveStyle
          }
          onClick={(e) => delayAndGo(e, "/home")}
        >
          <HomeIcon
            pathname={pathname}
            theme={theme}
            newLocationAnimState={newLocationAnimState}
          />
        </Link>

        <Link
          to="/artists"
          className="artistNav"
          style={
            pathname.includes("artists") || newLocationAnimState === "/artists"
              ? activeStyle
              : inactiveStyle
          }
          onClick={(e) => delayAndGo(e, "/artists")}
        >
          <ArtistsIcon
            pathname={pathname}
            theme={theme}
            newLocationAnimState={newLocationAnimState}
          />
        </Link>

        <Link
          to="/albums"
          className="albumsNav"
          style={
            pathname.includes("albums") || newLocationAnimState === "/albums"
              ? activeStyle
              : inactiveStyle
          }
          onClick={(e) => delayAndGo(e, "/albums")}
        >
          <AlbumsIcon
            pathname={pathname}
            theme={theme}
            newLocationAnimState={newLocationAnimState}
          />
        </Link>

        <Link
          to="/playlists/late_night"
          className="lateNightNav"
          style={
            pathname.includes("late_night") ||
            newLocationAnimState === "/playlists/late_night"
              ? activeStyle
              : inactiveStyle
          }
          onClick={(e) => delayAndGo(e, "/playlists/late_night")}
        >
          <LateNightIcon
            pathname={pathname}
            theme={theme}
            newLocationAnimState={newLocationAnimState}
          />
        </Link>

        <Link
          to="/playlists/studying"
          className="studyingNav"
          style={
            pathname.includes("studying") ||
            newLocationAnimState === "/playlists/studying"
              ? activeStyle
              : inactiveStyle
          }
          onClick={(e) => delayAndGo(e, "/playlists/studying")}
        >
          <StudyingIcon
            pathname={pathname}
            theme={theme}
            newLocationAnimState={newLocationAnimState}
          />
        </Link>

        <Link
          to="/playlists/driving"
          className="carNav"
          style={
            pathname.includes("driving") ||
            newLocationAnimState === "/playlists/driving"
              ? activeStyle
              : inactiveStyle
          }
          onClick={(e) => delayAndGo(e, "/playlists/driving")}
        >
          <DrivingIcon
            pathname={pathname}
            theme={theme}
            newLocationAnimState={newLocationAnimState}
          />
        </Link>

        <Link
          to="/playlists/ambience"
          className="ambienceNav"
          style={
            pathname.includes("ambience") ||
            newLocationAnimState === "/playlists/ambience"
              ? activeStyle
              : inactiveStyle
          }
          onClick={(e) => delayAndGo(e, "/playlists/ambience")}
        >
          <AmbienceIcon
            pathname={pathname}
            theme={theme}
            newLocationAnimState={newLocationAnimState}
          />
        </Link>
      </NavContainer>
    </StyledNav>
  );
};

const StyledNav = styled(StyledBar)`
  width: calc(6.5rem - 3px);
  transform: translateY(-16px);
  z-index: 500;
  position: relative;
`;

const NavContainer = styled(StyledContainer)`
  margin: 5.1rem 0rem 0rem 0rem;

  a,
  button {
    width: 6.45rem;
    margin: 4rem 0rem;
    display: flex;
    align-items: center;
    transition: ${(props) => (props.animationState ? "all 0.5s ease" : "")};
    border-right: 3px solid rgba(0, 0, 0, 0);

    svg {
      transform: translate(calc(5rem / 3 - 1.5px), 0rem);
      width: calc(5rem / 3 - 1px);
      height: calc(5rem / 3);
    }

    &:hover {
      border-right: 3px solid #3ca8c9;
      path {
        fill: #3ca8c9;
      }
    }
  }

  button {
    transform: translateX(calc(0.75rem + 1px)) scale(1.1);
    width: calc(100% - 0.5rem);
  }

  // Making the icons the same size here, as they are on the desktopNav
  .homeNav {
    svg {
      transform: scale(1.15) translate(calc(5rem / 3 - 3px + 0.625rem), 0rem);
    }
  }

  .albumsNav {
    svg {
      transform: scale(1.075) translateX(calc(5rem / 3 + 0.4rem));
    }
  }

  .artistNav {
    svg {
      transform: scale(1.075) translateX(calc(5rem / 3 - 1.5px + 0.625rem));
    }
  }

  .studyingNav {
    svg {
      transform: scale(1.075) translateX(calc(5rem / 3 - 1.5px + 0.6rem));
    }
  }

  .lateNightNav {
    svg {
      transform: scale(1.125) translate(calc(5rem / 3 - 1.5px + 0.5rem), 0rem);
    }
  }

  .carNav,
  .ambienceNav {
    svg {
      transform: translate(calc(5rem / 3 + 0.625rem), 0rem) scale(1.075);
    }
  }
`;

export default MobileNav;

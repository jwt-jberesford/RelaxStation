// Libraries
import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import { motion } from "framer-motion";

// Components
import { StyledBar, StyledContainer, StyledTop } from "../Components/styles";
import useWindowSize from "./Logic";

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
} from "../Components/icons";

const DesktopNav = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const activeStyle = { color: "#3ca8c9", borderRight: "3px solid #3ca8c9" };
  const inactiveStyle = {
    color: `${theme === "light" ? "#898989" : "white"}`,
    borderRight: `3px solid ${
      theme === "light" ? "rgba(0, 0, 0, 0)" : "rgba(255, 255, 255, 0)"
    }`,
  };

  const { pathname } = useLocation();
  const navBurger = useSelector((state) => state.burger.navBurger);
  const animationState = useSelector((state) => state.animations);
  const appHeightState = useSelector((state) => state.appHeight.appHeight);
  const width = useWindowSize();
  const mobileStyles = {
    background: `${theme === "light" ? "white" : "#121212"}`,
    zIndex: 999,
    position: "absolute",
    top: "-5.1rem",
    left: "0",
    height: `calc(${appHeightState}px - 5rem)`,
    borderRight: `3px solid ${
      navBurger
        ? theme === "light"
          ? "rgba(0, 0, 0, 0.25)"
          : "rgba(255, 255, 255, 0.125)"
        : "rgba(255, 255, 255, 0)"
    }`,
  };

  const history = useHistory();
  const newLocationAnimState = useSelector(
    (state) => state.pageChangeAnim.newLocation
  );

  // Handers
  const burgerHandler = (e) => {
    if (width < 1300) {
      dispatch({
        type: "SET_NAV_BURGER",
        payload: !navBurger,
      });
    }
  };

  const LinkHandler = (e) => {
    if ((width < 1300) & !pathname.includes(e.target.innerText.toLowerCase())) {
      dispatch({
        type: "SET_NAV_BURGER",
        payload: !navBurger,
      });
    }
  };

  const delayAndGo = (e, path) => {
    if (animationState) {
      e.preventDefault(); // prevent link working how it normally would

      const newLocation = `/${
        e.target.innerText === "RelaxStation" ||
        e.target.innerText === "Station"
          ? "home"
          : e.target.innerText.toLowerCase()
      }`;

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
    <StyledNav
      theme={theme}
      width={width}
      navBurger={navBurger}
      style={width < 1299 ? mobileStyles : {}}
      className="navBar desktop-nav-container"
      animationState={animationState}
    >
      <StyledNavTop
        theme={theme}
        width={width}
        className="navBar nav-top"
        animationState={animationState}
      >
        {width < 1299 ? (
          <button
            onClick={burgerHandler}
            className="navBar nav-burger-button burger-icon"
          >
            <BurgerIcon theme={theme} className="navBar nav-burger-svg " />
          </button>
        ) : (
          ""
        )}
        <Link
          to="/home"
          className="navBar nav-logo"
          onClick={(LinkHandler, (e) => delayAndGo(e, "/home"))}
        >
          <h1 className="navBar h1-logo">
            Relax<span>Station</span>
          </h1>
        </Link>
      </StyledNavTop>

      <NavContainer
        theme={theme}
        width={width}
        animationState={animationState}
        className="navBar nav-container-1"
      >
        <motion.h4 className="navBar container1-title">MAIN</motion.h4>

        <Link
          to="/home"
          className="homeNav navBar"
          onClick={(LinkHandler, (e) => delayAndGo(e, "/home"))}
          style={
            pathname.includes("home") || newLocationAnimState === "/home"
              ? activeStyle
              : inactiveStyle
          }
        >
          <HomeIcon
            pathname={pathname}
            theme={theme}
            newLocationAnimState={newLocationAnimState}
          />
          <motion.a
            style={
              pathname.includes("home") || newLocationAnimState === "/home"
                ? { color: "#3ca8c9" }
                : {}
            }
          >
            Home
          </motion.a>
        </Link>

        <Link
          to="/artists"
          className="artistNav"
          onClick={(LinkHandler, (e) => delayAndGo(e, "/artists"))}
          style={
            pathname.includes("artists") || newLocationAnimState === "/artists"
              ? activeStyle
              : inactiveStyle
          }
        >
          <ArtistsIcon
            pathname={pathname}
            theme={theme}
            newLocationAnimState={newLocationAnimState}
          />
          <a
            style={
              pathname.includes("artists") ||
              newLocationAnimState === "/artists"
                ? { color: "#3ca8c9" }
                : {}
            }
          >
            Artists
          </a>
        </Link>

        <Link
          to="/albums"
          className="albumsNav"
          onClick={(LinkHandler, (e) => delayAndGo(e, "/albums"))}
          style={
            pathname.includes("albums") || newLocationAnimState === "/albums"
              ? activeStyle
              : inactiveStyle
          }
        >
          <AlbumsIcon
            pathname={pathname}
            theme={theme}
            newLocationAnimState={newLocationAnimState}
          />
          <a
            style={
              pathname.includes("albums") || newLocationAnimState === "/albums"
                ? { color: "#3ca8c9" }
                : {}
            }
          >
            Albums
          </a>
        </Link>
      </NavContainer>

      <NavContainer
        theme={theme}
        width={width}
        className="navBar container2"
        animationState={animationState}
      >
        <h4 className="navBar container2-title">PLAYLISTS</h4>

        <Link
          to="/playlists/late_night"
          className="lateNightNav"
          onClick={(LinkHandler, (e) => delayAndGo(e, "/playlists/late_night"))}
          style={
            pathname.includes("late_night") ||
            newLocationAnimState === "/late night"
              ? activeStyle
              : inactiveStyle
          }
        >
          <LateNightIcon
            pathname={pathname}
            theme={theme}
            newLocationAnimState={newLocationAnimState}
          />

          <a
            style={
              pathname.includes("late_night") ||
              newLocationAnimState === "/late night"
                ? { color: "#3ca8c9" }
                : {}
            }
          >
            Late night
          </a>
        </Link>

        <Link
          to="/playlists/studying"
          className="studyingNav"
          onClick={(LinkHandler, (e) => delayAndGo(e, "/playlists/studying"))}
          style={
            pathname.includes("studying") ||
            newLocationAnimState === "/studying"
              ? activeStyle
              : inactiveStyle
          }
        >
          <StudyingIcon
            pathname={pathname}
            theme={theme}
            newLocationAnimState={newLocationAnimState}
          />
          <a
            style={
              pathname.includes("studying") ||
              newLocationAnimState === "/studying"
                ? { color: "#3ca8c9" }
                : {}
            }
          >
            Studying
          </a>
        </Link>

        <Link
          to="/playlists/driving"
          className="carNav"
          onClick={(LinkHandler, (e) => delayAndGo(e, "/playlists/driving"))}
          style={
            pathname.includes("driving") || newLocationAnimState === "/driving"
              ? activeStyle
              : inactiveStyle
          }
        >
          <DrivingIcon
            pathname={pathname}
            theme={theme}
            newLocationAnimState={newLocationAnimState}
          />
          <a
            style={
              pathname.includes("driving") ||
              newLocationAnimState === "/driving"
                ? { color: "#3ca8c9" }
                : {}
            }
          >
            Driving
          </a>
        </Link>

        <Link
          to="/playlists/ambience"
          className="ambienceNav"
          onClick={(LinkHandler, (e) => delayAndGo(e, "/playlists/ambience"))}
          style={
            pathname.includes("ambience") ||
            newLocationAnimState === "/ambience"
              ? activeStyle
              : inactiveStyle
          }
        >
          <AmbienceIcon
            pathname={pathname}
            theme={theme}
            newLocationAnimState={newLocationAnimState}
          />
          <a
            style={
              pathname.includes("ambience") ||
              newLocationAnimState === "/ambience"
                ? { color: "#3ca8c9" }
                : {}
            }
          >
            Ambience
          </a>
        </Link>
      </NavContainer>
    </StyledNav>
  );
};

const StyledNav = styled(StyledBar)`
  width: 30rem;
  z-index: 999;
  position: relative;
  transition: ${(props) =>
    props.animationState & props.navBurger ? "all .5s ease" : ""};
`;

const StyledNavTop = styled(StyledTop)`
  display: flex;
  margin: 4rem 0 4rem ${(props) => (props.width > 1299 ? "3.4rem" : "2.4rem")};
  transition: ${(props) => (props.animationState ? "all 0.5s ease" : "")};
  transform: ${(props) => (props.width < 1299 ? "translateY(-16px)" : "")};
  h1 {
    transform: ${(props) =>
      props.width < 1299 ? "translateX(1px) translateY(.3rem)" : ""};
  }

  button {
    width: calc(5rem / 3 + 0.5rem - 1.5px);
    height: calc(5rem / 3 - 1.3px);
    transform: translate(6.5px, 4.5px);
    margin: 7px 2rem 0rem 0.5rem;

    svg {
      height: 100%;
      width: calc(5rem / 3 + 0.1rem);
    }
  }
`;

const NavContainer = styled(StyledContainer)`
  transition: ${(props) => (props.animationState ? "all 0.5s ease" : "")};
  margin: 8rem 0rem 8rem 3.6rem;
  transition: ${(props) => (props.animationState ? "all .5s ease" : "")};
  h4 {
    transform: translateX(-1px);
    transition: ${(props) => (props.animationState ? "all .5s ease" : "")};
  }

  a {
    border-right: 3px solid rgba(0, 0, 0, 0);
    margin-right: -0.3rem;
    height: 2rem;
    width: calc(100% - 1px);
    display: flex;
    align-items: center;
    transition: ${(props) => (props.animationState ? "all .5s ease" : "")};
    svg {
      width: 1.4rem;
      height: 1.4rem;
      transition: ${(props) => (props.animationState ? "all .5s ease" : "")};
    }

    a {
      transform: translateY(1rem);
    }

    &:hover {
      border-right: 3px solid #3ca8c9;

      a {
        color: #3ca8c9;
      }

      path {
        fill: #3ca8c9;
      }
    }
  }

  .homeNav {
    transform: translateX(3px);
    width: 100%;

    svg {
      transform: translateY(-1px) scale(1.3) translateX(-1px);
    }
  }

  .albumsNav {
    transform: translateX(4px);
    svg {
      transform: translateY(-1px) scale(1.2) translateX(-2px);
    }
  }

  .artistNav {
    transform: translateX(4px);
    width: calc(100% - 1px);

    svg {
      transform: scale(1.2) translateX(-2px);
    }
  }

  .studyingNav {
    transform: translateX(4px);
    svg {
      transform: scale(1.2) translateX(-2px);
    }
  }

  .lateNightNav {
    width: 100%;
    transform: translateX(3px);
    svg {
      transform: scale(1.2) translateX(-1.5px);
    }
  }

  .ambienceNav {
    svg {
      transform: translateX(1px);
    }
  }

  .carNav {
    transform: translateX(3px);
    width: calc(100%);
    svg {
      transform: scale(1.2) translateX(-1px);
    }
  }

  .ambienceNav {
    transform: translateX(4px);
    svg {
      transform: scale(1.2) translateX(-2px);
    }
  }
`;

export default DesktopNav;

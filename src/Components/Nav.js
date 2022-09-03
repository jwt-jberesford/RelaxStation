// Libraries
import { useRef, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { motion } from "framer-motion";

// Components & logic
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Nav = () => {
  const navBurger = useSelector((state) => state.burger.navBurger);
  const navRef = useRef(null);
  const theme = useSelector((state) => state.theme);
  const navWidthState = useSelector((state) => state.width.navWidth);
  const dispatch = useDispatch();
  const screenWidthState = useSelector((state) => state.width.screenWidth);
  const animationState = useSelector((state) => state.animations);
  const appHeightState = useSelector((state) => state.appHeight.appHeight);

  // All main resizing and nav resizing will be going through this func.
  // No need to repeat
  useLayoutEffect(() => {
    if (navWidthState !== navRef.current.offsetWidth) {
      dispatch({
        type: "SET_NAV_WIDTH",
        payload: {
          navWidth: navRef.current.offsetWidth,
        },
      });
    }
    const screenWidth = window.innerWidth;
    dispatch({
      type: "SET_SCREEN_WIDTH",
      payload: {
        screenWidth: screenWidth,
      },
    });
  });

  return (
    <StyledNav
      navBurger={navBurger}
      ref={navRef}
      theme={theme}
      className="navBar main-nav-component"
      appHeight={appHeightState}
      animationState={animationState}
    >
      <div className="navBar parent-div">
        {screenWidthState > 1299 ? (
          <DesktopNav className="navBar desktop-nav" />
        ) : (
          <div className="navBar active-desktop-nav-div">
            {navBurger ? (
              <div className="navBar active-desktop-nav-div-child">
                {/* This is so nothing else is moved when the bar comes out */}
                {/* animate this div */}

                <motion.div
                  style={{
                    position: "absolute",
                  }}
                  animate={
                    animationState
                      ? {
                          opacity: 1,
                          translateX: "0rem",
                          transition: { duration: 0.65, ease: "easeOut" },
                        }
                      : {
                          opacity: 1,
                          translateX: "0rem",
                          transition: { duration: 0, ease: "easeOut" },
                        }
                  }
                  initial={{
                    opacity: 0,
                    translateX: "-25rem",
                    transition: { duration: 0 },
                  }}
                  className="navBar active-desktop-nav-div-childs-child"
                >
                  <DesktopNav className="navBar active-desktop-nav-div-desktop-nav-component" />
                </motion.div>

                {/* rendering mobile nav still so the other items on the screen remain in the same position */}

                <div
                  className="navBar inactive-mobile-bar-hide"
                  style={{ opacity: 0 }}
                >
                  <MobileNav className="navBar active-desktop-nav-div-hidden-mobile-nav" />
                </div>
              </div>
            ) : (
              <div className="navBar mobile-nav-active-hide-desktop">
                <motion.div
                  style={{
                    position: "absolute",
                  }}
                  initial={
                    animationState
                      ? {
                          opacity: 1,
                          translateX: "0rem",
                        }
                      : {
                          opacity: 1,
                          translateX: "0rem",
                          transition: { duration: 0 },
                        }
                  }
                  animate={
                    animationState
                      ? {
                          opacity: 0,
                          translateX: "-30rem",
                          transition: { duration: 1.2, ease: "easeOut" },
                        }
                      : {
                          opacity: 0,
                          translateX: "-30rem",
                          transition: { duration: 0, ease: "easeOut" },
                        }
                  }
                  className="navBar active-desktop-nav-div-childs-child"
                >
                  <DesktopNav className="navBar active-desktop-nav-div-desktop-nav-component" />
                </motion.div>
                <motion.div
                  className="navBar mobile-nav-not-hidden-parent"
                  initial={
                    animationState
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          transition: { duration: 0, ease: "easeOut" },
                        }
                  }
                  animate={
                    animationState
                      ? {
                          opacity: 1,
                          transition: {
                            duration: 0.5,
                            delay: 0.25,
                            ease: "easeOut",
                          },
                        }
                      : {
                          opacity: 1,
                          transition: {
                            duration: 0,
                            ease: "easeOut",
                          },
                        }
                  }
                >
                  <MobileNav className="navBar mobile-nav-not-hidden" />
                </motion.div>
              </div>
            )}
          </div>
        )}
      </div>
    </StyledNav>
  );
};

const StyledNav = styled.div`
  display: flex;
  align-items: flex-start;
  border-right: 3px solid
    ${(props) =>
      props.theme === "light"
        ? " rgba(0, 0, 0, 0.05)"
        : "rgba(255, 255, 255, 0.125)"};
  position: relative;
  z-index: ${(props) => (props.navBurger ? "999" : "500")};
`;

export default Nav;

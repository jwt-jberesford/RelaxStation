// Libraries
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";

// Components
import DesktopRightBar from "./DesktopRightBar";
import MobileRightBar from "./MobileRightBar";

const RightBar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const settingsBurger = useSelector((state) => state.burger.settingsBurger);
  const recentlyPlayedBurger = useSelector(
    (state) => state.burger.recentlyPlayedBurger
  );
  const rightBarWidthState = useSelector((state) => state.width.rightBarWidth);
  const rightBarRef = useRef(null);
  const screenWidthState = useSelector((state) => state.width.screenWidth);
  const appHeight = useSelector((state) => state.appHeight.appHeight);
  const animationState = useSelector((state) => state.animations);

  // Update the rightBarWidth state on layout change
  useLayoutEffect(() => {
    if (rightBarWidthState !== rightBarRef.current.offsetWidth) {
      dispatch({
        type: "SET_RIGHT_BAR_WIDTH",
        payload: {
          rightBarWidth: rightBarRef.current.offsetWidth,
        },
      });
    }
  }, [screenWidthState, appHeight]);

  return (
    <StyledRightBar
      className="rightBar parent-component"
      theme={theme}
      ref={rightBarRef}
      settingsBurger={settingsBurger}
      recentlyPlayedBurger={recentlyPlayedBurger}
    >
      <motion.div className="rightBar child-main-container">
        {screenWidthState > 1299 ? (
          <DesktopRightBar className="rightBar desktop-component" />
        ) : (
          <motion.div className="rightBar mobile-parent-div-inactive-burgers">
            {/* desktop right bar div */}
            <motion.div
              className="rightBar desktop-component-parent-animation-div"
              animate={
                animationState
                  ? settingsBurger || recentlyPlayedBurger
                    ? {
                        opacity: 1,
                        translateX: "0rem",
                        transition: { duration: 0.65, ease: "easeOut" },
                      }
                    : {
                        opacity: 0,
                        translateX: "30rem",
                        transition: { duration: 0.8, ease: "easeOut" },
                      }
                  : settingsBurger || recentlyPlayedBurger
                  ? {
                      opacity: 1,
                      translateX: "0rem",
                      transition: { duration: 0, ease: "easeOut" },
                    }
                  : {
                      opacity: 0,
                      translateX: "30rem",
                      transition: { duration: 0, ease: "easeOut" },
                    }
              }
            >
              <DesktopRightBar />
            </motion.div>
            {/* mobile right bar div */}
            <motion.div
              className="rightBar mobile-component"
              initial={{ opacity: 1 }}
              animate={
                animationState
                  ? settingsBurger || recentlyPlayedBurger
                    ? { opacity: 0 }
                    : {
                        opacity: 1,
                        transition: {
                          duration: 0.5,
                          ease: "easeOut",
                        },
                      }
                  : settingsBurger || recentlyPlayedBurger
                  ? {
                      opacity: 0,
                      transition: {
                        duration: 0,
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
              <MobileRightBar />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </StyledRightBar>
  );
};

const StyledRightBar = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  transform: translateY(1px);
  border-left: 3px solid
    ${(props) =>
      props.theme === "light"
        ? "rgba(0, 0, 0, 0.05)"
        : "rgba(255, 255, 255, 0.125)"};
  position: relative;
  z-index: ${(props) =>
    props.recentlyPlayedBurger || props.settingsBurger ? "999" : "500"};

  .desktop-component-parent-animation-div {
    position: absolute;
  }
`;

export default RightBar;

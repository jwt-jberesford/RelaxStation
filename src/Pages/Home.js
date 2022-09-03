// Libraries
import styled from "styled-components";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

// Components, styles and icons
import { StyledRecordTop, StyledArrows } from "../Components/styles";
import useWindowSize from "../Components/Logic";
import { ArrowNextIcon, ArrowPrevIcon } from "../Components/icons";
import Albums from "./Albums";
import data from "../data/data";
import Artists from "./Artists";

const Home = () => {
  const theme = useSelector((state) => state.theme);
  const screenWidth = useWindowSize("width");
  const homePageValue = useSelector((state) => state.selection.homePageValue);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const animationState = useSelector((state) => state.animations);
  const appHeightState = useSelector((state) => state.appHeight.appHeight);

  // Handlers
  const arrowHandler = (arrowType) => {
    if (arrowType === "next") {
      if (homePageValue === 1) {
        dispatch({
          type: "UPDATE_HOME_PAGE_VALUE",
          payload: {
            homePageValue: 2,
          },
        });
      }
    } else {
      if (homePageValue === 2) {
        dispatch({
          type: "UPDATE_HOME_PAGE_VALUE",
          payload: {
            homePageValue: 1,
          },
        });
      }
    }
  };

  // On location change, dispatch the initial dataset of the banner
  useEffect(() => {
    if (pathname === "/home") {
      dispatch({
        type: "SET_SELECTION_HOME",
        payload: {
          song_lengths: data()[1].song_lengths,
          album_cover: data()[1].album_cover,
          album_name: data()[1].album_name,
          album_photo: data()[1].album_photo,
          artist_cover: data()[1].artist_cover,
          artist_name: data()[1].artist_name,
          artist_photo: data()[1].artist_photo,
          song_audio: data()[1].song_audio,
          song_names: data()[1].song_names,
          type: "album",
          album_shadow: data()[1].album_shadow,
          artist_shadow: data()[1].artist_shadow,
          selectedRecordHome: false,
          id: data()[1].id,
        },
      });
    }
  }, []);

  return (
    <StyledHome>
      <StyledRecordTop screenWidth={screenWidth} theme={theme}>
        <motion.h2>
          {homePageValue === 1 ? "New albums..." : "Explore these artists..."}
        </motion.h2>
        <StyledArrows animationState={animationState}>
          <motion.button
            className="prevButton"
            onClick={() => arrowHandler("prev")}
          >
            <ArrowPrevIcon theme={theme} currentPage={homePageValue} />
          </motion.button>
          <motion.button
            className="nextButton"
            onClick={() => arrowHandler("next")}
          >
            <ArrowNextIcon
              currentPage={homePageValue}
              theme={theme}
              pageCount={2}
            />
          </motion.button>
        </StyledArrows>
      </StyledRecordTop>

      {/* this will have same height as selection on albums / artists */}
      <motion.div>
        <StyledRecords>
          {homePageValue === 1 ? <Albums /> : <Artists />}
        </StyledRecords>
      </motion.div>
    </StyledHome>
  );
};

const StyledHome = styled(motion.div)`
  z-index: 95;
  position: relative;
`;
const StyledRecords = styled(motion.div)`
  z-index: 95;
  position: relative;
`;

export default Home;

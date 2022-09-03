// Libraries
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useRef, useLayoutEffect, useEffect, useState } from "react";
import useWindowSize from "./Logic";
import styled from "styled-components";

// Components and icons
import { ArrowPrevIcon, ArrowNextIcon } from "./icons";
import { StyledArrows, StyledRecordTop } from "./styles";

const RecordsTop = () => {
  const theme = useSelector((state) => state.theme);
  const { pathname } = useLocation();
  const currentPageUrl = pathname.split("/");
  const currentPageNum = useSelector((state) => state.grid.currentPage);
  const pageCount = useSelector((state) => state.grid.pageCount);
  const titleRef = useRef(null);
  const buttonsRef = useRef(null);
  const dispatch = useDispatch();
  const screenWidth = useWindowSize();
  const selectionActive = useSelector((state) => state.selection.active);
  let tempTitle;
  const [title, setTitle] = useState();
  const screenHeight = useSelector((state) => state.appHeight.appHeight);
  const animationState = useSelector((state) => state.animations);

  // Get screen title
  if (currentPageUrl.length === 3) {
    tempTitle = `${currentPageUrl[currentPageUrl.length - 1]} Playlist`;
    // For late night playlist, manually change "night" to "Night"
    if (tempTitle === "late_night Playlist") {
      tempTitle = "late_Night Playlist";
    }
  } else {
    tempTitle = currentPageUrl[currentPageUrl.length - 1];
  }

  // Change title relative to if selectionActive is true or not
  useEffect(() => {
    if (!selectionActive) {
      setTitle(
        tempTitle.charAt(0).toUpperCase() + tempTitle.slice(1).replace("_", " ")
      );
    } else {
      if (tempTitle === "artists" || tempTitle === "albums") {
        setTitle(`More ${tempTitle.replace("_", " ")}...`);
      } else {
        setTitle(`More of this playlist...`);
      }
    }
  }, [selectionActive, pathname, tempTitle]);

  // On change of size, set current page to the closest page that exists, this will either be same page or previous page (if increase in size)
  useEffect(() => {
    let value = 1;

    // If screen is increasing in size
    if (currentPageNum > pageCount) {
      value = pageCount;
    } else {
      value = currentPageNum;
    }

    dispatch({
      type: "SET_CURRENT_PAGE",
      payload: {
        currentPage: value,
      },
    });
  }, [dispatch, screenHeight, screenWidth, currentPageNum]);

  // On change of location set current page to 1
  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      payload: {
        currentPage: 1,
      },
    });
  }, [pathname, dispatch]);

  // If the text is two lines then make it go up by 100%
  useLayoutEffect(() => {
    // Two liners
    if ((titleRef.current.offsetHeight === 54) & (screenWidth < 649)) {
      titleRef.current.style.transform = "translateY(-23px)";
      buttonsRef.current.style.transform = "translateY(-26px)";
    } // Three liners
    else if ((titleRef.current.offsetHeight === 81) & (screenWidth < 649)) {
      titleRef.current.style.transform = "translateY(-50.5px)";
      buttonsRef.current.style.transform = "translateY(-53px)";
    }
    // Screen width of 650px and over - Only one liners at this width
    else if (screenWidth > 649) {
      titleRef.current.style.transform = "translateY(0px)";
      buttonsRef.current.style.transform = "translateY(-4px)";
    }
    // One liners
    else {
      titleRef.current.style.transform = "translateY(4px)";
      buttonsRef.current.style.transform = "translateY(1px)";
    }
  });

  // Buttons handlers
  const buttonHandler = (arg) => {
    let dispatchValue;
    let required = false;

    if ((arg === "prev") & (currentPageNum !== 1)) {
      dispatchValue = currentPageNum - 1;
      required = true;
    } else if ((arg === "next") & (currentPageNum < pageCount)) {
      dispatchValue = currentPageNum + 1;
      required = true;
    } else {
      required = false;
    }
    // Only dispath if needed
    if (required) {
      dispatch({
        type: "SET_CURRENT_PAGE",
        payload: {
          currentPage: dispatchValue,
        },
      });
    }
  };

  return (
    <StyledRecordTopComp
      screenWidth={screenWidth}
      theme={theme}
      animationState={animationState}
    >
      <h2 ref={titleRef}>{title}</h2>
      <StyledArrows ref={buttonsRef}>
        <button className="prevButton" onClick={() => buttonHandler("prev")}>
          <ArrowPrevIcon theme={theme} currentPage={currentPageNum} />
        </button>
        <button className="nextButton" onClick={() => buttonHandler("next")}>
          <ArrowNextIcon
            theme={theme}
            currentPage={currentPageNum}
            pageCount={pageCount}
          />
        </button>
      </StyledArrows>
    </StyledRecordTopComp>
  );
};

const StyledRecordTopComp = styled(StyledRecordTop)`
  z-index: 95;

  button {
    &:hover {
      transform: scale(1.25);
    }
  }
  svg,
  button {
    transition: ${(props) => (props.animationState ? "all .1s ease" : "none")};
  }
`;

export default RecordsTop;

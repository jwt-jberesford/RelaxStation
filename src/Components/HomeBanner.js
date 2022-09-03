// Libraries
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

// Components & icons  & data
import { StyledSelection, Thumbnail, SelectionArrows } from "./styles";
import data from "../data/data";
import { SelectionArrowPrevIcon, SelectionArrowNextIcon } from "./icons";
import HomeBannerComp from "./HomeBannerComp";

const HomeBanner = () => {
  // state and vars
  const displayData = data();
  const animDisplayData = [...displayData];
  const dispatch = useDispatch();
  const [increment, setIncrement] = useState(1);
  const [currentData, setCurrentData] = useState({});
  const {
    type,
    id,
    homePageValue,
    selectedRecordHome,
    album_name,
    artist_name,
  } = useSelector((state) => state.selection);
  const [loop, setLoop] = useState(true);
  const [dispatchType, setDispatchType] = useState("album");
  const animationState = useSelector((state) => state.animations);
  const history = useHistory();
  const csOverride = useSelector((state) => state.csOverride);
  const pathname = useLocation().pathname;

  useEffect(() => {
    // on re-location to homepage after selection from home page,
    // load up the same album
    if (csOverride) {
      if (type === "artist") {
        data().forEach((artist, x) => {
          if (artist.artist_name === artist_name) {
            setIncrement(x);

            setCurrentData({
              album_name: artist.album_name,
              artist_name: artist.artist_name,
              album_photo: artist.album_photo,
              artist_photo: artist.artist_photo,
              album_cover: artist.album_cover,
              artist_cover: artist.artist_cover,
              album_shadow: artist.album_shadow,
              artist_shadow: artist.artist_shadow,
              id: artist.id,
              song_lengths: artist.song_lengths,
            });
          }
        });
      } else {
        data().forEach((album, x) => {
          if (album.album_name === album_name) {
            setIncrement(x);

            setCurrentData({
              album_name: album.album_name,
              artist_name: album.artist_name,
              album_photo: album.album_photo,
              artist_photo: album.artist_photo,
              album_cover: album.album_cover,
              artist_cover: album.artist_cover,
              album_shadow: album.album_shadow,
              song_lengths: album.song_lengths,
              artist_shadow: album.artist_shadow,
              id: album.id,
            });
          }
        });
      }
    }
  }, [pathname, csOverride]);

  // Every x seconds update banner data if no other is selected
  useEffect(() => {
    // Set data type
    if (homePageValue === 1) {
      setDispatchType("album");
    } else {
      setDispatchType("artist");
    }

    if (!selectedRecordHome & loop) {
      const interval = setInterval(() => {
        if (increment === 27) {
          setIncrement(0);
        } else {
          setIncrement(increment + 1);
        }
      }, 6000);

      // Set needed data locally - in this file
      setCurrentData({
        album_name: displayData[increment].album_name,
        artist_name: displayData[increment].artist_name,
        album_photo: displayData[increment].album_photo,
        artist_photo: displayData[increment].artist_photo,
        album_cover: displayData[increment].album_cover,
        artist_cover: displayData[increment].artist_cover,
        album_shadow: displayData[increment].album_shadow,
        artist_shadow: displayData[increment].artist_shadow,
        id: displayData[increment].id,
        song_lengths: displayData[increment].song_lengths,
      });

      // Set needed data globally - redux
      dispatch({
        type: "SET_SELECTION_HOME",
        payload: {
          album_cover: displayData[increment].album_cover,
          album_name: displayData[increment].album_name,
          album_photo: displayData[increment].album_photo,
          artist_cover: displayData[increment].artist_cover,
          artist_name: displayData[increment].artist_name,
          artist_photo: displayData[increment].artist_photo,
          song_audio: displayData[increment].song_audio,
          song_names: displayData[increment].song_names,
          type: dispatchType,
          album_shadow: displayData[increment].album_shadow,
          artist_shadow: displayData[increment].artist_shadow,
          selectedRecordHome: false,
          id: displayData[increment].id,
        },
      });

      return () => clearInterval(interval);
    }

    // If user selects an album then set that as home banner
    if (selectedRecordHome) {
      displayData.forEach((album, index) => {
        if (album.id === id) {
          // Update increment
          setIncrement(index);

          // Set selection locally
          setCurrentData({
            album_name: album.album_name,
            artist_name: album.artist_name,
            album_photo: album.album_photo,
            artist_photo: album.artist_photo,
            album_shadow: album.album_shadow,
            artist_shadow: album.artist_shadow,
            album_cover: album.album_cover,
            artist_cover: album.artist_cover,
            id: album.id,
            song_lengths: album.song_lengths,
          });

          // This will stop the loop
          setLoop(false);

          // Set selection globally - redux
          dispatch({
            type: "SET_SELECTION_HOME",
            payload: {
              album_cover: album.album_cover,
              album_name: album.album_name,
              album_photo: album.album_photo,
              artist_cover: album.artist_cover,
              artist_name: album.artist_name,
              artist_photo: album.artist_photo,
              song_audio: album.song_audio,
              song_names: album.song_names,
              type: dispatchType,
              album_shadow: album.album_shadow,
              artist_shadow: album.artist_shadow,
              selectedRecordHome: true,
              id: album.id,
              song_lengths: album.song_lengths,
            },
          });
        }
      });
    }
  }, [increment, selectedRecordHome, id]);

  const hoverHandler = (val) => {
    dispatch({
      type: "SET_CLEAR_SELECTION",
      payload: { clearSelection: !val },
    });
  };

  // handler - when clicked on, this will resume loop and display next incremental album
  const arrowHandler = (arrowType) => {
    // If an album is selected get the index of it and resume the loop
    if (selectedRecordHome) {
      setLoop(true);
      dispatch({
        type: "RESUME_LOOP",
      });
    }

    if (arrowType === "next") {
      if (increment === 27) {
        setIncrement(0);
      } else {
        setIncrement(increment + 1);
      }
    } else {
      if (increment === 0) {
        setIncrement(27);
      } else {
        setIncrement(increment - 1);
      }
    }
  };

  const delayAndGo = (e, path) => {
    if (animationState) {
      e.preventDefault(); // prevent link working how it normally would
      const newLocation = `/${type}s`; // format new location string correctly

      // override clear selection
      dispatch({
        type: "SET_CS_OVERRIDE",
        payload: true,
      });

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
    <StyledBanner
      onMouseEnter={() => hoverHandler(true)}
      onMouseLeave={() => hoverHandler(false)}
    >
      {animationState ? (
        animDisplayData.map((album, x) => (
          <HiddenLink
            to={type === "artist" ? "/artists" : "/albums"}
            key={(album, x)}
            onClick={(e) => delayAndGo(e, `/${type}s`)}
          >
            <HomeBannerComp
              type={type}
              data={album}
              bannerNum={x}
              pageNum={increment}
            />
          </HiddenLink>
        ))
      ) : (
        <StyledLink to={type === "artist" ? "/artists" : "/albums"}>
          <HomeThumbnail
            className="thumbnail"
            shadow={
              type === "album"
                ? currentData.album_shadow
                : currentData.artist_shadow
            }
          >
            <img
              src={
                type === "album"
                  ? currentData.album_photo
                  : currentData.artist_photo
              }
              alt="record thumbnail"
            />
          </HomeThumbnail>

          <StyledRight>
            <StyledTitles>
              <h2>
                {type === "album"
                  ? currentData.album_name
                  : currentData.artist_name}
              </h2>
              <h3>{type === "album" ? currentData.artist_name : ""}</h3>
            </StyledTitles>

            <img
              className="background-img"
              src={
                type === "album"
                  ? currentData.album_cover
                  : currentData.artist_cover
              }
              alt={"album background"}
            />
          </StyledRight>
        </StyledLink>
      )}

      <BannerArrows style={{ zIndex: 1000 }} animationState={animationState}>
        <button className="prevButton" onClick={() => arrowHandler("prev")}>
          <SelectionArrowPrevIcon theme="dark" currentPage={increment} />
        </button>
        <button className="nextButton" onClick={() => arrowHandler("next")}>
          <SelectionArrowNextIcon
            theme="dark"
            currentPage={increment}
            pageCount={0} // random number as can go back and forth as user likes.
          />
        </button>
      </BannerArrows>
    </StyledBanner>
  );
};

const HiddenLink = styled(Link)`
  height: 100%;
  width: 100%;
  position: absolute;
`;

const BannerArrows = styled(SelectionArrows)`
  position: absolute;
  right: 1.4rem;
  top: 6rem;

  svg {
    transition: ${(props) => (props.animationState ? "all .1s ease" : "none")};
  }

  button {
    &:hover {
      svg {
        transform: scale(1.25);
      }
    }
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
`;

const StyledBanner = styled(StyledSelection)`
  justify-content: flex-start;
  cursor: pointer;
  position: relative;
  z-index: 95;

  .background-img {
    transform: translateX(16rem);
    height: 20rem;
    width: 100%;
  }
`;

const HomeThumbnail = styled(Thumbnail)`
  aspect-ratio: 1/1;
`;

const StyledRight = styled.div`
  height: 20rem;
  width: calc(100%);
  position: relative;
  display: flex;
  justify-content: center;
  transform: translateX(-1rem);

  .background-img {
    position: absolute;
    width: calc(100% + 4rem);
    transform: translateX(0rem);
    height: 100%;
    object-fit: cover;
  }
`;

const StyledTitles = styled.div`
  pointer-events: none;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100% - 12.8rem);
  transform: translateX(-4.4rem);
  margin-left: 4rem;
  z-index: 1;

  h2 {
    font-size: 2.6rem;
    font-weight: 600;
    margin-bottom: 1rem;
    letter-spacing: 0.2px;

    @media (max-width: 967px) {
      font-size: 2.2rem;
    }
  }
  h3 {
    font-size: 1.8rem;
    font-weight: 500;
  }
`;

export default HomeBanner;

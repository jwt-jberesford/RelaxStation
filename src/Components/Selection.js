// Libraries
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import { useLocation, useHistory } from "react-router-dom";
import { motion } from "framer-motion";

// Components and icons and styles
import { ArrowNextIcon, ArrowPrevIcon } from "./icons";
import useWindowSize from "./Logic";
import {
  StyledSelection,
  SongsContainer,
  SelectionArrows,
  Thumbnail,
} from "./styles";
import RecordHover from "./RecordHover";
import { PointerArrowReturnHome } from "./icons";
import data from "../data/data";
import artistDataFunc from "../Components/artistDataFunc";

const Selection = () => {
  // Grab needed state and set needed vars
  const {
    album_cover,
    album_photo,
    album_shadow,
    artist_name,
    album_name,
    artist_cover,
    artist_photo,
    artist_shadow,
    song_names,
    song_audio,
    type,
    current_page,
    song_lengths,
    id,
    active,
    num_of_pages,
  } = useSelector((state) => state.selection);
  const currentSongSrc = useSelector(
    (state) => state.song.currentSong.audioSrc
  );
  const searched_song_name = useSelector((state) => state.selection.song_name);
  const currentSongName = useSelector(
    (state) => state.song.currentSong.songName
  );
  const current_album_type = useSelector((state) => state.currentAlbum.type);
  const current_album_id = useSelector((state) => state.currentAlbum.id);
  const currentSongLengths = useSelector(
    (state) => state.currentAlbum.song_lengths
  );
  const albumStateSongNames = useSelector(
    (state) => state.currentAlbum.song_names
  );
  const albumStateIndex = useSelector(
    (state) => state.currentAlbum.current_index
  );
  const screenWidthState = useSelector((state) => state.width.screenWidth);
  const { pathname } = useLocation();
  const current_type = useSelector((state) => state.currentAlbum.type);
  const [hover, setHover] = useState(false);
  const csOverride = useSelector((state) => state.csOverride);
  const dispatch = useDispatch();
  const displaySongNames = [...song_names];
  const screenWidth = useWindowSize("width");
  const songsContainerRef = useRef(null);
  const [selectionCols, setSelectionCols] = useState(1);
  const { playNextSong, playPrevSong, isPlaying } = useSelector(
    (state) => state.song
  );
  const albumData = data();
  const [currentAudioIndexes, setCurrentAudioIndexes] = useState([]);
  const audioContainerRef = useRef(null);
  const [childrenDuration, setChildrenDuration] = useState([]);
  const [justifyFlexStart, setJustifyFlexStart] = useState(false);
  const animationState = useSelector((state) => state.animations);
  const artistData = artistDataFunc(data);
  const [animTimeData, setAnimTimeData] = useState([]);

  // needed data for anim version
  const animData = [...song_names];
  const [animDisplayData, setAnimDisplayData] = useState([]);
  const navWidth = useSelector((state) => state.width.navWidth);
  const rightBarWidth = useSelector((state) => state.width.rightBarWidth);
  const history = useHistory();
  const [album, setAlbum] = useState(false);

  // Arrow handler
  const arrowHandler = (arrowType) => {
    if ((arrowType === "next") & (current_page < num_of_pages)) {
      dispatch({
        type: "SET_SELECTION_PAGE",
        payload: {
          current_page: current_page + 1,
        },
      });
    } else if ((arrowType === "prev") & (current_page !== 1)) {
      dispatch({
        type: "SET_SELECTION_PAGE",
        payload: {
          current_page: current_page - 1,
        },
      });
    }
  };

  // Set current song  handler
  const selectSongHandler = (song) => {
    const index = song_names.indexOf(song);
    const audioSrc = song_audio[song_names.indexOf(song)];
    let thumbnailPic;

    if (type === "artist") {
      thumbnailPic = artist_photo;
    } else {
      thumbnailPic = album_photo;
    }

    // If the user is selecting the same song from a different location
    // send a dispatch saying to reset time
    if (type !== current_album_type) {
      dispatch({
        type: "SET_RESET_TIME",
        payload: {
          resetTime: true,
        },
      });
    }

    if (audioSrc !== currentSongSrc || type !== current_album_type) {
      dispatch({
        type: "SET_CURRENT_SONG",
        payload: {
          audioSrc: audioSrc,
          songName: song,
          artistName: artist_name,
          thumbnailPic: thumbnailPic,
        },
      });
      dispatch({ type: "SET_INDEX", payload: { current_index: index } });
      dispatch({
        type: "SET_CURRENT_ALBUM",
        payload: {
          id: id,
          album_name: album_name,
          album_photo: album_photo,
          artist_name: artist_name,
          artist_photo: artist_photo,
          song_audio: song_audio,
          song_names: song_names,
          current_index: index,
          type: type,
          song_lengths: song_lengths,
        },
      });
    }
  };

  // Num of pages logic
  useEffect(() => {
    let newPageCount;
    // If only one page is needed
    if (
      (song_names.length <= 3) & (selectionCols === 1) ||
      (song_names.length <= 6) & (selectionCols === 2)
    ) {
      newPageCount = 1;
    } else {
      if (selectionCols === 1) {
        newPageCount = Math.ceil(song_names.length / 3);
      } else {
        newPageCount = Math.ceil(song_names.length / 6);
      }
    }
    dispatch({
      type: "UPDATE_SELECTION_PAGE_INFO",
      payload: {
        num_of_pages: newPageCount,
      },
    });
  }, [dispatch, song_names, selectionCols]);

  // Number of columns on selection logic
  useEffect(() => {
    // Set number of cols, and splice vars
    if (screenWidth - 1000 >= 800) {
      setSelectionCols(2);
    } else {
      setSelectionCols(1);
    }
  }, [screenWidth, song_names, current_page, id, current_page]);

  // Change style of selected song with background
  useEffect(() => {
    if (songsContainerRef.current) {
      const children = songsContainerRef.current.children;

      for (let i = 0; i < children.length; i++) {
        const songName = children[i].children[1].innerText;

        if (
          (songName === albumStateSongNames[albumStateIndex]) &
          pathname.includes(current_type)
        ) {
          children[i].style.background = "#bababa73";
        } else {
          children[i].style.background = "";
        }
      }
    }
  }, [
    isPlaying,
    song_names,
    currentSongName,
    currentSongSrc,
    current_page,
    displaySongNames,
  ]);

  // Play next song / previous songs when needed
  useEffect(() => {
    const currentSongIndex = song_names.indexOf(currentSongName);
    let thumbnailPic;
    if (type === "albums") {
      thumbnailPic = album_photo;
    } else {
      thumbnailPic = artist_photo;
    }

    if (playNextSong) {
      // if the next song exists
      if (currentSongIndex !== song_names.length - 1) {
        dispatch({
          type: "SET_CURRENT_SONG",
          payload: {
            audioSrc: song_audio[currentSongIndex + 1],
            songName: song_names[currentSongIndex + 1],
            artistName: artist_name,
            thumbnailPic: thumbnailPic,
          },
        });

        dispatch({
          type: "SET_INDEX",
          payload: {
            current_index: currentSongIndex + 1,
          },
        });

        // Go to next page if needed
        const newIndex = currentSongIndex + 1;
        let newPageNum = 1;

        if (selectionCols === 1) {
          newPageNum = Math.ceil(newIndex / 3 + 0.333333);
        } else {
          newPageNum = Math.ceil(newIndex / 6 + 0.165165165165);
        }
        dispatch({
          type: "SET_SELECTION_PAGE",
          payload: { current_page: newPageNum },
        });
      } else {
        if (active) {
          dispatch({
            type: "SET_CURRENT_SONG_STOP",
            payload: {
              audioSrc: song_audio[0],
              songName: song_names[0],
              artistName: artist_name,
              thumbnailPic: thumbnailPic,
            },
          });

          dispatch({
            type: "SET_SELECTION_PAGE",
            payload: {
              current_page: 1,
            },
          });
        }
      }
    }

    if (playPrevSong) {
      if ((currentSongIndex !== 0) & (song_names.length > 1)) {
        dispatch({
          type: "SET_CURRENT_SONG",
          payload: {
            audioSrc: song_audio[currentSongIndex - 1],
            songName: song_names[currentSongIndex - 1],
            artistName: artist_name,
            thumbnailPic: thumbnailPic,
          },
        });

        dispatch({
          type: "SET_INDEX",
          payload: {
            current_index: currentSongIndex - 1,
          },
        });

        // Go to prev page if needed
        const newIndex = currentSongIndex - 1;
        let newPageNum = 1;

        if (selectionCols === 1) {
          newPageNum = Math.ceil(newIndex / 3 + 0.333333);
        } else {
          newPageNum = Math.ceil(newIndex / 6 + 0.165165165165);
        }
        dispatch({
          type: "SET_SELECTION_PAGE",
          payload: { current_page: newPageNum },
        });
      }
    }
  }, [
    playNextSong,
    playPrevSong,
    album_photo,
    artist_name,
    artist_photo,
    currentSongName,
    dispatch,
    song_audio,
    song_names,
    type,
    id,
  ]);

  // If the user has search for a song, then set the page number
  // to the page that song belongs too
  useEffect(() => {
    if (searched_song_name.length > 0) {
      const current_index = song_names.indexOf(searched_song_name);
      let newPageNum = 1;

      if (selectionCols === 1) {
        newPageNum = Math.ceil(current_index / 3 + 0.333333);
      } else {
        newPageNum = Math.ceil(current_index / 6 + 0.165165165165);
      }
      dispatch({
        type: "SET_SELECTION_PAGE",
        payload: { current_page: newPageNum },
      });
    }
  }, [searched_song_name, id, type]);

  // On new search, set the page to the right osng
  useEffect(() => {
    // Only run if active and active on the same album / artist
    if (active & (type === current_album_type) & (current_album_id === id)) {
      // Calc needed page num
      let newPageNum = 1;
      if (selectionCols === 1) {
        newPageNum = Math.ceil(albumStateIndex / 3 + 0.333333);
      } else {
        newPageNum = Math.ceil(albumStateIndex / 6 + 0.165165165165);
      }

      // Had to set timeout as selection declaration was overlapping and setting
      // current page to 1.
      setTimeout(() => {
        dispatch({
          type: "SET_SELECTION_PAGE",
          payload: { current_page: newPageNum },
        });
      }, [25]);
    }
  }, [type, selectionCols]);

  // If the length of the songs is less than 3 on either column, then set
  // justify content to flex-start
  useEffect(() => {
    if (songsContainerRef.current) {
      const song_count = songsContainerRef.current.children;

      if (
        (selectionCols === 1) & (song_count !== 3) ||
        (selectionCols === 2) & (song_count !== 6)
      ) {
        setJustifyFlexStart(true);
      } else {
        setJustifyFlexStart(false);
      }
    }
  }, [
    selectionCols,
    song_names,
    currentAudioIndexes,
    type,
    current_page,
    id,
    active,
  ]);

  // Anim display data
  useEffect(() => {
    if (album) {
      const newData = [];
      const newTimeData = [];
      const songLengthData = album.song_lengths;

      console.log(selectionCols);

      if (selectionCols === 1) {
        for (let i = 0; i < animData.length; i += 3) {
          // page data
          const newPageData = [
            animData[i],
            animData[i + 1] ? animData[i + 1] : "deleteMe",
            animData[i + 2] ? animData[i + 2] : "deleteMe",
          ];

          const newLengthData = [
            songLengthData[i],
            songLengthData[i + 1] ? songLengthData[i + 1] : "deleteMe",
            songLengthData[i + 2] ? songLengthData[i + 2] : "deleteMe",
          ];

          // Remove all the deleteMe items from the array
          while (newPageData.includes("deleteMe")) {
            newPageData.splice(newPageData.length - 1);
          }

          while (newLengthData.includes("deleteMe")) {
            newLengthData.splice(newLengthData.length - 1);
          }

          newData.push(newPageData); // set data to temp var
          newTimeData.push(newLengthData);
        }
      } else {
        for (let i = 0; i < animData.length; i += 6) {
          // page data
          const newPageData = [
            animData[i],
            animData[i + 1] ? animData[i + 1] : "deleteMe",
            animData[i + 2] ? animData[i + 2] : "deleteMe",
            animData[i + 3] ? animData[i + 3] : "deleteMe",
            animData[i + 4] ? animData[i + 4] : "deleteMe",
            animData[i + 5] ? animData[i + 5] : "deleteMe",
          ];

          // Remove all the deleteMe items from the array
          while (newPageData.includes("deleteMe")) {
            newPageData.splice(newPageData.length - 1);
          }

          newData.push(newPageData); // set data to temp var
        }
      }

      // set new state
      setAnimDisplayData(newData);
      setAnimTimeData(newTimeData);
    }
  }, [
    album_cover,
    album_photo,
    album_shadow,
    artist_name,
    album_name,
    artist_cover,
    artist_photo,
    artist_shadow,
    song_names,
    song_audio,
    type,
    current_page,
    id,
    active,
    num_of_pages,
    animationState,
    selectionCols,
    screenWidth,
    screenWidthState,
  ]);

  const returnHomeHandler = () => {
    // anim logic here

    dispatch({
      type: "SET_CS_OVERRIDE",
      payload: true,
    });

    dispatch({
      type: "SET_PAGE_CHANGE_ANIM",
      payload: {
        animationVal: true,
        newLocation: "/home",
      },
    });

    // timeout for link func
    setTimeout(() => {
      history.push("/home"); // change location
      dispatch({
        type: "SET_PAGE_CHANGE_ANIM",
        payload: {
          animationVal: false,
          newLocation: "/home",
        },
      });

      setTimeout(() => {
        dispatch({
          type: "SET_CS_OVERRIDE",
          payload: false,
        });
      }, [1000]);
    }, [500]);
  };

  // delete me if needed
  useEffect(() => {
    let myAlbum = false;
    if (pathname === "/albums") {
      albumData.map((album) => {
        if (album.id === id) {
          myAlbum = album;
        }
      });
    } else if (pathname === "/artists") {
      artistData.map((artist) => {
        if (artist.id === id) {
          myAlbum = artist;
        }
      });
    }

    setAlbum(myAlbum);
  }, [id, pathname]);
  // delete me if needed

  return (
    <>
      {active ? (
        <StyledSelectionEdited>
          <Thumbnail
            shadow={type === "artist" ? artist_shadow : album_shadow}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <ThumbnailContainer
              animate={
                isMobile || hover
                  ? {
                      opacity: 1,
                      transition: animationState
                        ? { duration: 0.5 }
                        : { duration: 0 },
                    }
                  : {
                      opacity: 0,
                      transition: animationState
                        ? { duration: 0.5 }
                        : { duration: 0 },
                    }
              }
            >
              <RecordHover
                textNeeded={true}
                song_audio={song_audio}
                song_names={song_names}
                artist_photo={artist_photo}
                album_photo={album_photo}
                artist_name={artist_name}
                type={current_album_type}
                id={current_album_id}
              />
            </ThumbnailContainer>

            <motion.img
              src={
                type === "artist" || type === "artists"
                  ? artist_photo
                  : album_photo
              }
              alt={`${type === "artist" ? "artist" : "album"} thumbnail`}
            />
          </Thumbnail>

          {pathname.includes("playlist") ? (
            <SongsContainerStyled
              ref={songsContainerRef}
              columns={selectionCols}
              justifyFlexStart={justifyFlexStart}
              animate={{ translateX: "18rem" }}
            >
              {song_names.map((song, indexB) => (
                <StyledSong
                  key={song}
                  columns={selectionCols}
                  onClick={() => selectSongHandler(song)}
                >
                  <motion.h4>{song_names.indexOf(song) + 1}.</motion.h4>
                  <motion.h3>{song}</motion.h3>
                  <motion.h4 className="time">
                    {song_lengths[song_names.indexOf(song)]}
                  </motion.h4>
                </StyledSong>
              ))}
            </SongsContainerStyled>
          ) : (
            animDisplayData.map((page, i) => (
              <SongsContainerStyled
                ref={songsContainerRef}
                columns={selectionCols}
                justifyFlexStart={justifyFlexStart}
                animate={{
                  translateX: `${
                    (i + 1 - current_page) * 250 +
                    (selectionCols === 1 ? 18 : 21)
                  }rem`,
                  transition: animationState
                    ? { duration: 0.5 }
                    : { duration: 0 },
                }}
                key={(page, i)}
              >
                {animDisplayData[i].map((song, indexB) => (
                  <StyledSong
                    key={song}
                    columns={selectionCols}
                    onClick={() => selectSongHandler(song)}
                  >
                    <motion.h4>{song_names.indexOf(song) + 1}.</motion.h4>
                    <motion.h3>{song}</motion.h3>
                    <motion.h4 className="time">
                      {song_lengths[song_names.indexOf(song)]}
                    </motion.h4>
                  </StyledSong>
                ))}
              </SongsContainerStyled>
            ))
          )}

          <AudioContainer ref={audioContainerRef}>
            {currentAudioIndexes.map((value) => (
              <audio src={song_audio[value]} key={value} />
            ))}
          </AudioContainer>

          <SelectionArrowsEdited animationState={animationState}>
            <motion.div className="arrows">
              <motion.button
                className="prevButton"
                onClick={() => arrowHandler("prev")}
              >
                <ArrowPrevIcon theme="dark" currentPage={current_page} />
              </motion.button>
              <motion.button
                className="nextButton"
                onClick={() => arrowHandler("next")}
              >
                <ArrowNextIcon
                  theme="dark"
                  currentPage={current_page}
                  pageCount={num_of_pages}
                />
              </motion.button>
            </motion.div>
            <motion.button
              className="pointerArrowHome"
              onClick={returnHomeHandler}
              animate={csOverride ? { opacity: 1 } : { opacity: 0 }}
            >
              <PointerArrowReturnHome required={true} />
            </motion.button>
          </SelectionArrowsEdited>

          <motion.img
            className="background-img"
            style={{
              width: `calc(100vw - ${navWidth + rightBarWidth}px - 10rem)`,
            }}
            src={
              type === "artist" || type === "artists"
                ? artist_cover
                : album_cover
            }
            alt={`${
              type === "artist" || type === "artists" ? "artist" : "album"
            } background`}
          />
        </StyledSelectionEdited>
      ) : (
        ""
      )}
    </>
  );
};

const StyledSong = styled(motion.div)`
  color: white;
  width: ${(props) =>
    props.columns === 1 ? "calc(100% - 2rem)" : "calc(45% - 2rem)"};
  transform: translateX(-1rem)
    ${(props) =>
      props.columns === 1
        ? "translateY(calc(1rem + 0.5px))"
        : "translateY(1.75rem)"};
  margin-right: ${(props) => (props.columns === 1 ? "" : "8rem")};
  margin-bottom: ${(props) => (props.columns === 1 ? "2rem" : "2rem")};
  border-radius: 1rem;
  z-index: -1;
  padding: 0rem 1rem;
  display: flex;
  :hover {
    background: #9c9c9c4c;
  }

  h3 {
    margin: ${(props) => (props.columns === 1 ? " 0rem 2rem" : "0rem 4rem")};
    font-size: 2rem;
    font-weight: 500;
    cursor: pointer;
    pointer-events: none;
    width: ${(props) => (props.columns === 1 ? "100%" : "70%")};
  }

  h4 {
    font-size: 1.6rem;
    width: ${(props) => (props.columns === 1 ? "4%" : "")};
    pointer-events: none;
    cursor: pointer;
    transform: translateY(4px);
  }

  h3,
  h4 {
    padding: 0.5rem;
  }

  .time {
    width: 20%;
  }

  @media (max-width: 1400px) and (min-width: 1300px) {
    transform: translatey(1.3rem);

    h3 {
      font-size: 1.75rem;
    }

    h4 {
      font-size: 1.4rem;
      transform: translatey(3px);
    }
  }

  @media (max-width: 1300px) {
    transform: translatey(1.1rem);

    h4 {
      transform: translatey(4px);
    }
  }

  @media (max-width: 900px) {
    transform: translatey(1.5rem);

    h3 {
      font-size: 1.55rem;
    }

    h4 {
      font-size: 1.2rem;
      transform: translatey(3px);
    }
  }
  @media (max-width: 780px) {
    h3 {
      font-size: 1.4rem;
    }

    h4 {
      font-size: 1.05rem;
    }
  }
`;

const AudioContainer = styled(motion.div)`
  opacity: 0;
  position: absolute;
`;

const SongsContainerStyled = styled(SongsContainer)`
  position: absolute;
`;

const StyledSelectionEdited = styled(StyledSelection)`
  justify-content: space-between;
  z-index: 1;
`;

const SelectionArrowsEdited = styled(SelectionArrows)`
  margin-right: 1rem;
  margin-left: 0;
  height: 100%;
  transform: translateY(-3rem);
  flex-direction: column;

  button {
    &:hover {
      transform: scale(1.25);
    }
  }
  svg,
  button {
    transition: ${(props) => (props.animationState ? "all .1s ease" : "none")};
  }

  .arrows {
    display: flex;
    transform: translateY(9rem);
  }

  .pointerArrowHome {
    transform: translateY(11.4rem);
    height: 4rem;

    &:hover {
      transform: translateY(11.4rem) scale(1.15);
    }
  }
`;

const ThumbnailContainer = styled(motion.div)`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  z-index: 99999;
  display: flex;
`;

export default Selection;

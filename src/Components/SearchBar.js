// Libraries
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import data from "../data/data";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Components and icons
import { MagnifyingGlassIcon } from "./icons";

const SearchBar = () => {
  const theme = useSelector((state) => state.theme);
  const mainWidth = useSelector((state) => state.width.mainWidth);
  const barRef = useRef(null);
  const [barWidth, setBarWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [searchData, setSearchData] = useState([]);
  const [type, setType] = useState("album");
  const searchBarActive = useSelector((state) => state.searchBar);
  const animationState = useSelector((state) => state.animations);
  const dispatch = useDispatch();

  // On input, search all data song names, ablums and artist names for a result
  const inputHandler = (e) => {
    const inputText = e.target.value.toLowerCase();
    // Clear the array so only the relevant searches are present
    setSearchData([]);

    // Only run if their is a search
    if (inputText.length > 0) {
      // Check each song name first
      data().forEach((album, index) => {
        album.song_names.forEach((song) => {
          // Remove searches where the song name is same as the album name
          if (song.toLowerCase() === album.album_name.toLowerCase()) {
            return;
          } else if (song.toLowerCase().startsWith(inputText)) {
            setSearchData((searchData) => [
              {
                display: song,
                type: "album",
                ...album,
              },
              ...searchData,
            ]);
            setType("song");
          }
        });

        // Check albums
        if (album.album_name.toLowerCase().startsWith(inputText)) {
          setSearchData((searchData) => [
            {
              type: "album",
              display: album.album_name,
              ...album,
            },
            ...searchData,
          ]);
          setType("album");
        }

        // Check artists
        if (album.artist_name.toLowerCase().startsWith(inputText)) {
          // Check for duplicates in search data, and remove them
          if (data().length - 1 > index) {
            if (data()[index + 1].artist_name === album.artist_name) {
              return;
            } else {
              setSearchData((searchData) => [
                {
                  type: "artist",
                  display: album.artist_name,
                  ...album,
                },
                ...searchData,
              ]);
              setType("artist");
            }
          }
        }
      });
    }
  };

  // Calc needed height of item container
  useEffect(() => {
    const itemHeight = 120; // 12 rem, 120px
    let neededAddition = 13; // 1.3rem, 13px

    // Needed addition is different for each length
    if (searchData.length === 1) {
      neededAddition = 13;
    } else if (searchData.length === 2) {
      neededAddition = -7;
    } else if (searchData.length === 3) {
      neededAddition = -27;
    } else if (searchData.length === 4) {
      neededAddition = -47;
    } else if (searchData.length >= 5) {
      neededAddition = -67;
    }

    if (searchData.length > 5) {
      setContainerHeight(5 * itemHeight + neededAddition);
    } else {
      setContainerHeight(searchData.length * itemHeight + neededAddition);
    }
  }, [searchData, searchBarActive]);

  const barHandler = () => {
    dispatch({
      type: "SET_SEARCH_BAR",
      payload: true,
    });
  };

  // Get width of the search bar
  useLayoutEffect(() => {
    if (barRef.current) {
      setBarWidth(barRef.current.offsetWidth);
    }
  });

  // if searchBarActive is false then clear data
  useEffect(() => {
    if (!searchBarActive) {
      setSearchData([]);
    }
  }, [searchBarActive]);

  // Dispatch selection when item is clicked
  const itemHandler = (data) => {
    dispatch({
      type: "SET_SEARCH_BAR",
      payload: false,
    });
    if (type !== "song") {
      dispatch({
        type: "SET_SEARCH_BAR_SELECTION",
        payload: {
          album_cover: data.album_cover,
          album_name: data.album_name,
          album_photo: data.album_photo,
          artist_cover: data.artist_cover,
          artist_name: data.artist_name,
          artist_photo: data.artist_photo,
          song_audio: data.song_audio,
          song_names: data.song_names,
          type: data.type,
          album_shadow: data.album_shadow,
          artist_shadow: data.artist_shadow,
          song_name: "",
          id: data.id,
          song_lengths: data.song_lengths,
        },
      });
    } else {
      const currentSongIndex = data.song_names.indexOf(data.display);
      dispatch({
        type: "SET_CURRENT_SONG",
        payload: {
          audioSrc: data.song_audio[currentSongIndex],
          songName: data.song_names[currentSongIndex],
          artistName: data.artist_name,
          thumbnailPic: data.album_photo,
        },
      });

      dispatch({
        type: "SET_CURRENT_ALBUM",
        payload: {
          id: data.id,
          album_name: data.album_name,
          album_photo: data.album_photo,
          artist_name: data.artist_name,
          artist_photo: data.arist_photo,
          song_audio: data.song_audio,
          song_names: data.song_names,
          current_index: currentSongIndex,
          type: data.type,
          song_lengths: data.song_lengths,
        },
      });
      dispatch({
        type: "SET_SEARCH_BAR_SELECTION",
        payload: {
          album_cover: data.album_cover,
          album_name: data.album_name,
          album_photo: data.album_photo,
          artist_cover: data.artist_cover,
          artist_name: data.artist_name,
          artist_photo: data.artist_photo,
          song_audio: data.song_audio,
          song_names: data.song_names,
          type: data.type,
          album_shadow: data.album_shadow,
          artist_shadow: data.artist_shadow,
          song_name: data.display,
          song_lengths: data.song_lengths,
          id: data.id,
        },
      });
    }
  };

  return (
    <StyledSearchBar mainWidth={mainWidth} animationState={animationState}>
      <StyledBar
        animationState={animationState}
        theme={theme}
        ref={barRef}
        className="searchbar container"
        onClick={barHandler}
      >
        <input
          type="text"
          placeholder="Search..."
          onInput={inputHandler}
          onClick={inputHandler}
          className="searchbar input"
        />
        <button className="searchbar button">
          <MagnifyingGlassIcon theme={theme} />
        </button>
      </StyledBar>

      <ItemContainer
        theme={theme}
        barWidth={barWidth}
        containerHeight={containerHeight}
        className="item container"
        animationState={animationState}
        searchData={searchData}
        animate={
          animationState
            ? {
                height: `${containerHeight + 10}px`,
                transition: {
                  duration: 0.5,
                  ease: "linear",
                },
              }
            : {
                height: `${containerHeight}px`,
                transition: {
                  duration: 0,
                },
              }
        }
        transition={
          animationState
            ? {
                duration: 0.5,
                ease: "linear",
              }
            : {
                duration: 0,
              }
        }
      >
        {searchData.map((data, index) => (
          <StyledItem
            key={index}
            theme={theme}
            className={`item ${index} ${index === 0 ? "firstItem" : ""}`}
            onClick={() => itemHandler(data)}
            to={`/${data.type}s`}
            animationState={animationState}
          >
            <div className="cover">
              <img
                src={
                  type === "album"
                    ? data.album_photo
                    : type === "song"
                    ? data.album_photo
                    : data.artist_photo
                }
                alt={`${type} cover`}
              />
            </div>

            <div className="titles">
              <h5>{data.display}</h5>
              <h6>
                {type === "album"
                  ? data.artist_name
                  : type === "song"
                  ? data.artist_name
                  : ""}
              </h6>
            </div>
          </StyledItem>
        ))}
      </ItemContainer>
    </StyledSearchBar>
  );
};

const StyledSearchBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: calc(4rem + 5px);
  transition: ${(props) => (props.animationState ? "all 0.5s ease" : "")};
  z-index: 999999 !important;
  position: relative;

  // Media queries
  @media (max-width: 1299px) {
    transform: translateY(-16px);
  }
  @media (max-width: 650px) {
    justify-content: center;
  }
`;

const StyledBar = styled.div`
  border: 1px solid
    ${(props) =>
      props.theme === "light"
        ? "rgba(186, 186, 186, 50)"
        : "rgba(108, 108, 108 , 50)"};
  border-radius: 1rem;
  margin-right: 4rem;
  z-index: 999999;
  position: relative;
  transform: translateY(1px);
  background: ${(props) => (props.theme === "light" ? "white" : "#121212")};
  width: 25.9rem;
  transition: ${(props) => (props.animationState ? "all 0.5s ease" : "")};

  input {
    padding: 0.4rem 0rem 0.4rem 1rem;
    font-size: 1.8rem;
    width: 80%;
    z-index: 999;
    color: ${(props) => (props.theme === "light" ? "#898989" : "white")};
    font-weight: 500;
    font-family: "Montserrat", sans-serif;
  }

  button {
    cursor: pointer;
    width: 20%;
    transform: translateY(-0.6rem) translateX(5px);
    height: 100%;
    border-radius: 0rem 1rem 1rem 0rem;
    position: relative;
    z-index: 999;
    transition: ${(props) => (props.animationState ? "all .1s ease" : "")};

    svg {
      position: absolute;
      transform: translateY(0.6rem) translateX(0.75rem);
      top: 0;
      right: 0;
      height: 1.8rem;
      z-index: 999;
      transition: ${(props) => (props.animationState ? "all .1s ease" : "")};
    }

    &:hover {
      svg {
        transform: scale(1.15) translateY(0.6rem) translateX(0.75rem);
        path {
          fill: ${(props) => (props.theme === "light" ? "#898989" : "white")};
        }
      }
    }
  }

  // Media queries
  @media (max-width: 650px) {
    margin: 0rem 4rem;
  }
  @media (max-width: 450px) {
    margin: 0rem 1rem;
  }
`;

const ItemContainer = styled(motion.div)`
  position: absolute;
  background: ${(props) => (props.theme === "light" ? "white" : "#121212")};
  border-radius: 1rem;
  width: calc(${(props) => props.barWidth}px);
  border: 1px solid
    ${(props) =>
      props.theme === "light"
        ? "rgba(186, 186, 186, 50)"
        : "rgba(108, 108, 108 , 50)"};

  display: ${(props) =>
    props.containerHeight === 13 || props.searchData.length === 0
      ? "none"
      : "auto"};

  z-index: 900;
  overflow: hidden;
  transition: ${(props) => (props.animationState ? "all 0.5s ease" : "")};
  transform: translateX(-4rem) translateY(1rem);

  .firstItem {
    margin-top: 3rem;
  }
`;

const StyledItem = styled(Link)`
  background: ${(props) => (props.theme === "light" ? "white" : "#121212")};
  margin: 2rem 0.95rem;
  height: 8rem;
  width: calc(100% - 2rem);
  display: flex;
  align-items: center;
  cursor: pointer;
  transform: translateY(1.1rem);
  border-radius: 1rem;
  z-index: 9999 !important;
  transition: ${(props) => (props.animationState ? "all 0.5s ease" : "")};

  .titles {
    transform: translateY(-0.4rem);
    color: ${(props) => (props.theme === "light" ? "#898989" : "white")};
    font-weight: 500;
    margin: 0rem 1.5rem;
    pointer-events: none;
    h5 {
      font-size: 1.6rem;
    }
    h6 {
      font-size: 1rem;
    }
  }

  .cover {
    pointer-events: none;
    height: 8rem;
    width: 8rem;
    border-radius: 1rem;
    aspect-ratio: 1/1;
    img {
      height: 100%;
      width: 100%;
      aspect-ratio: 1/1;
      border-radius: 1rem;
    }
  }

  :hover {
    background: ${(props) =>
      props.theme === "light" ? "#36363610" : "#303030"};
  }
`;

export default SearchBar;

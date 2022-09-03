// Libraries
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

// Components and icons
import { StyledContainer } from "./styles";
import { RpPlayIcon, RpPauseIcon } from "./icons";
import { useEffect, useRef } from "react";

const RecentlyPlayed = () => {
  // Grab needed state and set vars
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const screenWidth = useSelector((state) => state.width.screenWidth);
  const isPlaying = useSelector((state) => state.song.isPlaying);
  const appHeight = useSelector((state) => state.appHeight.appHeight);
  const { songName } = useSelector((state) => state.song.currentSong);
  const recentSongs = useSelector((state) => state.song.recentSongs);
  const recentContainer = useRef(null);
  const currentArtistName = useSelector(
    (state) => state.currentAlbum.artist_name
  );
  const currentIndex = useSelector((state) => state.currentAlbum.current_index);
  const currentSongNames = useSelector(
    (state) => state.currentAlbum.song_names
  );
  const animationState = useSelector((state) => state.animations);

  // Handlers
  const activeSelectionHandler = () => {
    dispatch({
      type: "SET_IS_PLAYING",
      payload: {
        isPlaying: !isPlaying,
      },
    });
  };

  const recentItemHandler = (song) => {
    dispatch({
      type: "SET_CURRENT_SONG",
      payload: {
        audioSrc: song.audioSrc,
        songName: song.songName,
        artistName: song.artistName,
        thumbnailPic: song.thumbnailPic,
      },
    });
  };

  // Calc number of items recently played container can display
  useEffect(() => {
    if (recentContainer.current) {
      const containerHeight = recentContainer.current.offsetHeight - 160; // 160 just for extra precaution

      if (recentContainer.current.children.length > 1) {
        // Get height of title and title margin
        let totalHeight = 0;

        // For each item after the first element, get the height of it including margin. If not enough room for item the remove it
        for (let i = 1; i < recentContainer.current.children.length - 1; i++) {
          totalHeight += recentContainer.current.children[i].offsetHeight + 20;
        }
        // Remove last recent song if needed
        if (containerHeight < totalHeight) {
          dispatch({ type: "REMOVE_END_SONG" });
        }
      }
    }
  }, [recentSongs, appHeight, screenWidth, songName]);

  return (
    <FullRP className="rightBar recently-played-container-parent">
      <StyledBarContainer
        animationState={animationState}
        theme={theme}
        screenWidth={screenWidth}
        className="rightBar recently-played-container-child-one"
      >
        <h4 className="rightBar recently-played-container-h4">
          CURRENTLY PLAYING
        </h4>
        <li
          className="rightBar recently-played-container-li"
          style={{ borderLeft: "3px solid #3ca8c9" }}
          onClick={activeSelectionHandler}
        >
          <button className="track rightBar">
            {isPlaying ? (
              <RpPauseIcon
                theme={theme}
                activeSelection={true}
                className="rightBar recently-played-container-pause-icon"
              />
            ) : (
              <RpPlayIcon
                theme={theme}
                activeSelection={true}
                className="rightBar recently-played-container-play-icon"
              />
            )}
            <div className="trackNames rightBar active">
              <h5 className="rightBar active-song-names">
                {currentSongNames[currentIndex]}
              </h5>
              <h6 className="rightBar acitve-artist-names">
                {currentArtistName}
              </h6>
            </div>
          </button>
        </li>
      </StyledBarContainer>

      <RPBarContainer
        animationState={animationState}
        theme={theme}
        ref={recentContainer}
        className="rightBar recently-played-container-two"
        style={{
          height: `calc(100vh - 32rem)`,
          transform: "translateY(-3rem)",
        }}
      >
        <h4 className="rightBar recentlyPlayed-container-two-title">
          RECENTLY PLAYED
        </h4>

        {recentSongs.length < 1 ? (
          <h4 className="empty-title rightBar">
            Recently played is currently empty
          </h4>
        ) : (
          recentSongs.map((song, index) => (
            <div
              className={`rightBar song-${index} recent-song`}
              key={`${index}${song}`}
              onClick={() => {
                recentItemHandler(song);
              }}
            >
              {song.songName ? (
                <li className={`rightBar li-${index}`}>
                  <button className={`track track-${index} rightBar `}>
                    <svg
                      width="19"
                      height="24"
                      viewBox="0 0 19 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 1.94403V22.056C0 23.5896 1.62937 24.5214 2.88418 23.6867L18.1291 13.6307C19.2903 12.8736 19.2903 11.1264 18.1291 10.3499L2.88418 0.313336C1.62937 -0.521426 0 0.410401 0 1.94403Z"
                        fill={theme === "light" ? "#898989" : "white"}
                      />
                    </svg>

                    <div className={`trackNames rightBar track-${index}`}>
                      <h5
                        style={{ color: "#898989" }}
                        className={`track-${index} h5 rightBar`}
                      >
                        {song.songName}
                      </h5>
                      <h6
                        className={`track-${index} h6 rightBar`}
                        style={{ color: "#CECECE" }}
                      >
                        {song.artistName}
                      </h6>
                    </div>
                  </button>
                </li>
              ) : (
                ""
              )}
            </div>
          ))
        )}
      </RPBarContainer>
    </FullRP>
  );
};

const FullRP = styled(motion.div)`
  position: absolute;
  top: -77.9rem;

  @media (max-width: 1299px) {
    transform: none;
    top: 10.9rem;
  }
`;

const StyledBarContainer = styled(StyledContainer)`
  margin-left: 0;

  h4 {
    margin-left: 4rem;
    transform: ${(props) =>
      props.screenWidth < 1299 ? "translateX(-3px)" : "translateX(-4px)"};
  }

  li {
    width: calc(100% + 3px);
    transform: translateX(-3px);
    transition: ${(props) => (props.animationState ? "all .5s ease" : "none")};
    border-left: 3px solid rgba(0, 0, 0, 0);

    div,
    svg,
    h5,
    h6 {
      cursor: pointer;
      pointer-events: none;
    }

    &:hover {
      border-left: 3px solid #3ca8c9;
    }
  }

  button {
    display: flex;
    margin-left: 3.5rem;
    transform: translateX(0.5rem);
    width: calc(100% - 4.3rem);

    svg {
      transform: translateY(0.25rem) translateX(-7px);
      margin-right: calc(2rem - 9px);
    }
  }

  .volumeButton {
    transform: translateX(-2px);
    svg {
      transform: translateY(0.25rem) translateX(1px);
    }
  }

  .track {
    color: #3ca8c9;
    display: flex;
    align-items: center;
  }

  .trackNames {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    text-align: start;
    h5,
    h6 {
      margin: 0.5rem 0rem;
      font-size: 1.6rem;
      font-weight: 500;
      transform: translateX(-8px);
    }
  }

  .empty-title {
    color: ${(props) => (props.theme === "light" ? "#8989897d" : "#6c6c6c")};
  }

  .recently-played-container-li {
    button {
      transform: translateX(1px);
    }

    .trackNames {
      transform: translateX(6px);
    }
  }

  .recent-song {
    transform: translateX(5px);
    svg {
      transform: translateX(-13px);
    }
  }

  .recentlyPlayed-container-two-title {
    transform: translateX(-5px);
  }
`;

const RPBarContainer = styled(StyledBarContainer)`
  li {
    border-left: 3px solid rgba(0, 0, 0, 0);
    transform: translateX(-8px);

    h5,
    h6,
    path,
    svg {
      transition: ${(props) => (props.animationState ? "all .5s ease" : "")};
    }

    &:hover {
      border-left: 3px solid #3ca8c9;

      h5,
      h6 {
        color: #3ca8c9 !important;
      }

      path {
        fill: #3ca8c9;
      }
    }
  }

  button {
    transform: translateX(7px);
  }
`;

export default RecentlyPlayed;

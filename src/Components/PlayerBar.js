// Libraries
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Components & icons
import {
  PauseIcon,
  PlayIcon,
  SkipForwardIcon,
  SkipBackwardIcon,
  VolumeFullIcon,
  VolumeEmptyIcon,
  VolumeLowIcon,
  VolumeMuteIcon,
} from "./icons";

const PlayerBar = () => {
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.song.isPlaying);
  const [songInfo, setSongInfo] = useState({
    currentTime: null,
    duration: null,
    animationPercentage: 0,
  });
  const [volumeValue, setVolumeValue] = useState(100);
  const audioLimtiState = useSelector((state) => state.audioLimit);
  const volumeRef = useRef(null);
  const [mute, setMute] = useState(false);
  const {
    song_audio,
    song_names,
    current_index,
    artist_name,
    id,
    album_photo,
    artist_photo,
    type,
  } = useSelector((state) => state.currentAlbum);
  const resetTime = useSelector((state) => state.selection.resetTime);
  const audioSrc = song_audio[current_index];
  const animationState = useSelector((state) => state.animations);
  const sizeMessagePresenceRequired = useSelector(
    (state) => state.sizeMessage.presenceRequired
  );
  const sizeMessageUnderstood = useSelector(
    (state) => state.sizeMessage.understood
  );

  const formatTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  // Handlers
  const playPauseHandler = () => {
    // toggle pause / play
    dispatch({
      type: "SET_IS_PLAYING",
      payload: {
        isPlaying: !isPlaying,
      },
    });

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  // Update the time value of the song, every second passes
  // And update the percentage
  const timeUpdateHandler = (e) => {
    // Calc time vars for h6 inner text
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    // Calc percentage complete for input
    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const percentage = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({
      currentTime: currentTime,
      duration: duration,
      animationPercentage: percentage,
    });
  };

  // Update time when user clicks on input drag
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  // when song ends or next / prev button are pressed
  const playNextPrevHandler = (target) => {
    if (target !== false) {
      // If only 1 element, stop playing and return to start
      if (
        song_audio.length === 1 ||
        (current_index === 0) & (target === "prev")
      ) {
        audioRef.current.currentTime = 0;
        dispatch({ type: "SET_IS_PLAYING", payload: { isPlaying: false } });
      }
      // At end of album, stop playing and return to index[0]
      else if (
        (song_audio[song_audio.length - 1] === audioSrc) &
        (target === "next")
      ) {
        dispatch({ type: "SET_IS_PLAYING", payload: { isPlaying: false } });
        dispatch({
          type: `PLAY_${target.toUpperCase()}_SONG`,
        });
        dispatch({
          type: "SET_INDEX",
          payload: {
            current_index: 0,
          },
        });
      }

      // play next / prev song
      else {
        dispatch({
          type: `PLAY_${target.toUpperCase()}_SONG`,
        });

        if (target === "next") {
          dispatch({
            type: "SET_INDEX",
            payload: {
              current_index: current_index + 1,
            },
          });
        } else {
          dispatch({
            type: "SET_INDEX",
            payload: {
              current_index: current_index - 1,
            },
          });
        }
      }
    }
  };

  // On click of volume button, toggle mute
  const volumeButtonHandler = () => {
    setMute(!mute);
  };

  // Volume input code
  const volumeDragHandler = (e, type = false) => {
    // Limit the value of volume relative to audio limit state if needed
    if (!type) {
      if (audioLimtiState < e.target.value) {
        setVolumeValue(audioLimtiState);

        if (!mute) {
          audioRef.current.volume = audioLimtiState / 100;
        }
      } else {
        setVolumeValue(e.target.value);
        if (!mute) {
          audioRef.current.volume = volumeValue / 100;
        }
      }
    } else {
      if (audioLimtiState < e) {
        setVolumeValue(audioLimtiState);

        if (!mute) {
          audioRef.current.volume = audioLimtiState / 100;
        }
      } else {
        setVolumeValue(e);
        if (!mute) {
          audioRef.current.volume = volumeValue / 100;
        }
      }
    }
  };

  // On click of cover dispatch id
  const coverHandler = () => {
    dispatch({
      type: "SET_SELECTION_ID",
      payload: {
        id: id,
      },
    });
  };

  // On hover set clear selection to true and false on exit
  const coverHoverHandler = (value) => {
    dispatch({
      type: "SET_CLEAR_SELECTION",
      payload: {
        clearSelection: value,
      },
    });
  };

  // On index change run play next prev handler
  useEffect(() => {
    playNextPrevHandler(false);
  }, [current_index]);

  // When the user presses the space bar, toggle is playing
  document.body.onkeyup = (e) => {
    // keycode 179 will only work if body window is selected
    if (e.keyCode === 32 || e.keycode === 179) {
      playPauseHandler();
    }
  };

  // Add the styles for the animate track
  const trackTimeAnim = {
    width: `${
      songInfo.animationPercentage < 90
        ? songInfo.animationPercentage
        : songInfo.animationPercentage - 0.5 // to fix bug where fill bar is in front of thumb
    }%`,
  };

  // Sort volume relative to mute value - no need to update state as volumeState
  // value is going to remain the same
  useEffect(() => {
    if (mute) {
      audioRef.current.volume = 0;
    } else {
      audioRef.current.volume = volumeValue / 100;
    }
  }, [mute, audioSrc, isPlaying]);

  // Play / pause auido
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [audioSrc, isPlaying]);

  // On change of audio limit state, call volumeDragHandler
  // and update volume val if needed
  useEffect(() => {
    volumeDragHandler(volumeRef.current.value, true);
  }, [audioLimtiState]);

  // When reset time is changed, reset time and set it to false
  useEffect(() => {
    if (resetTime) {
      // Set it to false
      dispatch({
        type: "SET_RESET_TIME",
        payload: {
          resetTime: false,
        },
      });

      // And reset time
      audioRef.current.currentTime = 0; // resets time of audio tag
      // resets state time
      setSongInfo({
        ...songInfo,
        currentTime: 0,
      });
    }
  }, [resetTime, dispatch]);

  return (
    <StyledPlayerBar
      sizeMessagePresenceRequired={sizeMessagePresenceRequired}
      sizeMessageUnderstood={sizeMessageUnderstood}
    >
      <StyledLeft
        onClick={coverHandler}
        onMouseEnter={() => coverHoverHandler(false)}
        onMouseLeave={() => coverHoverHandler(true)}
        to={`${type}s`}
        animationState={animationState}
      >
        <div className="cover">
          <img
            src={type === "artist" ? artist_photo : album_photo}
            alt={`${song_names[current_index]} thumbnail`}
          />
        </div>

        <div className="titles">
          <h5>{song_names[current_index]}</h5>
          <h6>{artist_name}</h6>
        </div>
      </StyledLeft>

      <StyledMiddle>
        <PlayButtons animationState={animationState}>
          <button
            className="skipBackwards"
            onClick={() => playNextPrevHandler("prev")}
          >
            <SkipBackwardIcon />
          </button>
          <button className="playPause" onClick={playPauseHandler}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            className="skipForwards"
            onClick={() => playNextPrevHandler("next")}
          >
            <SkipForwardIcon />
          </button>
        </PlayButtons>

        <StyledTime>
          <h6>
            {songInfo.currentTime
              ? `${formatTime(songInfo.currentTime)}`
              : "0:00"}
          </h6>

          <div className="track">
            <input
              type="range"
              min={0}
              max={songInfo.duration ? songInfo.duration : 0}
              value={songInfo.currentTime ? songInfo.currentTime : 0}
              onChange={dragHandler}
              onInput={dragHandler}
            />
            <div className="animate-track" style={trackTimeAnim} />
          </div>

          <h6 className="duration">
            {songInfo.duration ? `${formatTime(songInfo.duration)}` : "0:00"}
          </h6>
        </StyledTime>
      </StyledMiddle>

      <StyledRightBar volumeValue={volumeValue} animationState={animationState}>
        <button
          className={mute ? "volumeMuteIcon" : "volumeIcon"}
          onClick={volumeButtonHandler}
        >
          {mute ? (
            <VolumeMuteIcon />
          ) : volumeValue > 50 ? (
            <VolumeFullIcon />
          ) : volumeValue > 0 ? (
            <VolumeLowIcon />
          ) : (
            <VolumeEmptyIcon />
          )}
        </button>
        <div className="track">
          <input
            type="range"
            min={0}
            max={100}
            value={volumeValue}
            onChange={volumeDragHandler}
            onClick={volumeDragHandler}
            ref={volumeRef}
          />
          <motion.div
            className="animate-track"
            style={{
              width: `${volumeValue}%`,
            }}
          />
        </div>
      </StyledRightBar>
      <audio
        src={song_audio[current_index]}
        ref={audioRef}
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        onEnded={() => playNextPrevHandler("next")}
      />
    </StyledPlayerBar>
  );
};

const StyledPlayerBar = styled.div`
  width: 100vw;
  height: 8rem;
  position: fixed;
  top: calc(100vh - 8rem);
  left: 0%;
  background: #3ca8c9;
  z-index: 1000;
  display: flex;
  pointer-events: ${(props) =>
    props.sizeMessagePresenceRequired & !props.sizeMessageUnderstood
      ? "none"
      : "auto"};

  button {
    svg {
      height: 100%;
      width: 100%;
    }
  }

  @media (max-width: 1299px) {
    justify-content: space-between;
  }
`;

const StyledLeft = styled(Link)`
  margin: 1rem 0rem 1rem 4rem;
  display: flex;
  align-items: center;
  width: 22.3rem;
  cursor: pointer;

  .cover {
    height: 6rem;
    width: 6rem;
    border-radius: 1rem;
    aspect-ratio: 1/1;

    img {
      height: 100%;
      width: 100%;
      aspect-ratio: 1/1;
      border-radius: 1rem;
      transition: ${(props) =>
        props.animationState ? "all .1s ease" : "none"};
    }

    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }

  .titles {
    color: white;
    font-weight: 500;
    margin-left: 1.5rem;
    h5 {
      font-size: 1.6rem;
    }
    h6 {
      font-size: 1rem;
      font-weight: 500;
    }

    &:hover {
      text-decoration: underline;
      text-decoration-color: white;
    }

    h5:hover {
      text-decoration-thickness: 0.2rem;
    }

    h6:hover {
      text-decoration-thickness: 0.1rem;
      text-underline-offset: 0.2rem;
    }
  }

  @media (max-width: 1299px) {
    margin: 1rem 2.2rem;
  }

  @media (max-width: 900px) {
    width: 20rem;
    .cover {
      height: 5rem;
      width: 5rem;
    }
    .titles {
      h5 {
        font-size: 1.4rem;
      }
    }
  }
  @media (max-width: 850px) {
    width: 18.5rem;
  }
`;

const StyledMiddle = styled.div`
  width: calc(100vw - 48rem);
  display: flex;
  flex-direction: column;
  transform: translateX(1.1rem);
  margin: 0rem 10.8rem;

  @media (max-width: 1299px) {
    margin: 0rem;
    width: calc(100% - 50rem);
    transform: translateX(-0.45rem);
  }

  @media (max-width: 900px) {
    width: calc(100% - 45rem);
    transform: translateX(0.92rem);
  }
  @media (max-width: 880px) {
    width: calc(100% - 45rem);
    transform: translateX(0.85rem);
  }

  @media (max-width: 850px) {
    width: calc(100% - 37.5rem);
    transform: translateX(1.1rem);
  }
  @media (max-width: 850px) {
    width: calc(100% - 37.5rem);
    transform: translateX(1.15rem);
  }

  @media (max-width: 815px) {
    width: calc(100% - 35rem);
    transform: translateX(1.3rem);
  }
`;

const PlayButtons = styled.div`
  transform: translateY(1.35rem);
  width: 20rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: center;

  button {
    height: 2.5rem;
    transition: ${(props) => (props.animationState ? "all .1s ease" : "none")};

    svg {
      height: 100%;
      transition: ${(props) =>
        props.animationState ? "all .1s ease" : "none"};
    }

    &:hover {
      svg {
        transform: scale(1.2);
      }
    }
  }

  .skipBackwards,
  .skipForwards {
    height: 1.5rem;
  }

  button {
    height: 3rem;
  }

  .playPause {
    margin: 0rem 2rem;
  }

  // The value has to be different on firefox
  @-moz-document url-prefix() {
    .playPause {
      margin: 0rem 4rem;
    }
  }

  @media (max-width: 1299px) {
    transform: translateY(1.35rem);
  }

  @media (max-width: 900px) {
    transform: translateY(1.35rem) translateX(-2px);
  }

  @media (max-width: 875px) {
    transform: translateY(1.35rem);
  }

  @media (max-width: 850px) {
    transform: translateY(1.35rem);
  }

  @media (max-width: 815px) {
    transform: translateY(1.35rem) translateX(-1px);
  }

  @media (max-width: 799px) {
    transform: translateY(1.35rem) translateX(-1px);
  }
  @media (max-width: 780px) {
    transform: translateY(1.35rem);
  }
`;

const StyledInputs = styled.div`
  input {
    width: 100%;
    -webkit-appearance: none;
    background: transparent;
    cursor: pointer;
  }

  input[type="range"]:focus {
    outline: none;
  }

  input[type="range"]::-moz-focusring {
    outline: none;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 1.4rem;
    width: 1.4rem;
    border-radius: 1rem;
    background: White;
    transform: translateY(-0.45rem);
    z-index: 99999;
  }

  input[type="range"]::-ms-thumb {
    -webkit-appearance: none;
    height: 1.4rem;
    width: 1.4rem;
    border-radius: 1rem;
    background: White;
    transform: translateY(-0.45rem);
    z-index: 99999;
    outline: none;
  }

  input[type="range"]::-moz-range-thumb {
    -webkit-appearance: none;
    height: 1.4rem;
    width: 1.4rem;
    border-radius: 1rem;
    background: White;
    transform: translateY(-0.45rem);
    z-index: 99999;
    border: 0px solid rgba(0, 0, 0, 0);
    transform: translateY(-0.5rem);
  }

  .track {
    background: rgba(255, 255, 255, 0.48);
    width: 100%;
    height: 0.5rem;
    border-radius: 1rem;
    position: relative;
  }
  .animate-track {
    background: white;
    height: 0.5rem;
    border-radius: 1rem;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const StyledTime = styled(StyledInputs)`
  margin: calc(2.05rem - 1px) 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  h6 {
    color: white;
    font-size: 1.6rem;
    width: 6rem;
    cursor: context-menu;
  }

  .duration {
    text-align: end;
  }
`;

const StyledRightBar = styled(StyledInputs)`
  width: 22.3rem;
  margin: 1rem 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transform: translateY(1.9rem) translateX(-3rem);

  .volumeIcon {
    width: ${(props) => (props.volumeValue > 0 ? "8.4rem" : "8.5rem")};
    height: ${(props) => (props.volumeValue > 50 ? "2rem" : "1.6rem")};
    transform: ${(props) =>
      props.volumeValue > 50
        ? "translateX(-1.6rem)"
        : props.volumeValue > 0
        ? "translateX(-1.9rem)"
        : "translateX(-2.2rem)"};
  }
  .volumeMuteIcon {
    width: 8.5rem;
    height: 1.6rem;
    transform: translateX(-1.7rem);
  }

  button {
    &:hover {
      svg {
        transform: scale(1.25);
      }
    }

    svg {
      transition: ${(props) =>
        props.animationState ? "all .1s ease" : "none"};
    }
  }

  @media (max-width: 1299px) {
    width: 15rem;
    margin: 1rem 2.2rem;
    transform: translateY(1.9rem) translateX(-0.9rem);
    margin-left: 9.5rem;
  }

  @media (max-width: 900px) {
    width: 15rem;
  }

  @media (max-width: 850px) {
    width: 14rem;
  }
  @media (max-width: 815px) {
    transform: translateY(1.9rem) translateX(-1rem);
  }
`;

export default PlayerBar;

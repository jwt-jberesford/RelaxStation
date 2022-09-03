// Libraries
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { motion } from "framer-motion";

// Components and icons
import { ThumbnailPlay, PointedArrowFlipped, ThumbnailPause } from "./icons";
import { StyledDeselect, DarkOverlay } from "./styles";
import styled from "styled-components";

const RecordHover = ({ textNeeded, type, id }) => {
  // State and state related vars
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.song.isPlaying);
  const selection_song_names = useSelector(
    (state) => state.selection.song_names
  );
  const selection_song_audio = useSelector(
    (state) => state.selection.song_audio
  );
  const selection_artist_name = useSelector(
    (state) => state.selection.artist_name
  );
  const selection_album_name = useSelector(
    (state) => state.selection.album_name
  );
  const selection_type = useSelector((state) => state.selection.type);
  const selection_id = useSelector((state) => state.selection.id);
  const song_lengths = useSelector((state) => state.selection.song_lengths);
  const selection_album_photo = useSelector(
    (state) => state.selection.album_photo
  );
  const selection_artist_photo = useSelector(
    (state) => state.selection.artist_photo
  );

  // Handlers
  const deselectHandler = () => {
    dispatch({
      type: "REMOVE_SELECTION",
    });
    dispatch({
      type: "SET_CS_OVERRIDE",
      payload: false,
    });
  };

  // Thumbnail handler
  const playPauseHandler = () => {
    if (pathname.includes(type) & (id === selection_id)) {
      dispatch({
        type: "SET_IS_PLAYING",
        payload: {
          isPlaying: !isPlaying,
        },
      });
    } else {
      dispatch({
        type: "SET_CURRENT_SONG",
        payload: {
          audioSrc: selection_song_audio[0],
          songName: selection_song_names[0],
          artistName: selection_artist_name,
          thumbnailPic:
            type === "artist" ? selection_artist_photo : selection_album_photo,
        },
      });

      dispatch({
        type: "SET_CURRENT_ALBUM",
        payload: {
          id: selection_id,
          album_name: selection_album_name,
          album_photo: selection_album_photo,
          artist_name: selection_artist_name,
          artist_photo: selection_artist_photo,
          song_audio: selection_song_audio,
          song_names: selection_song_names,
          current_index: 0,
          type: selection_type,
          song_lengths: song_lengths,
        },
      });
    }
  };

  return (
    <>
      <StyledButton className="playButton" onClick={playPauseHandler}>
        {pathname.includes(type) & (id === selection_id) & isPlaying ? (
          <ThumbnailPause />
        ) : (
          <ThumbnailPlay />
        )}
      </StyledButton>
      <StyledDeselect>
        {textNeeded ? (
          <motion.div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              translateX: "calc(-27% + 2px)",
              translateY: "100%",
            }}
          >
            <motion.button className="arrow" onClick={deselectHandler}>
              <PointedArrowFlipped />
            </motion.button>
            <motion.button className="deselectText" onClick={deselectHandler}>
              Deselect
            </motion.button>
          </motion.div>
        ) : (
          ""
        )}
      </StyledDeselect>

      <DarkOverlay />
    </>
  );
};

const StyledButton = styled(motion.button)`
  position: absolute;
  height: 4rem;
  transform: translateY(-2rem);

  svg {
    height: 100%;
    width: 100%;
  }
`;

export default RecordHover;

const initState = {
  id: 1,
  album_name: "",
  album_photo: null,
  artist_name: "",
  artist_photo: null,
  song_audio: [],
  song_names: [],
  current_index: null,
  type: "",
  song_lengths: [],
};

const currentAlbumReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_CURRENT_ALBUM":
      // This will fix the bug where the index becomes -1

      if (action.payload.current_index === -1) {
        return {
          id: action.payload.id,
          album_name: action.payload.album_name,
          album_photo: action.payload.album_photo,
          artist_name: action.payload.artist_name,
          artist_photo: action.payload.artist_photo,
          song_audio: action.payload.song_audio,
          song_names: action.payload.song_names,
          current_index: 0,
          type: action.payload.type,
          song_lengths: action.payload.song_lengths,
        };
      } else {
        return {
          id: action.payload.id,
          album_name: action.payload.album_name,
          album_photo: action.payload.album_photo,
          artist_name: action.payload.artist_name,
          artist_photo: action.payload.artist_photo,
          song_audio: action.payload.song_audio,
          song_names: action.payload.song_names,
          current_index: action.payload.current_index,
          song_lengths: action.payload.song_lengths,
          type: action.payload.type,
        };
      }

    case "SET_INDEX":
      // This will fix the bug where the index becomes -1
      if (action.payload_current_index === -1) {
        return {
          ...state,
          current_index: 0,
        };
      } else {
        return {
          ...state,
          current_index: action.payload.current_index,
        };
      }

    default:
      return { ...state };
      break;
  }
};

export default currentAlbumReducer;

const initState = {
  currentSong: {
    audioSrc: "",
    songName: "",
    artistName: "",
    thumbnailPic: null,
  },
  recentSongs: [],
  isPlaying: false,
  playNextSong: false,
  playPrevSong: false,
};

const songReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_CURRENT_SONG":
      state.recentSongs.unshift(state.currentSong);

      return {
        ...state,
        playNextSong: false,
        playPrevSong: false,
        isPlaying: true,
        currentSong: {
          audioSrc: action.payload.audioSrc,
          songName: action.payload.songName,
          artistName: action.payload.artistName,
          thumbnailPic: action.payload.thumbnailPic,
        },
      };

    case "SET_CURRENT_SONG_STOP":
      return {
        ...state,
        playNextSong: false,
        playPrevSong: false,
        isPlaying: false,
        currentSong: {
          audioSrc: action.payload.audioSrc,
          songName: action.payload.songName,
          artistName: action.payload.artistName,
          thumbnailPic: action.payload.thumbnailPic,
        },
      };

    case "SET_LAUNCH_SONG":
      return {
        ...state,
        currentSong: {
          audioSrc: action.payload.audioSrc,
          songName: action.payload.songName,
          artistName: action.payload.artistName,
          thumbnailPic: action.payload.thumbnailPic,
        },
      };

    case "SET_IS_PLAYING":
      return {
        ...state,
        isPlaying: action.payload.isPlaying,
      };

    case "PLAY_NEXT_SONG":
      return {
        ...state,
        playNextSong: true,
        isPlaying: true,
      };

    case "PLAY_PREV_SONG":
      return {
        ...state,
        playPrevSong: true,
        isPlaying: true,
      };

    case "REMOVE_END_SONG":
      return {
        ...state,
        recentSongs: state.recentSongs.slice(0, -1),
      };

    default:
      return {
        ...state,
      };
  }
};
export default songReducer;

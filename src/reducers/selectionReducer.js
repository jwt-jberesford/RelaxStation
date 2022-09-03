const initState = {
  id: 1,
  album_cover: null,
  album_name: "",
  album_photo: null,
  artist_cover: null,
  artist_name: "",
  artist_photo: null,
  song_audio: [],
  song_names: [],
  type: "",
  active: false,
  album_shadow: "",
  artist_shadow: "",
  current_page: 1,
  num_of_pages: 1,
  clearSelection: false,
  homePageValue: 1,
  selectedRecordHome: false,
  resetTime: false,
  song_name: "",
  song_lengths: [],
};

const selectionReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_SELECTION_ID":
      return {
        ...state,
        id: action.payload.id,
        type: action.payload.type,
      };

    case "SET_SELECTION":
      return {
        ...state,
        album_cover: action.payload.album_cover,
        album_name: action.payload.album_name,
        album_photo: action.payload.album_photo,
        artist_cover: action.payload.artist_cover,
        artist_name: action.payload.artist_name,
        artist_photo: action.payload.artist_photo,
        song_audio: action.payload.song_audio,
        song_names: action.payload.song_names,
        type: action.payload.type,
        album_shadow: action.payload.album_shadow,
        artist_shadow: action.payload.artist_shadow,
        selectedRecordHome: false,
        active: true,
        id: action.payload.id,
        song_name: "",
        current_page: 1,
        song_lengths: action.payload.song_lengths,
      };

    // Same as above but won't change page number
    case "SET_SELECTION_FROM_PLAYER_BAR":
      return {
        ...state,
        album_cover: action.payload.album_cover,
        album_name: action.payload.album_name,
        album_photo: action.payload.album_photo,
        artist_cover: action.payload.artist_cover,
        artist_name: action.payload.artist_name,
        song_lengths: action.payload.song_lengths,
        artist_photo: action.payload.artist_photo,
        song_audio: action.payload.song_audio,
        song_names: action.payload.song_names,
        type: action.payload.type,
        album_shadow: action.payload.album_shadow,
        artist_shadow: action.payload.artist_shadow,
        selectedRecordHome: false,
        active: true,
        id: action.payload.id,
        song_name: "",
      };

    case "SET_SELECTION_HOME":
      return {
        ...state,
        album_cover: action.payload.album_cover,
        album_name: action.payload.album_name,
        album_photo: action.payload.album_photo,
        artist_cover: action.payload.artist_cover,
        artist_name: action.payload.artist_name,
        song_lengths: action.payload.song_lengths,
        artist_photo: action.payload.artist_photo,
        song_audio: action.payload.song_audio,
        song_names: action.payload.song_names,
        type: action.payload.type,
        album_shadow: action.payload.album_shadow,
        artist_shadow: action.payload.artist_shadow,
        selectedRecordHome: action.payload.selectedRecordHome,
        active: false,
        id: action.payload.id,
        song_name: "",
      };

    case "SET_SEARCH_BAR_SELECTION":
      return {
        ...state,
        album_cover: action.payload.album_cover,
        album_name: action.payload.album_name,
        album_photo: action.payload.album_photo,
        artist_cover: action.payload.artist_cover,
        artist_name: action.payload.artist_name,
        artist_photo: action.payload.artist_photo,
        song_lengths: action.payload.song_lengths,
        song_audio: action.payload.song_audio,
        song_names: action.payload.song_names,
        type: action.payload.type,
        album_shadow: action.payload.album_shadow,
        artist_shadow: action.payload.artist_shadow,
        active: true,
        selectedRecordHome: false,
        clearSelection: false,
        song_name: action.payload.song_name,
        id: action.payload.id,
      };

    case "REMOVE_SELECTION":
      return {
        ...state,
        id: 1,
        album_cover: null,
        album_name: "",
        album_photo: null,
        artist_cover: null,
        artist_name: "",
        artist_photo: null,
        song_audio: [],
        song_names: [],
        type: "",
        active: false,
        album_shadow: "",
        artist_shadow: "",
        current_page: 1,
        num_of_pages: 1,
        clearSelection: true,
        selectedRecordHome: false,
        song_name: "",
        song_lengths: [],
      };

    case "UPDATE_SELECTION_PAGE_INFO":
      return {
        ...state,
        num_of_pages: action.payload.num_of_pages,
      };

    case "SET_CLEAR_SELECTION":
      return {
        ...state,
        clearSelection: action.payload.clearSelection,
      };

    case "UPDATE_HOME_PAGE_VALUE":
      return {
        ...state,
        homePageValue: action.payload.homePageValue,
      };

    case "SET_RECORD_SELECTION_HOME":
      return {
        ...state,
        selectedRecordHome: true,
        id: action.payload.id,
      };

    case "RESUME_LOOP":
      return {
        ...state,
        selectedRecordHome: false,
      };

    case "SET_SELECTION_PAGE":
      return {
        ...state,
        current_page: action.payload.current_page,
      };

    case "SET_RESET_TIME":
      return {
        ...state,
        resetTime: action.payload.resetTime,
      };

    default:
      return {
        ...state,
      };
  }
};

export default selectionReducer;

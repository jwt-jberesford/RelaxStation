// Libraries
import React, { useEffect } from "react";
import styled from "styled-components";
import { useRef, useLayoutEffect } from "react";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";

// Components & logic
import useWindowSize from "../Components/Logic";
import PlaylistData from "../data/PlaylistData";
import Record from "../Components/Record";
import { StyledGrid, HideAlbum } from "../Components/styles";
import gridLogic from "../Components/gridLogic";

const Artists = () => {
  //   // Data vars
  const playlistData = PlaylistData();
  const displayData = [...playlistData];
  const fakeImg = playlistData[0].artist_photo;

  // State vars & dispatch
  const dispatch = useDispatch();
  const rowCount = useSelector((state) => state.grid.rowCount);
  const colCount = useSelector((state) => state.grid.colCount);
  const pageItemCount = useSelector((state) => state.grid.pageItemCount);
  const currentPage = useSelector((state) => state.grid.currentPage);
  const aboveRecordsHeight = useSelector(
    (state) => state.grid.aboveRecordsHeight
  );
  const selectionActive = useSelector((state) => state.selection.active);
  const selectionId = useSelector((state) => state.selection.id);
  const gridHeight = useSelector((state) => state.grid.gridHeight);
  const reduceRecord = useSelector((state) => state.appHeight.reduceRecordSize);
  const currentAlbumId = useSelector((state) => state.currentAlbum.id);
  const appHeightState = useSelector((state) => state.appHeight.appHeight);

  // Grid vars
  const playlistRef = useRef(null);
  const screenHeight = useWindowSize("height");
  const screenWidth = useWindowSize();
  const screenArea = screenHeight * screenWidth;
  const spliceA = currentPage * pageItemCount - pageItemCount;
  const spliceB = pageItemCount;
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (playlistRef.current) {
      const record =
        playlistRef.current.children[playlistRef.current.children.length - 1]
          .children[0].children;

      // Get grid info and dispatch what is needed
      const [
        newRowCount,
        newColCount,
        newPageCount,
        newPageItemCount,
        gridRowHeight,
        manualRowCountTwo,
        trueGridHeight,
      ] = gridLogic([
        playlistRef,
        record,
        screenWidth,
        appHeightState - 100,
        playlistData.length,
        aboveRecordsHeight,
        selectionActive,
      ]);

      let heightVal = 0;

      if (aboveRecordsHeight + trueGridHeight < window.innerHeight) {
        heightVal = window.innerHeight;
      } else {
        heightVal = aboveRecordsHeight + trueGridHeight;
      }

      if ((screenWidth > 1299) & (heightVal < 846)) {
        heightVal = 846;
      }

      // Dispatch grid and app height
      dispatch({
        type: "SET_APP_HEIGHT",
        payload: {
          appHeight: heightVal,
        },
      });

      dispatch({
        type: "SET_GRID_HEIGHT",
        payload: {
          gridHeight: trueGridHeight,
        },
      });

      // only dispatch if needed
      if (newRowCount !== rowCount || newColCount !== colCount) {
        dispatch({
          type: "UPDATE_GRID",
          payload: {
            rowCount: newRowCount,
            colCount: newColCount,
            pageItemCount: newPageItemCount,
            pageCount: newPageCount,
            gridRowHeight: gridRowHeight,
            manualRowCountTwo: manualRowCountTwo,
          },
        });
      } else {
        dispatch({
          type: "UPDATE_GRID_PARTIAL",
          payload: {
            gridRowHeight: gridRowHeight,
            manualRowCountTwo: manualRowCountTwo,
          },
        });
      }
    }
  }, [
    screenArea,
    dispatch,
    aboveRecordsHeight,
    colCount,
    rowCount,
    screenHeight,
    screenWidth,
    selectionActive,
    selectionId,
    currentPage,
    pathname,
  ]);

  // Dispatch the data belonging to the ID
  useEffect(() => {
    if (pathname.split("/").includes("playlists")) {
      playlistData.forEach((album) => {
        if (album.id === selectionId) {
          if (selectionId === currentAlbumId) {
            dispatch({
              type: "SET_SELECTION_FROM_PLAYER_BAR",
              payload: {
                album_cover: album.album_cover,
                album_name: album.album_name,
                album_photo: album.album_photo,
                artist_cover: album.artist_cover,
                artist_name: album.artist_name,
                artist_photo: album.artist_photo,
                song_audio: album.song_audio,
                song_names: album.song_names,
                album_shadow: album.album_shadow,
                artist_shadow: album.artist_shadow,
                song_lengths: album.song_lengths,
                type: "album",
                id: album.id,
              },
            });
          } else {
            dispatch({
              type: "SET_SELECTION",
              payload: {
                album_cover: album.album_cover,
                album_name: album.album_name,
                album_photo: album.album_photo,
                artist_cover: album.artist_cover,
                artist_name: album.artist_name,
                artist_photo: album.artist_photo,
                song_audio: album.song_audio,
                song_names: album.song_names,
                album_shadow: album.album_shadow,
                artist_shadow: album.artist_shadow,
                song_lengths: album.song_lengths,
                type: "album",
                id: album.id,
              },
            });
          }
        }
      });
    }
  }, [selectionId, playlistData, dispatch]);

  // Reduce record size if only one is on screen - this will fix the bug where if only one is displayed on the screen, it is too large
  useEffect(() => {
    if (playlistRef.current) {
      if (playlistRef.current.children.length === 2) {
        dispatch({
          type: "SET_REDUCE_RECORD",
          payload: {
            reduceRecordSize: true,
          },
        });
      } else {
        dispatch({
          type: "SET_REDUCE_RECORD",
          payload: {
            reduceRecordSize: false,
          },
        });
      }
    }
  }, [screenArea, currentPage]);

  return (
    <StyledPlaylist
      ref={playlistRef}
      screenWidth={screenWidth}
      height={gridHeight}
      reduceRecord={reduceRecord}
    >
      {displayData.splice(spliceA, spliceB).map((album) => (
        <Record
          key={album.id}
          mainImg={album.album_photo}
          title={album.album_name}
          id={album.id}
          type={"playlist"}
        />
      ))}
      {/* below is hidden - using it to calc grid logic */}
      <HideAlbum>
        {
          <Record
            key={"hidden_record_key"}
            mainImg={fakeImg}
            title={"A Letter to the Little Prince"}
            id={`fake-album`}
          />
        }
      </HideAlbum>
    </StyledPlaylist>
  );
};

const StyledPlaylist = styled(StyledGrid)`
  position: relative;
`;

export default Artists;

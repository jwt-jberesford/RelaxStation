// Libraries
import React, { useEffect } from "react";
import styled from "styled-components";
import { useRef, useLayoutEffect } from "react";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";

// Components & logic
import useWindowSize from "../Components/Logic";
import data from "../data/data";
import Record from "../Components/Record";
import { StyledGrid, HideAlbum } from "../Components/styles";
import gridLogic from "../Components/gridLogic";
import artistDataFunc from "../Components/artistDataFunc";

const Artists = () => {
  //   // Data vars
  const artistData = artistDataFunc(data);
  const displayData = [...artistData];
  const fakeImg = artistData[0].artist_photo;

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
  const clearSelection = useSelector((state) => state.selection.clearSelection);
  const selectionType = useSelector((state) => state.selection.type);
  const currentAlbumId = useSelector((state) => state.currentAlbum.id);
  const appHeightState = useSelector((state) => state.appHeight.appHeight);

  // Grid vars
  const ArtistsRef = useRef(null);
  const screenHeight = useWindowSize("height");
  const screenWidth = useWindowSize();
  const screenArea = screenHeight * screenWidth;
  const spliceA = currentPage * pageItemCount - pageItemCount;
  const spliceB = pageItemCount;
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (ArtistsRef.current) {
      const record =
        ArtistsRef.current.children[ArtistsRef.current.children.length - 1]
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
        ArtistsRef,
        record,
        screenWidth,
        appHeightState - 100,
        25,
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
    if (
      (pathname === "/artists") & !clearSelection ||
      (pathname === "/artists") & (selectionType === "artist")
    ) {
      artistData.forEach((artist) => {
        if (artist.id === selectionId) {
          // If selection ID is equal to current album ID - meaning the ID is coming from the player bar cover
          if (selectionId === currentAlbumId) {
            dispatch({
              type: "SET_SELECTION_FROM_PLAYER_BAR",
              payload: {
                album_cover: artist.album_cover,
                album_name: artist.album_name,
                album_photo: artist.album_photo,
                artist_cover: artist.artist_cover,
                song_lengths: artist.song_lengths,
                artist_name: artist.artist_name,
                artist_photo: artist.artist_photo,
                song_audio: artist.song_audio,
                song_names: artist.song_names,
                album_shadow: artist.album_shadow,
                artist_shadow: artist.artist_shadow,
                type: "artist",
                id: artist.id,
              },
            });
          } else {
            dispatch({
              type: "SET_SELECTION",
              payload: {
                album_cover: artist.album_cover,
                album_name: artist.album_name,
                album_photo: artist.album_photo,
                artist_cover: artist.artist_cover,
                artist_name: artist.artist_name,
                artist_photo: artist.artist_photo,
                song_audio: artist.song_audio,
                song_names: artist.song_names,
                album_shadow: artist.album_shadow,
                artist_shadow: artist.artist_shadow,
                song_lengths: artist.song_lengths,
                type: "artist",
                id: artist.id,
              },
            });
          }
        }
      });
    }
  }, [selectionId, artistData, dispatch]);

  // Reduce record size if only one is on screen - this will fix the bug where if only one is displayed on the screen, it is too large
  useEffect(() => {
    if (ArtistsRef.current) {
      if (ArtistsRef.current.children.length === 2) {
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
    <StyledArtists
      ref={ArtistsRef}
      screenWidth={screenWidth}
      height={gridHeight}
      reduceRecord={reduceRecord}
    >
      {displayData.splice(spliceA, spliceB).map((artist) => (
        <Record
          key={artist.id}
          mainImg={artist.artist_photo}
          title={artist.artist_name}
          id={artist.id}
          type={"artist"}
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
            type={"artist"}
          />
        }
      </HideAlbum>
    </StyledArtists>
  );
};

const StyledArtists = styled(StyledGrid)`
  position: relative;
`;

export default Artists;

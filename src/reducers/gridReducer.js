const initState = {
  rowCount: 1,
  colCount: 1,
  pageItemCount: 1,
  pageCount: 1,
  currentPage: 1,
  aboveRecordsHeight: 1,
  gridRowHeight: 1,
  manualRowCountTwo: false,
  gridHeight: 0,
};

const gridReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_GRID":
      return {
        ...state,
        rowCount: action.payload.rowCount,
        colCount: action.payload.colCount,
        pageItemCount: action.payload.pageItemCount,
        pageCount: action.payload.pageCount,
        gridRowHeight: action.payload.gridRowHeight,
        manualRowCountTwo: action.payload.manualRowCountTwo,
      };

    case "SET_GRID_HEIGHT":
      return {
        ...state,
        gridHeight: action.payload.gridHeight,
      };

    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload.currentPage,
      };

    case "UPDATE_ABOVE_RECORDS_HEIGHT":
      return {
        ...state,
        aboveRecordsHeight: action.payload.aboveRecordsHeight,
      };

    case "UPDATE_GRID_PARTIAL":
      return {
        ...state,
        gridRowHeight: action.payload.gridRowHeight,
        manualRowCountTwo: action.payload.manualRowCountTwo,
      };

    default:
      return { ...state };
  }
};

export default gridReducer;

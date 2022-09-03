const gridLogic = (items) => {
  // Declare items
  const gridRef = items[0];
  const record = items[1];
  const screenWidth = Math.round(items[2]);
  const screenHeight = items[3];
  const dataLength = items[4];
  const mainTopHeight = items[5];
  const selectionActive = items[6];

  // Set new vars
  const gridWidth = gridRef.current.offsetWidth;
  const gridHeight = screenHeight - mainTopHeight;

  let newColCount;
  let newRowCount;
  let manualRowCountTwo = false;

  // Calc number of columns
  // Desktop mode
  if (screenWidth > 1299) {
    if (gridWidth < 140) {
      newColCount = 1;
    } else if ((gridWidth >= 140) & (gridWidth <= 379)) {
      newColCount = 2;
    } else if ((gridWidth >= 380) & (gridWidth <= 799)) {
      newColCount = 3;
    } else if ((gridWidth >= 800) & (gridWidth <= 1019)) {
      newColCount = 4;
    } else {
      newColCount = Math.floor((gridWidth + 80) / 220);
    }
  } else {
    if (gridWidth < 140) {
      newColCount = 1;
    } else if ((gridWidth >= 140) & (gridWidth <= 379)) {
      newColCount = 2;
    } else if ((gridWidth >= 380) & (gridWidth <= 689)) {
      newColCount = 3;
    } else if ((gridWidth >= 690) & (gridWidth <= 1019)) {
      newColCount = 4;
    } else {
      newColCount = Math.floor((gridWidth + 80) / 220);
    }
  }

  // Calc number of rows
  const gridRowGap = parseInt(
    window.getComputedStyle(gridRef.current).getPropertyValue("grid-row-gap")
  );

  const recordImgHeight = record[0].offsetHeight;

  // Deliberately missing out H3
  const gridRowHeight = gridRowGap + recordImgHeight + 38;
  newRowCount = Math.ceil(gridHeight / gridRowHeight);

  /// Always have at least 2 rows and manualRowCountTwo declaration
  if (newRowCount > 1) {
    manualRowCountTwo = false;
  } else {
    newRowCount = 2;
    manualRowCountTwo = true;
  }

  // Calc page vars
  const newPageItemCount = newColCount * newRowCount;
  const newPageCount = Math.ceil(dataLength / newPageItemCount);

  // Sort app height and grid height here
  const displayLength = gridRef.current.children.length - 1;
  let trueRowCount = newRowCount;
  let trueGridHeight;

  // Number of rows actually displayed
  if (Math.ceil(displayLength / newColCount) < newRowCount) {
    trueRowCount = Math.ceil(displayLength / newColCount);
  }

  // Calc total grid height
  if (selectionActive) {
    trueGridHeight = gridRowHeight * trueRowCount - parseFloat(gridRowGap) + 70;
  } else {
    trueGridHeight = gridRowHeight * trueRowCount - parseFloat(gridRowGap) + 50;
  }

  return [
    newRowCount,
    newColCount,
    newPageCount,
    newPageItemCount,
    gridRowHeight,
    manualRowCountTwo,
    trueGridHeight,
  ];
};

export default gridLogic;

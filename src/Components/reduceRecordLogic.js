const reduceRecordLogic = (items) => {
  // Reduce size of grid temp cols from 14rem, 1fr to 14rem, 16rem...
  // to prevent over sized records when on one row on final page bug

  const currentPage = items[0];
  const rowCount = items[1];
  const colCount = items[2];
  const pageCount = items[3];
  const dataLength = items[4];

  // Firstly, find if on last page
  let onLastPage = false;
  if (currentPage === pageCount) {
    onLastPage = true;
  } else {
    onLastPage = false;
  }

  // Secondly, find the rowCount on final page and see if it is equal to 1
  let finalPageRowCountOne = false;
  const itemLengthLastPage = dataLength - rowCount * colCount;
  if (Math.ceil(itemLengthLastPage / colCount) === 1) {
    finalPageRowCountOne = true;
  } else {
    finalPageRowCountOne = false;
  }

  // Var for finding if all is true - bug only happens if final page is page 2
  let reduceRecordSize = false;
  if (
    onLastPage &
    (currentPage === 2) &
    finalPageRowCountOne &
    (itemLengthLastPage !== colCount)
  ) {
    reduceRecordSize = true;
  } else {
    reduceRecordSize = false;
  }

  return reduceRecordSize;
};

export default reduceRecordLogic;

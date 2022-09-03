// when selecting banner on home page, this is needed to override
// the clear selection state in the selection reducer
// without this, the data will not always be kept

const csOverrideReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_CS_OVERRIDE":
      return (state = action.payload);

    default:
      return state;
  }
};

export default csOverrideReducer;

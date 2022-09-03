// Libraries
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Record = ({ mainImg, title, id, type }) => {
  // State vars and dispatch
  const theme = useSelector((state) => state.theme);
  const addedWidth = useSelector((state) => state.grid.addedRecordWidth);
  const addedHeight = useSelector((state) => state.grid.addedRecordHeight);
  const selectionId = useSelector((state) => state.selection.id);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const animationState = useSelector((state) => state.animations);

  const clickHandler = () => {
    if ((id !== selectionId) & (pathname !== "/home")) {
      dispatch({
        type: "SET_SELECTION_ID",
        payload: {
          id: id,
          type: type,
        },
      });
      dispatch({
        type: "SET_CS_OVERRIDE",
        payload: false,
      });
    }

    if (pathname === "/home") {
      dispatch({
        type: "SET_RECORD_SELECTION_HOME",
        payload: {
          id: id,
        },
      });
    }
  };

  return (
    <StyledDiv animationState={animationState}>
      <StyledRecord
        theme={theme}
        addedHeight={addedHeight}
        addedWidth={addedWidth}
        animationState={animationState}
        onClick={clickHandler}
        id={id}
      >
        <motion.img src={mainImg} alt={`${title} main`} />
        <motion.h3>{title}</motion.h3>
      </StyledRecord>
    </StyledDiv>
  );
};

const StyledRecord = styled(motion.div)`
  height: 100%;
  width: 100%;
  aspect-ratio: 1/1;
  position: relative;

  img {
    width: 100%;
    border-radius: 1rem;
    aspect-ratio: 1/1;
    object-fit: cover;
    pointer-events: none;
    cursor: pointer;
    transition: ${(props) => (props.animationState ? "all .25s ease" : "none")};
  }

  h3 {
    position: absolute;
    margin-top: 0.5rem;
    font-size: 1.6rem;
    font-weight: 500;
    letter-spacing: 0.63%;
    cursor: pointer;
    transition: ${(props) => (props.animationState ? "all .25s ease" : "none")};
    color: ${(props) => (props.theme === "light" ? "#343434" : "white")};
  }
`;

const StyledDiv = styled(motion.div)`
  transition: ${(props) => (props.animationState ? "all .1s ease" : "none")};

  &:hover {
    h3 {
      color: #3ca8c9;
    }

    img {
      transform: scale(1.08);
    }
  }
`;

export default Record;

// Libraries
import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledBar = styled(motion.div)`
  width: ${(props) => (props.width > 909 ? "30rem" : "25rem")};
  position: relative;
`;

export const StyledTop = styled(motion.div)`
  height: 2.8rem;
  width: 100%;
  margin: 4rem 3.8rem;
  width: calc(100% - 8rem);

  h1 {
    font-size: 2.8rem;
    font-weight: 600;
    color: ${(props) => (props.theme === "light" ? "black" : "white")};
    cursor: pointer;
    transform: translateY(1px);

    @media (max-width: 1299px) {
      font-size: 2.6rem;
      transform: translateY(2.5px);
    }
  }
  span {
    color: #3ca8c9;
  }
`;

export const StyledContainer = styled(motion.div)`
  margin: 8rem 4rem;

  h4,
  a,
  button {
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 2rem;
  }

  h4 {
    letter-spacing: 4%;
    color: ${(props) => (props.theme === "light" ? "#898989" : "#6C6C6C")};
  }

  a,
  button {
    letter-spacing: 0.63%;
    color: ${(props) => (props.theme === "light" ? "#898989" : "white")};
    display: block; // extends the border to the page line
    width: calc(100% + 4rem + 3px);

    svg {
      width: 2.6rem;
      height: 1.4rem;
      margin-right: calc(2rem - 1px);
      transform: translateX(-4px);
    }
  }
`;

export const ButtonBreak = styled(motion.div)`
  height: 100%;
  width: 3px;
  background: ${(props) =>
    props.theme === "light"
      ? "rgba(0, 0, 0, 0.05)"
      : "rgba(255, 255, 255, 0.125)"};
`;

export const StyledGrid = styled(motion.div)`
  width: calc(100% - 8rem);
  z-index: 95;
  margin: 1rem 4rem;

  h3 {
    font-size: 1.6rem;
  }

  // grid things
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(14rem, ${(props) => (props.reduceRecord ? "16rem" : "1fr")})
  );
  grid-column-gap: 8rem;
  grid-row-gap: 8rem;

  // Grid sizing media
  @media (min-width: 1502px) {
    h3 {
      font-size: 1.8rem;
    }
  }
  @media (max-width: 1326px) and (min-width: 1300px) {
    grid-row-gap: 6rem;
  }

  @media (max-width: 1089px) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(12.75rem, ${(props) => (props.reduceRecord ? "14.75rem" : "1fr")})
    );
    grid-row-gap: 6rem;
    h3 {
      font-size: 1.4rem;
    }
  }
  @media (max-width: 749px) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(12rem, ${(props) => (props.reduceRecord ? "14rem" : "1fr")})
    );
    grid-row-gap: 5.5rem;
    h3 {
      font-size: 1.3rem;
    }
  }
  @media (max-width: 624px) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(10rem, ${(props) => (props.reduceRecord ? "12rem" : "1fr")})
    );
    grid-row-gap: 5rem;
  }
  @media (max-width: 494px) {
    grid-row-gap: 4rem;
  }
  @media (max-width: 410px) {
    grid-row-gap: 3.25rem;
    grid-template-columns: repeat(
      2,
      minmax(5rem, ${(props) => (props.reduceRecord ? "7rem" : "1fr")})
    );
    h3 {
      font-size: 1.2rem;
    }
  }
  @media (max-width: 346px) {
    h3 {
      font-size: 1.1rem;
    }
  }
  @media (max-width: 331px) {
    h3 {
      font-size: 1rem;
    }
  }
  @media (max-width: 319px) {
    grid-row-gap: 3rem;
    grid-template-columns: repeat(
      auto-fit,
      minmax(6rem, ${(props) => (props.reduceRecord ? "8rem" : "1fr")})
    );
  }

  // Grid sizing media

  // Media queries
  @media (max-width: 1009px) {
    grid-column-gap: 6rem;
  }
  @media (max-width: 729px) {
    grid-column-gap: 4rem;
  }
  @media (max-width: 391px) {
    grid-column-gap: 3rem;
  }
  @media (max-width: 370px) {
    grid-column-gap: 2rem;
  }
  @media (max-width: 1299px) {
    margin: 3.25rem 4rem;
  }
  @media (max-width: 650px) {
    margin: 3.25rem 2rem;
    width: calc(100% - 4rem);
  }
  @media (max-width: 391px) {
    margin: 3.25rem 2rem 3.25rem 1.5rem;
    width: calc(100% - 3rem);
  }
  @media (max-width: 370px) {
    margin: 3.25rem 1.5rem 3.25rem 1rem;
    width: calc(100% - 2rem);
  }
`;

export const HideAlbum = styled(motion.div)`
  opacity: 0;
  transform: translateY(-200%);
  cursor: none;
  pointer-events: none;
`;

export const StyledArrows = styled(motion.div)`
  transform: translateY(-4px);
  margin-right: 4rem;
  button {
    margin-left: 2rem;
    height: 2rem;

    svg {
      height: 100%;
      transition: ${(props) =>
        props.animationState ? "all .1s ease" : "none"};
    }
  }

  .prevButton {
    svg {
      transform: translateX(-9px);
    }

    &:hover {
      svg {
        transform: translateX(-9px) scale(1.25);
      }
    }
  }
  .nextButton {
    svg {
      transform: translateX(9px);
    }

    &:hover {
      svg {
        transform: translateX(9px) scale(1.25);
      }
    }
  }
`;

export const StyledSelection = styled(motion.div)`
  height: 20rem;
  margin: 6.05rem 4rem;
  border-radius: 1rem;
  position: relative;
  display: flex;
  justify-content: center;
  overflow: hidden;
  z-index: -1;

  .background-img {
    position: absolute;
    width: calc(100% - 16rem);
    transform: translateX(8rem);
    height: 100%;
    object-fit: cover;
  }
`;

export const Thumbnail = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1/1;
  z-index: 99999;

  button {
    width: 4rem;
    height: 4rem;
    z-index: 100;
    svg {
      height: 100%;
      width: 100%;
    }
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 1rem;
    object-fit: cover;
    box-shadow: 1px 2px 24px ${(props) => props.shadow};
  }

  .playButton {
    margin-top: 4rem;
  }
`;

export const SongsContainer = styled(motion.div)`
  width: calc(100% - 30rem);
  height: 20rem;
  margin: ${(props) => (props.columns === 1 ? "1.8rem 4rem" : "1.1rem 4rem")};
  position: relative;
  z-index: 99;
  display: flex;
  flex-direction: column;
  flex-wrap: ${(props) => (props.columns === 1 ? "no-wrap" : "wrap")};

  justify-content: ${(props) =>
    props.justifyFlexStart ? "flex-start" : "center"};
  transform: ${(props) =>
    props.justifyFlexStart ? "0" : "translateY(-1.9rem)"};
`;

export const DarkOverlay = styled(motion.div)`
  z-index: 99;
  background: rgba(0, 0, 0, 0.7);
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  aspect-ratio: 1/1;
  border-radius: 1rem;
  box-shadow: 1px 2px 24px rgba(0, 0, 0, 0.7);
`;

export const SelectionArrows = styled(motion.div)`
  width: 10rem;
  display: flex;
  align-items: center;
  margin: 3rem 0rem;
  z-index: 100000000;

  button {
    margin: 0rem 1rem;
    height: 2rem;

    svg {
      height: 100%;
    }
  }

  @media (max-width: 900px) {
    button {
      height: 1.75rem;
      margin: 0rem 0.75rem;
    }
  }
`;

export const StyledDeselect = styled(motion.div)`
  z-index: 999;
  display: flex;
  align-items: center;
  width: 100%;
  transform: translateY(3.5rem);
  margin-left: 4rem;

  .deselectText {
    margin-left: 1rem;
    color: white;
    font-size: 1.6rem;
    font-weight: 500;
  }

  .arrow {
    height: 1.75rem;

    svg {
      height: 100%;
    }
  }
`;

export const StyledRecordTop = styled(motion.div)`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 6.05rem;
  position: relative;
  z-index: -1;

  h2 {
    margin-left: 4rem;
    font-weight: 500;
    letter-spacing: 0.63%;
    font-size: 2.6rem;
    color: ${(props) => (props.theme === "light" ? "#343434" : "white")};
  }

  // Media queries
  @media (max-width: 650px) {
    h2 {
      margin-left: 2rem;
      font-size: 2.2rem;
      transform: translateY(4px);
    }
  }
  @media (max-width: 443px) {
    h2 {
      width: 35%;
    }
  }
  @media (max-width: 391px) {
    h2 {
      margin-left: 1.5rem;
      font-size: 2.2rem;
      transform: translateY(4px);
    }
  }
  @media (max-width: 370px) {
    h2 {
      margin-left: 1rem;
    }
  }
`;

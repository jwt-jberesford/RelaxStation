import { motion } from "framer-motion";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const ScreenSizeMessage = () => {
  const screenWidth = useSelector((state) => state.width.screenWidth);
  const sizeMessagePresenceRequired = useSelector(
    (state) => state.sizeMessage.presenceRequired
  );
  const animationState = useSelector((state) => state.animations);
  const dispatch = useDispatch();

  const buttonHandler = () => {
    dispatch({
      type: "SET_MESSAGE_UNDERSTOOD",
    });
  };

  return (
    <StyledCard
      animate={
        sizeMessagePresenceRequired & (screenWidth <= 750)
          ? { opacity: 1, display: "inline", transition: { duration: 0.5 } }
          : { opacity: 0, display: "none", transition: { duration: 0.5 } }
      }
      animationState={animationState}
    >
      <motion.div className="message">
        <motion.h2>Important Message</motion.h2>
        <motion.p>
          RelaxStation has not been designed or developed to support devices
          with a screen width of 750px and under.
        </motion.p>
      </motion.div>
      <motion.div className="okayBtn">
        <motion.button onClick={buttonHandler}>I understand</motion.button>
      </motion.div>
    </StyledCard>
  );
};

const StyledCard = styled(motion.div)`
  z-index: 999999;
  height: 18rem;
  width: calc(100vw - 20rem);
  position: absolute;
  transform: translateY(calc(50vh - 9rem)) translateX(calc(50vw - 50% - 8px));
  background: white;
  overflow: hidden;
  border-radius: 1rem;

  .message {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transform: translateY(-2rem);

    h2 {
      font-size: 2.2rem;
      margin: 1rem 0;

      @media (max-width: 481px) {
        font-size: 2rem;
      }
      @media (max-width: 401px) {
        font-size: 1.8rem;
      }
    }

    p {
      font-size: 1.6rem;
      font-weight: 500;
      margin: 0 4rem;
      text-align: center;

      @media (max-width: 481px) {
        margin: 0 2rem;
        font-size: 1.4rem;
      }
      @media (max-width: 401px) {
        margin: 0 1rem;
        font-size: 1.3rem;
      }
    }
  }

  .okayBtn {
    background: #3ca8c9;
    width: 100%;
    height: 4rem;
    position: absolute;
    transform: translateY(-4rem);

    button {
      height: 100%;
      width: 100%;
      font-size: 1.6rem;
      color: white;
      font-weight: 600;
      transition: ${(props) =>
        props.animationState ? "all .5s ease" : "none"};
      text-decoration: underline;
      text-decoration-color: rgba(0, 0, 0, 0);
      text-decoration-thickness: 0.2rem;
      text-underline-offset: 0.2rem;

      &:hover {
        text-decoration-color: white;
      }
    }
  }

  @media (max-width: 673px) {
    height: 22rem;
    transform: translateY(calc(50vh - 11rem)) translateX(calc(50vw - 50% - 8px));
  }

  @media (max-width: 582px) {
    width: calc(100vw - 10rem);
  }

  @media (max-width: 481px) {
    height: 26rem;
    transform: translateY(calc(50vh - 13rem)) translateX(calc(50vw - 50% - 8px));
  }
`;

export default ScreenSizeMessage;

import styled from "styled-components";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useRef } from "react";

const HomeBannerComp = ({ type, data, bannerNum, pageNum }) => {
  const theme = useSelector((state) => state.theme);
  const bannerRef = useRef(null);

  return (
    <StyledHomeBanner
      theme={theme}
      ref={bannerRef}
      animate={{
        translateX: `${
          (bannerNum - pageNum) * 100 === 0
            ? `${(bannerNum - pageNum) * 100}rem`
            : `${(bannerNum - pageNum) * 100 + 24}rem` // added 24 to create smooth animation effect
        }`,
        transition: { duration: 1.5 },
      }}
    >
      <Thumbnail
        shadow={type === "album" ? data.album_shadow : data.artist_shadow}
      >
        <motion.img
          src={type === "album" ? data.album_photo : data.artist_photo}
          alt="record thumbnail"
        />
      </Thumbnail>

      <Banner>
        <Titles>
          <motion.h2>
            {type === "album" ? data.album_name : data.artist_name}
          </motion.h2>
          <motion.h3>{type === "album" ? data.artist_name : ""}</motion.h3>
        </Titles>
      </Banner>

      <motion.img
        className="background-img"
        src={type === "album" ? data.album_cover : data.artist_cover}
        alt={"album background"}
      />
    </StyledHomeBanner>
  );
};

const StyledHomeBanner = styled(motion.div)`
  width: calc(100vw - 42rem);
  height: 100%;
  position: absolute;
  display: flex;
  background: ${(props) => (props.theme === "light" ? "white" : "#121212")};

  @media (max-width: 1480px) {
    width: calc(100vw - 10rem);
  }

  @media (max-width: 1299px) {
    width: calc(100vw - 20rem);
  }

  @media (max-width: 1100px) {
    width: calc(100vw - 10rem);
  }

  @media (max-width: 950px) {
    width: calc(100vw - 5rem);
  }

  @media (max-width: 820px) {
    width: calc(100vw + 5rem);
  }
`;

const Thumbnail = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1/1;
  z-index: 1000;

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

const Banner = styled(motion.div)`
  display: flex;
  margin-left: 4rem;
  position: relative;
`;

const Titles = styled(motion.div)`
  pointer-events: none;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40rem;
  transform: translateX(-4.4rem);
  margin-left: 4rem;
  z-index: 1;

  h2 {
    font-size: 2.6rem;
    font-weight: 600;
    margin-bottom: 1rem;
    letter-spacing: 0.2px;

    @media (max-width: 967px) {
      width: calc(100vw - 60rem);
      font-size: 2.3rem;
    }

    @media (max-width: 870px) {
      font-size: 2rem;
    }
  }

  h3 {
    font-size: 1.8rem;
    font-weight: 500;

    @media (max-width: 967px) {
      width: calc(100vw - 60rem);
    }

    @media (max-width: 870px) {
      font-size: 1.65rem;
    }
  }
`;

export default HomeBannerComp;

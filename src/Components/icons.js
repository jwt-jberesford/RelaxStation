import { useSelector } from "react-redux";

export const HomeIcon = ({
  pathname,
  theme,
  hoverState,
  newLocationAnimState,
}) => {
  const animationState = useSelector((state) => state.animations);

  return (
    <svg
      width="24"
      height="22"
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        d="M21 12V22H15V16H9V22H3V12H0L12 0L24 12H21ZM20 6.093V1H17V3.093L20 6.093Z"
        fill={
          pathname === "/home" || hoverState || newLocationAnimState === "/home"
            ? "#3ca8c9"
            : theme === "light"
            ? "#898989"
            : "white"
        }
      />
    </svg>
  );
};

export const ArtistsIcon = ({
  pathname,
  theme,
  hoverState,
  newLocationAnimState,
}) => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="28"
      height="20"
      viewBox="0 0 28 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        d="M12.644 15.08C15.51 14.418 17.183 13.839 15.89 11.398C11.958 3.971 14.848 0 19.001 0C23.236 0 26.055 4.124 22.111 11.398C20.779 13.853 22.548 14.432 25.353 15.08C27.836 15.654 28 16.867 28 18.969V20H10C10 17.255 9.78 15.742 12.644 15.08ZM0 20H7.809C7.774 11.823 11.245 14.687 11.245 8.873C11.245 6.362 9.606 5 7.497 5C4.382 5 2.215 7.979 5.164 13.549C6.133 15.379 4.133 15.814 1.983 16.31C0.121 16.74 0 17.65 0 19.227V20V20Z"
        fill={
          pathname === "/artists" ||
          hoverState ||
          newLocationAnimState === "/artists"
            ? "#3ca8c9"
            : theme === "light"
            ? "#898989"
            : "white"
        }
      />
    </svg>
  );
};

export const AlbumsIcon = ({
  pathname,
  theme,
  hoverState,
  newLocationAnimState,
}) => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        d="M21.698 10.658L24 12L11.998 19L0 12L2.301 10.658L11.998 16.316L21.698 10.658V10.658ZM11.998 21.315L2.301 15.657L0 17L11.998 24L24 17L21.698 15.658L11.998 21.315ZM24 7L11.998 0L0 7L11.998 14L24 7Z"
        fill={
          pathname === "/albums" ||
          hoverState ||
          newLocationAnimState === "/albums"
            ? "#3ca8c9"
            : theme === "light"
            ? "#898989"
            : "white"
        }
      />
    </svg>
  );
};

export const LateNightIcon = ({
  pathname,
  theme,
  hoverState,
  newLocationAnimState,
}) => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="24"
      height="20"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        d="M11 4.999C13.395 5.73 15.27 7.606 15.999 10C16.732 7.605 18.607 5.731 21 5C18.607 4.269 16.732 2.395 15.999 0C15.27 2.394 13.395 4.268 11 4.999ZM18 11.999C19.437 12.437 20.562 13.563 20.999 15C21.439 13.563 22.564 12.438 24 12C22.564 11.561 21.439 10.437 20.999 9C20.562 10.436 19.437 11.561 18 11.999V11.999ZM12 17.5C13.198 17.865 14.135 18.803 14.499 20C14.865 18.802 15.803 17.865 17 17.5C15.803 17.134 14.866 16.198 14.499 15C14.135 16.197 13.198 17.134 12 17.5ZM5.999 5C5.124 7.873 2.871 10.125 0 11.001C2.876 11.881 5.124 14.129 6.004 17.005C6.879 14.131 9.132 11.881 12 11.001C9.132 10.127 6.879 7.874 5.999 5V5Z"
        fill={
          pathname === "/playlists/late_night" ||
          hoverState ||
          newLocationAnimState === "/late night" ||
          newLocationAnimState === "/playlists/late_night"
            ? "#3ca8c9"
            : theme === "light"
            ? "#898989"
            : "white"
        }
      />
    </svg>
  );
};

export const StudyingIcon = ({
  pathname,
  theme,
  hoverState,
  newLocationAnimState,
}) => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="26"
      height="20"
      viewBox="0 0 26 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        d="M21 10.875V15.943C21 18.697 15.211 20 12 20C8.948 20 3 18.608 3 15.943V9.649L12 14.512L21 10.875V10.875ZM12.917 0L0 5.75L12 12.25L23 7.833V15H25V6.75L12.917 0ZM26 20H22C22.578 19 23 17.5 23 16H25C25 17.516 25.391 18.859 26 20Z"
        fill={
          pathname === "/playlists/studying" ||
          hoverState ||
          newLocationAnimState === "/studying" ||
          newLocationAnimState === "/playlists/studying"
            ? "#3ca8c9"
            : theme === "light"
            ? "#898989"
            : "white"
        }
      />
    </svg>
  );
};

export const DrivingIcon = ({
  pathname,
  theme,
  hoverState,
  newLocationAnimState,
}) => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="24"
      height="13"
      viewBox="0 0 24 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        d="M21.739 4.921C20.392 4.531 19.854 4.383 18.187 4C18.187 4 15.808 1.641 15.355 1.184C14.787 0.612 14.312 0 12.406 0H4.512C4.001 0 3.776 0.547 4.442 1C3.7 1.602 2.823 2.38 2.184 3.027C0.749 4.482 0 5.412 0 7.282C0 9.042 1.042 11 3.174 11H3.184C3.597 12.162 4.696 13 6 13C7.304 13 8.403 12.162 8.816 11H15.183C15.596 12.162 16.695 13 17.999 13C19.303 13 20.402 12.162 20.815 11H21.5C23.494 11 24 9.224 24 7.835C24 5.794 22.877 5.251 21.739 4.921V4.921ZM6 11.2C5.338 11.2 4.8 10.662 4.8 10C4.8 9.338 5.338 8.8 6 8.8C6.662 8.8 7.2 9.338 7.2 10C7.2 10.662 6.662 11.2 6 11.2ZM9.576 5C8.505 5 6.076 4.894 4.357 4.25C4.935 3.5 5.355 3.028 5.627 2.714C5.945 2.346 6.5 2 7.188 2H9.576V5ZM10.576 2H12.411C13.293 2 13.839 2.493 14.433 3.105C14.885 3.571 16.165 5 16.165 5H10.577V2H10.576ZM18 11.2C17.338 11.2 16.8 10.662 16.8 10C16.8 9.338 17.338 8.8 18 8.8C18.662 8.8 19.2 9.338 19.2 10C19.2 10.662 18.662 11.2 18 11.2Z"
        fill={
          pathname === "/playlists/driving" ||
          hoverState ||
          newLocationAnimState === "/driving" ||
          newLocationAnimState === "/playlists/driving"
            ? "#3ca8c9"
            : theme === "light"
            ? "#898989"
            : "white"
        }
      />
    </svg>
  );
};

export const AmbienceIcon = ({
  pathname,
  theme,
  hoverState,
  newLocationAnimState,
}) => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="24"
      height="14"
      viewBox="0 0 24 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 14V7C24 6.735 23.895 6.48 23.707 6.293C23.52 6.105 23.265 6 23 6H1C0.735 6 0.48 6.105 0.293 6.293C0.105 6.48 0 6.735 0 7V14H1V12H23V14H24ZM5 5V4C5 3.448 5.448 3 6 3H10C10.552 3 11 3.448 11 4V5H13V4C13 3.448 13.448 3 14 3H18C18.552 3 19 3.448 19 4V5H22V1C22 0.735 21.895 0.48 21.707 0.293C21.52 0.105 21.265 0 21 0H3C2.735 0 2.48 0.105 2.293 0.293C2.105 0.48 2 0.735 2 1V5H5Z"
        fill={
          pathname === "/playlists/ambience" ||
          hoverState ||
          newLocationAnimState === "/ambience" ||
          newLocationAnimState === "/playlists/ambience"
            ? "#3ca8c9"
            : theme === "light"
            ? "#898989"
            : "white"
        }
      />
    </svg>
  );
};

// Right bar icons
export const RecentlyPlayedIcon = ({ rightBarState, theme, hoverState }) => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="63"
      height="63"
      viewBox="0 0 63 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.0351562 31.4828C0.0351562 14.1673 14.2024 0 31.518 0C48.8336 0 63.0009 14.1673 63.0009 31.4828C63.0009 48.7984 48.8336 62.9657 31.518 62.9657C14.2024 62.9657 0.0351562 48.7984 0.0351562 31.4828ZM29.8506 35.5442L42.6956 43.4464C43.829 44.139 45.3087 43.7927 46.0013 42.6908C46.6939 41.5574 46.3161 40.0777 45.1827 39.3851L33.0933 32.1125V18.1027C33.0933 16.8119 32.0229 15.7415 30.7321 15.7415C29.4413 15.7415 28.3709 16.8119 28.3394 18.1027V32.8681C28.3394 33.97 28.9061 34.9775 29.8506 35.5442Z"
        fill={
          rightBarState === "recently_played" || hoverState
            ? "#3ca8c9"
            : theme === "light"
            ? "#898989"
            : "white"
        }
      />
    </svg>
  );
};

export const SettingsIcon = ({ rightBarState, theme, hoverState }) => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="62"
      height="63"
      viewBox="0 0 62 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M54.2429 31.4828C54.2429 32.5533 54.1484 33.5607 54.0225 34.5682L60.6653 39.7628C61.2635 40.2351 61.4209 41.0851 61.0431 41.7777L54.7466 52.6708C54.3688 53.3634 53.5502 53.6468 52.8261 53.3634L44.9869 50.2151C43.3498 51.443 41.5867 52.5134 39.6663 53.3005L38.4699 61.6434C38.3755 62.399 37.7144 62.9657 36.9273 62.9657H24.3341C23.5471 62.9657 22.8859 62.399 22.7915 61.6434L21.5951 53.3005C19.6747 52.5134 17.9116 51.4745 16.2745 50.2151L8.4353 53.3634C7.74268 53.6153 6.89264 53.3634 6.51485 52.6708L0.218276 41.7777C-0.159519 41.0851 -0.00210429 40.2351 0.59607 39.7628L7.23895 34.5682C7.11302 33.5607 7.01857 32.5218 7.01857 31.4828C7.01857 30.4439 7.11302 29.405 7.23895 28.3975L0.59607 23.2029C-0.00210429 22.7306 -0.191001 21.8806 0.218276 21.188L6.51485 10.2949C6.89264 9.60227 7.71119 9.31892 8.4353 9.60227L16.2745 12.7506C17.9116 11.5227 19.6747 10.4523 21.5951 9.66523L22.7915 1.32228C22.8859 0.566691 23.5471 0 24.3341 0H36.9273C37.7144 0 38.3755 0.566691 38.4699 1.32228L39.6663 9.66523C41.5867 10.4523 43.3498 11.4912 44.9869 12.7506L52.8261 9.60227C53.5187 9.35041 54.3688 9.60227 54.7466 10.2949L61.0431 21.188C61.4209 21.8806 61.2635 22.7306 60.6653 23.2029L54.0225 28.3975C54.1484 29.405 54.2429 30.4124 54.2429 31.4828ZM19.6118 31.4829C19.6118 37.5591 24.5546 42.5019 30.6308 42.5019C36.707 42.5019 41.6498 37.5591 41.6498 31.4829C41.6498 25.4067 36.707 20.4639 30.6308 20.4639C24.5546 20.4639 19.6118 25.4067 19.6118 31.4829Z"
        fill={
          rightBarState === "settings" || hoverState
            ? "#3ca8c9"
            : theme === "light"
            ? "#898989"
            : "white"
        }
      />
    </svg>
  );
};

export const QuitIcon = ({ theme, hoverState }) => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="74"
      height="74"
      viewBox="0 0 74 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={{
          transition: `${animationState ? "all .5s ease" : "none"}`,
        }}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 36.9177C0 16.5022 16.5022 0 36.9177 0C57.3332 0 73.8354 16.5022 73.8354 36.9177C73.8354 57.3332 57.3332 73.8354 36.9177 73.8354C16.5022 73.8354 0 57.3332 0 36.9177ZM47.5871 52.7924C49.0269 54.2322 51.3527 54.2322 52.7925 52.7924C54.1954 51.3526 54.1954 48.9898 52.7925 47.587L42.1233 36.9178L52.7925 26.2485C54.2323 24.8087 54.2323 22.4829 52.7925 21.0431C51.3527 19.6034 49.0269 19.6034 47.5871 21.0431L36.9179 31.7124L26.2487 21.0431C24.8089 19.6034 22.4831 19.6034 21.0433 21.0431C20.352 21.7329 19.9635 22.6693 19.9635 23.6458C19.9635 24.6224 20.352 25.5588 21.0433 26.2485L31.7125 36.9178L21.0433 47.587C20.352 48.2767 19.9635 49.2131 19.9635 50.1897C19.9635 51.1662 20.352 52.1026 21.0433 52.7924C22.4831 54.2322 24.8089 54.2322 26.2487 52.7924L36.9179 42.1231L47.5871 52.7924Z"
        fill={hoverState ? "#3ca8c9" : theme === "light" ? "#898989" : "white"}
      />
    </svg>
  );
};

export const MoonIcon = ({ theme, hoverState }) => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        d="M0 10C0 15.5225 4.4775 20 10 20C15.5225 20 20 15.5225 20 10C20 4.4775 15.5225 0 10 0C4.4775 0 0 4.4775 0 10ZM1.66667 10C1.66667 5.59 5.09417 1.99 9.42917 1.69583C6.75833 3.49083 5 6.54 5 10C5 13.46 6.75833 16.5092 9.42917 18.3042C5.09417 18.01 1.66667 14.41 1.66667 10Z"
        fill={theme === "dark" || hoverState ? "#3ca8c9" : "#898989"}
      />
    </svg>
  );
};

export const SunIcon = ({ theme, hoverState }) => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        d="M3.72992 11.9167H0V10.0833H3.72992C3.69233 10.384 3.66667 10.6893 3.66667 11C3.66667 11.3108 3.69233 11.616 3.72992 11.9167ZM6.51108 5.214L3.87017 2.57308L2.574 3.86925L5.21492 6.51017C5.59167 6.02525 6.02617 5.59075 6.51108 5.214V5.214ZM16.786 6.51017L19.4269 3.86925L18.1307 2.57308L15.4898 5.214C15.9738 5.59075 16.4083 6.02617 16.786 6.51017V6.51017ZM11 3.66667C11.3108 3.66667 11.616 3.69233 11.9167 3.72992V0H10.0833V3.72992C10.384 3.69233 10.6893 3.66667 11 3.66667V3.66667ZM11 18.3333C10.6893 18.3333 10.384 18.3077 10.0833 18.2701V22H11.9167V18.2701C11.616 18.3077 11.3108 18.3333 11 18.3333ZM18.2701 10.0833C18.3077 10.384 18.3333 10.6893 18.3333 11C18.3333 11.3108 18.3077 11.616 18.2701 11.9167H22V10.0833H18.2701ZM15.4898 16.786L18.1298 19.426L19.4269 18.1298L16.7869 15.4898C16.4092 15.9738 15.9748 16.4083 15.4898 16.786ZM5.214 15.4889L2.574 18.1289L3.87017 19.4251L6.51017 16.7851C6.02617 16.4083 5.59075 15.9738 5.214 15.4889ZM11 5.5C7.96217 5.5 5.5 7.96217 5.5 11C5.5 14.0378 7.96217 16.5 11 16.5C14.0378 16.5 16.5 14.0378 16.5 11C16.5 7.96217 14.0378 5.5 11 5.5V5.5Z"
        fill={theme === "light" || hoverState ? "#3ca8c9" : "white"}
      />
    </svg>
  );
};

export const BulletPointIcon = ({ theme, state, value, hoverState }) => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        d="M11 0C4.92892 0 0 4.92892 0 11C0 17.0711 4.92892 22 11 22C17.0711 22 22 17.0711 22 11C22 4.92892 17.0711 0 11 0ZM11 19.25C5.94092 19.25 2.75 16.06 2.75 11C2.75 5.94092 5.94092 2.75 11 2.75C16.06 2.75 19.25 5.94092 19.25 11C19.25 16.06 16.06 19.25 11 19.25Z"
        fill={
          state === value || hoverState
            ? "#3ca8c9"
            : theme === "light"
            ? "#898989"
            : "white"
        }
      />
    </svg>
  );
};

export const BurgerIcon = ({ theme, hoverState }) => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="21"
      height="19"
      viewBox="0 0 21 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 19H0V16H21V19ZM21 11H0V8H21V11ZM21 3.02184H0V0H21V3.02184Z"
        fill={hoverState ? "#3ca8c9" : theme === "light" ? "#898989" : "white"}
      />
    </svg>
  );
};

export const MagnifyingGlassIcon = ({ theme }) => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="63"
      height="63"
      viewBox="0 0 63 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.7046 40.6118H16.7881L1.13496 56.3387C-0.37867 57.8524 -0.37867 60.3258 1.13496 61.8395C2.64858 63.3531 5.12207 63.3531 6.63569 61.8395L22.3257 46.1494V43.2329L23.3225 42.1992C28.491 46.6294 35.5423 48.9183 43.0365 47.6631C53.2997 45.9279 61.4954 37.363 62.7506 27.0261C64.6703 11.4099 51.5276 -1.73282 35.9114 0.186898C25.5745 1.4421 17.0096 9.63783 15.2744 19.901C14.0192 27.3952 16.3081 34.4465 20.7383 39.615L19.7046 40.6118ZM55.5524 23.9989C55.5524 33.1914 48.1319 40.6119 38.9394 40.6119C29.7469 40.6119 22.3264 33.1914 22.3264 23.9989C22.3264 14.8064 29.7469 7.38592 38.9394 7.38592C48.1319 7.38592 55.5524 14.8064 55.5524 23.9989Z"
        fill={theme === "light" ? "#bababa" : "#6c6c6c"}
      />
    </svg>
  );
};

export const ArrowNextIcon = ({ theme, currentPage, pageCount }) => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="31"
      height="54"
      viewBox="0 0 31 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        d="M1.06427 52.9424C2.47844 54.3525 4.75843 54.3525 6.1726 52.9424L30.1558 29.0288C31.2814 27.9065 31.2814 26.0935 30.1558 24.9712L6.1726 1.05755C4.75843 -0.352518 2.47844 -0.352518 1.06427 1.05755C-0.349908 2.46763 -0.349908 4.74101 1.06427 6.15108L21.9594 27.0144L1.0354 47.8777C-0.349908 49.259 -0.349908 51.5612 1.06427 52.9424Z"
        fill={
          theme === "light"
            ? currentPage !== pageCount
              ? "#929292"
              : "rgba(146, 146, 146, 0.31)"
            : currentPage !== pageCount
            ? " rgba(255, 255, 255, 0.75)"
            : "rgba(255, 255, 255, 0.25)"
        }
      />
    </svg>
  );
};

export const ArrowPrevIcon = ({ theme, currentPage }) => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="31"
      height="54"
      viewBox="0 0 31 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        d="M29.9357 52.9424C28.5216 54.3525 26.2416 54.3525 24.8274 52.9424L0.844174 29.0288C-0.281392 27.9065 -0.281392 26.0935 0.844174 24.9712L24.8274 1.05755C26.2416 -0.352518 28.5216 -0.352518 29.9357 1.05755C31.3499 2.46763 31.3499 4.74101 29.9357 6.15108L9.04061 27.0144L29.9646 47.8777C31.3499 49.259 31.3499 51.5612 29.9357 52.9424Z"
        fill={
          theme === "light"
            ? currentPage !== 1
              ? "#929292"
              : "rgba(146, 146, 146, 0.31)"
            : currentPage !== 1
            ? " rgba(255, 255, 255, 0.75)"
            : "rgba(255, 255, 255, 0.25)"
        }
      />
    </svg>
  );
};

export const PointedArrow = () => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="78"
      height="78"
      viewBox="0 0 78 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        d="M5.00561 33.8856H60.9183L36.4909 8.80224C34.5387 6.79763 34.5387 3.508 36.4909 1.50339C37.4261 0.540901 38.6958 0 40.0199 0C41.344 0 42.6136 0.540901 43.5489 1.50339L76.5359 35.3762C78.488 37.3808 78.488 40.6191 76.5359 42.6237L43.5489 76.4965C41.5967 78.5011 38.4431 78.5011 36.4909 76.4965C34.5387 74.4919 34.5387 71.2537 36.4909 69.2491L60.9183 44.1657H5.00561C2.25253 44.1657 -1.68104e-06 41.8527 -1.68104e-06 39.0257C-1.68104e-06 36.1986 2.25253 33.8856 5.00561 33.8856Z"
        fill="#3ca8c9"
      />
    </svg>
  );
};

export const ThumbnailPlay = () => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 10.375C0 4.648 4.648 0 10.375 0C16.102 0 20.75 4.648 20.75 10.375C20.75 16.102 16.102 20.75 10.375 20.75C4.648 20.75 0 16.102 0 10.375ZM8.3 6.74372V14.0062C8.3 14.4316 8.78763 14.6806 9.13 14.4212L13.9751 10.79C14.2553 10.5825 14.2553 10.1675 13.9751 9.95997L9.13 6.32872C8.78763 6.06935 8.3 6.31835 8.3 6.74372Z"
        fill="white"
      />
    </svg>
  );
};

export const PointedArrowFlipped = () => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="41"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        d="M38.3688 17.8117H8.97882L21.8189 4.62682C22.845 3.57311 22.845 1.84395 21.8189 0.790242C21.3273 0.28432 20.6599 0 19.9639 0C19.2679 0 18.6005 0.28432 18.1089 0.790242L0.769613 18.5952C-0.256538 19.6489 -0.256538 21.3511 0.769613 22.4048L18.1089 40.2097C19.1351 41.2634 20.7927 41.2634 21.8189 40.2097C22.845 39.156 22.845 37.4539 21.8189 36.4002L8.97882 23.2153H38.3688C39.816 23.2153 41 21.9995 41 20.5135C41 19.0275 39.816 17.8117 38.3688 17.8117Z"
        fill="white"
      />
    </svg>
  );
};

export const ExitIcon = () => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="29.9"
        height="3.31822"
        rx="1.65911"
        transform="matrix(-0.710185 -0.704015 -0.704015 0.710185 23.5742 21.6443)"
        fill="white"
      />
      <rect
        x="0.226562"
        y="21.8678"
        width="29.9"
        height="3.31578"
        rx="1.65789"
        transform="rotate(-44.75 0.226562 21.8678)"
        fill="white"
      />
    </svg>
  );
};

// Player bar icons
export const PauseIcon = () => {
  return (
    <svg
      width="53"
      height="53"
      viewBox="0 0 53 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.1354 0C11.7087 0 0 11.7087 0 26.1354C0 40.5621 11.7087 52.2708 26.1354 52.2708C40.5621 52.2708 52.2708 40.5621 52.2708 26.1354C52.2708 11.7087 40.5621 0 26.1354 0ZM20.908 36.5896C19.4705 36.5896 18.2944 35.4135 18.2944 33.976V18.2948C18.2944 16.8573 19.4705 15.6812 20.908 15.6812C22.3454 15.6812 23.5215 16.8573 23.5215 18.2948V33.976C23.5215 35.4135 22.3454 36.5896 20.908 36.5896ZM28.7493 33.976C28.7493 35.4135 29.9254 36.5896 31.3628 36.5896C32.8003 36.5896 33.9764 35.4135 33.9764 33.976V18.2948C33.9764 16.8573 32.8003 15.6812 31.3628 15.6812C29.9254 15.6812 28.7493 16.8573 28.7493 18.2948V33.976Z"
        fill="white"
      />
    </svg>
  );
};

export const PlayIcon = () => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="53"
      height="53"
      viewBox="0 0 53 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.488281 26.1354C0.488281 11.7087 12.1969 0 26.6237 0C41.0504 0 52.7591 11.7087 52.7591 26.1354C52.7591 40.5621 41.0504 52.2708 26.6237 52.2708C12.1969 52.2708 0.488281 40.5621 0.488281 26.1354ZM23.4878 15.9426C22.6253 15.2892 21.397 15.9165 21.397 16.988V35.2828C21.397 36.3543 22.6253 36.9816 23.4878 36.3282L35.693 27.1808C36.3987 26.6581 36.3987 25.6127 35.693 25.09L23.4878 15.9426Z"
        fill="white"
      />
    </svg>
  );
};

export const RepeatIcon = () => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="60"
      height="77"
      viewBox="0 0 60 77"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.6541 2.15599V8.76426C45.9717 8.76426 59.1882 21.9808 59.1882 38.2984C59.1882 42.1379 58.4499 45.8296 57.0839 49.1891C56.0871 51.6626 52.9122 52.3272 51.0294 50.4444C50.0326 49.4476 49.6265 47.9339 50.1803 46.6049C51.2509 44.0576 51.8047 41.2149 51.8047 38.2984C51.8047 26.0787 41.8738 16.1478 29.6541 16.1478V22.7561C29.6541 24.4174 27.6605 25.2296 26.4791 24.0851L16.1791 13.7851C15.4407 13.0467 15.4407 11.9023 16.1791 11.1639L26.5161 0.863874C27.6605 -0.317493 29.6541 0.494697 29.6541 2.15599ZM7.50268 38.2983C7.50268 50.5181 17.4335 60.4489 29.6533 60.4489V53.8407C29.6533 52.1794 31.6469 51.3672 32.7913 52.5116L43.0914 62.8117C43.8297 63.55 43.8297 64.6945 43.0914 65.4328L32.7913 75.7329C31.6469 76.9142 29.6533 76.102 29.6533 74.4407V67.8325C13.3357 67.8325 0.119141 54.6159 0.119141 38.2983C0.119141 34.4589 0.857495 30.7671 2.22345 27.4076C3.22023 24.9341 6.39515 24.2696 8.27795 26.1524C9.27473 27.1492 9.68083 28.6628 9.12706 29.9918C8.05645 32.5392 7.50268 35.3818 7.50268 38.2983Z"
        fill="white"
      />
    </svg>
  );
};

export const SkipForwardIcon = () => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.7718 29.203V3.06764C26.7718 1.63019 27.9478 0.454102 29.3853 0.454102C30.8227 0.454102 31.9988 1.63019 31.9988 3.06764V29.203C31.9988 30.6405 30.8227 31.8166 29.3853 31.8166C27.9478 31.8166 26.7718 30.6405 26.7718 29.203ZM19.8462 18.2785L4.76611 28.9156C3.01504 30.1178 0.636719 28.8894 0.636719 26.7725V5.49825C0.636719 3.38128 3.01504 2.15291 4.76611 3.35514L19.8462 14.0184C21.3098 15.0377 21.3098 17.233 19.8462 18.2785Z"
        fill="white"
      />
    </svg>
  );
};

export const SkipBackwardIcon = () => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.09739 29.203V3.06764C6.09739 1.63019 4.9213 0.454102 3.48385 0.454102C2.0464 0.454102 0.87031 1.63019 0.87031 3.06764V29.203C0.87031 30.6405 2.0464 31.8166 3.48385 31.8166C4.9213 31.8166 6.09739 30.6405 6.09739 29.203ZM13.0229 18.2785L28.103 28.9156C29.8541 30.1178 32.2324 28.8894 32.2324 26.7725V5.49825C32.2324 3.38128 29.8541 2.15291 28.103 3.35514L13.0229 14.0184C11.5593 15.0377 11.5593 17.233 13.0229 18.2785Z"
        fill="white"
      />
    </svg>
  );
};

export const VolumeEmptyIcon = () => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="42"
      height="62"
      viewBox="0 0 42 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        d="M0 21.4387V40.1054C0 42.6721 2.1 44.7721 4.66667 44.7721H18.6667L34.02 60.1254C36.96 63.0654 42 60.9654 42 56.8121V4.68539C42 0.532054 36.96 -1.56795 34.02 1.37205L18.6667 16.7721H4.66667C2.1 16.7721 0 18.8721 0 21.4387Z"
        fill="white"
      />
    </svg>
  );
};

export const VolumeFullIcon = () => {
  const animationState = useSelector((state) => state.animations);
  return (
    <svg
      width="84"
      height="79"
      viewBox="0 0 84 79"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={animationState ? { transition: "all 0.5s ease" } : {}}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M51.3333 5.18477V4.25144C51.3333 1.31144 54.2733 -0.788562 56.98 0.284772C72.8 6.30477 84 21.5648 84 39.4848C84 57.4048 72.8 72.6648 56.98 78.6848C54.2733 79.7114 51.3333 77.6581 51.3333 74.7181V73.7848C51.3333 72.0114 52.4533 70.4714 54.1333 69.8181C66.1733 65.0114 74.6667 53.2048 74.6667 39.4848C74.6667 25.7648 66.1733 13.9581 54.1333 9.15144C52.5 8.49811 51.3333 6.9581 51.3333 5.18477ZM0 30.1514V48.8181C0 51.3847 2.1 53.4847 4.66667 53.4847H18.6667L34.02 68.8381C36.96 71.7781 42 69.6781 42 65.5247V13.3981C42 9.24475 36.96 7.14475 34.02 10.0847L18.6667 25.4847H4.66667C2.1 25.4847 0 27.5847 0 30.1514ZM63 39.4848C63 31.2248 58.24 24.1315 51.3333 20.6781V58.2448C58.24 54.8381 63 47.7448 63 39.4848Z"
        fill="white"
      />
    </svg>
  );
};

export const VolumeLowIcon = () => {
  return (
    <svg
      width="63"
      height="62"
      viewBox="0 0 63 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M63.0007 30.772C63.0007 22.512 58.2407 15.4187 51.334 11.9653V49.532C58.2407 46.1253 63.0007 39.032 63.0007 30.772Z"
        fill="white"
      />
      <path
        d="M0 21.4387V40.1054C0 42.6721 2.1 44.7721 4.66667 44.7721H18.6667L34.02 60.1254C36.96 63.0654 42 60.9654 42 56.8121V4.68539C42 0.532054 36.96 -1.56795 34.02 1.37205L18.6667 16.7721H4.66667C2.1 16.7721 0 18.8721 0 21.4387Z"
        fill="white"
      />
    </svg>
  );
};

export const VolumeMuteIcon = () => {
  return (
    <svg
      width="81"
      height="62"
      viewBox="0 0 81 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 21.4387V40.1054C0 42.6721 2.1 44.7721 4.66667 44.7721H18.6667L34.02 60.1254C36.96 63.0654 42 60.9654 42 56.8121V4.68539C42 0.532054 36.96 -1.56795 34.02 1.37205L18.6667 16.7721H4.66667C2.1 16.7721 0 18.8721 0 21.4387Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M77.171 16.653C76.3025 15.7823 74.8886 15.7823 74.0201 16.653L66.1532 24.4861L58.2803 16.653C57.4118 15.7823 56.0039 15.7823 55.1294 16.653L51.9815 19.7874C51.113 20.6521 51.113 22.06 51.9815 22.9248L59.8483 30.7579L51.9815 38.5969C51.1189 39.4617 51.1189 40.8636 51.9815 41.7343L55.1294 44.8687C56.0039 45.7335 57.4118 45.7335 58.2803 44.8687L66.1532 37.0356L74.0201 44.8687C74.8886 45.7335 76.3025 45.7335 77.171 44.8687L80.3189 41.7343C81.1934 40.8636 81.1934 39.4617 80.3189 38.5969L72.452 30.7579L80.3189 22.9248C81.1934 22.06 81.1934 20.6521 80.3189 19.7874L77.171 16.653Z"
        fill="white"
      />
    </svg>
  );
};

export const RpPlayIcon = ({ theme, activeSelection }) => {
  return (
    <svg
      width="19"
      height="24"
      viewBox="0 0 19 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 1.94403V22.056C0 23.5896 1.62937 24.5214 2.88418 23.6867L18.1291 13.6307C19.2903 12.8736 19.2903 11.1264 18.1291 10.3499L2.88418 0.313336C1.62937 -0.521426 0 0.410401 0 1.94403Z"
        fill={
          activeSelection ? "#3ca8c9" : theme === "light" ? "#898989" : "white"
        }
      />
    </svg>
  );
};

export const RpPauseIcon = ({ theme, activeSelection }) => {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 12C4 13.1 3.1 14 2 14C0.9 14 0 13.1 0 12V2C0 0.9 0.9 0 2 0C3.1 0 4 0.9 4 2V12ZM8 12V2C8 0.9 8.9 0 10 0C11.1 0 12 0.9 12 2V12C12 13.1 11.1 14 10 14C8.9 14 8 13.1 8 12Z"
        fill={
          activeSelection ? "#3ca8c9" : theme === "light" ? "#898989" : "white"
        }
      />
    </svg>
  );
};

export const ThumbnailPause = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 14C7.45 14 7 13.55 7 13V7C7 6.45 7.45 6 8 6C8.55 6 9 6.45 9 7V13C9 13.55 8.55 14 8 14ZM11 13C11 13.55 11.45 14 12 14C12.55 14 13 13.55 13 13V7C13 6.45 12.55 6 12 6C11.45 6 11 6.45 11 7V13Z"
        fill="white"
      />
    </svg>
  );
};

export const SelectionArrowNextIcon = () => {
  return (
    <svg
      width="31"
      height="54"
      viewBox="0 0 31 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.06427 52.9424C2.47844 54.3525 4.75843 54.3525 6.1726 52.9424L30.1558 29.0288C31.2814 27.9065 31.2814 26.0935 30.1558 24.9712L6.1726 1.05755C4.75843 -0.352518 2.47844 -0.352518 1.06427 1.05755C-0.349908 2.46763 -0.349908 4.74101 1.06427 6.15108L21.9594 27.0144L1.0354 47.8777C-0.349908 49.259 -0.349908 51.5612 1.06427 52.9424Z"
        fill={" rgba(255, 255, 255, 0.75)"}
      />
    </svg>
  );
};

export const SelectionArrowPrevIcon = () => {
  return (
    <svg
      width="31"
      height="54"
      viewBox="0 0 31 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.9357 52.9424C28.5216 54.3525 26.2416 54.3525 24.8274 52.9424L0.844174 29.0288C-0.281392 27.9065 -0.281392 26.0935 0.844174 24.9712L24.8274 1.05755C26.2416 -0.352518 28.5216 -0.352518 29.9357 1.05755C31.3499 2.46763 31.3499 4.74101 29.9357 6.15108L9.04061 27.0144L29.9646 47.8777C31.3499 49.259 31.3499 51.5612 29.9357 52.9424Z"
        fill={" rgba(255, 255, 255, 0.75)"}
      />
    </svg>
  );
};

export const FilmReelIcon = ({
  value,
  theme,
  state,
  hoverState,
  animationState,
}) => {
  return (
    <svg
      width="61"
      height="51"
      viewBox="0 0 61 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M56.7918 28.8092C54.5842 36.3979 48.7893 42.4688 41.3386 45.0213C52.1696 36.1909 53.6874 20.2548 44.857 9.42378C36.0266 -1.40725 20.0215 -2.92498 9.25945 5.9744C-1.50259 14.8738 -3.15829 30.7409 5.74109 41.5719C10.5702 47.4359 17.7449 50.8162 25.3335 50.8162H33.4051C46.2367 50.7473 57.4127 42.3308 61 30.051L56.7918 28.8092ZM25.3335 7.69909C28.7829 7.69909 31.5424 10.4586 31.5424 13.908C31.5424 17.3573 28.7829 20.1168 25.3335 20.1168C21.8842 20.1168 19.1247 17.3573 19.1247 13.908C19.1247 10.5276 21.8842 7.69909 25.3335 7.69909ZM13.8816 31.6377C10.4322 31.6377 7.67274 28.9472 7.60375 25.4978C7.60375 22.0485 10.2943 19.289 13.7436 19.22C17.193 19.22 19.9525 21.9105 20.0215 25.3599V25.4289C20.0215 28.8092 17.262 31.5687 13.8816 31.6377ZM25.3335 43.0896C21.8842 43.0896 19.1247 40.3301 19.1247 36.8808C19.1247 33.4314 21.8842 30.6719 25.3335 30.6719C28.7829 30.6719 31.5424 33.4314 31.5424 36.8808C31.5424 40.3301 28.7829 43.0896 25.3335 43.0896ZM36.8544 31.6377H36.7854C33.4051 31.5687 30.6456 28.8092 30.6456 25.4289C30.6456 21.9795 33.4051 19.22 36.8544 19.22C40.3038 19.22 43.0633 21.9795 43.0633 25.4289C43.0633 28.8782 40.3038 31.6377 36.8544 31.6377Z"
        fill={
          value === state || hoverState
            ? "#3ca8c9"
            : theme === "light"
            ? "#898989"
            : "white"
        }
        style={animationState ? { transition: "all .5s ease" } : {}}
      />
    </svg>
  );
};

export const PointerArrowReturnHome = ({ required }) => {
  return (
    <svg
      width="64"
      height="21"
      viewBox="0 0 64 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M62.3125 11.7246H5.47633L11.9037 18.152C12.4174 18.6657 12.4174 19.5086 11.9037 20.0223C11.3901 20.5359 10.5603 20.5359 10.0466 20.0223L1.367 11.3426C0.853339 10.829 0.853339 9.9992 1.367 9.48554L10.0335 0.792739C10.2795 0.54611 10.6136 0.407509 10.962 0.407509C11.3104 0.407509 11.6445 0.54611 11.8905 0.792739C12.4042 1.3064 12.4042 2.13617 11.8905 2.64984L5.47633 9.09041H62.3125C63.0369 9.09041 63.5 9.7756 63.5 10.5C63.5 11.2244 63.0369 11.7246 62.3125 11.7246Z"
        fill={required ? "rgb(255, 255, 255)" : "rgba(0, 0, 0, 0)"}
        fillOpacity="0.75"
      />
    </svg>
  );
};

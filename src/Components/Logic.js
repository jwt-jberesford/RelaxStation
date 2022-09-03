import { useLayoutEffect, useState } from "react";

const useWindowSize = (fetching = "width") => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize); // remove the event listender to prevent infinite loop
  }, []);

  if (fetching === "width") {
    return width;
  } else {
    return height;
  }
};

export default useWindowSize;

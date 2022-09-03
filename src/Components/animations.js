export const settingsSwipe = {
  hidden: { x: "100%", transition: { ease: "easeOut", duration: 0.75 } },
  show: {
    x: "0%",
    transition: { ease: "easeOut", duration: 0.75 },
  },
};

export const pageAnim = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1, when: "beforeChildren" },
  },
  exit: { opacity: 0, transition: { duration: 1 } },
};

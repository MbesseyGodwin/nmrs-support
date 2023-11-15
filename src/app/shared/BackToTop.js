import React, { useState, useEffect } from "react";

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <button
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Back to top"
          type="button"
          onClick={handleBackToTop}
          className="btn bg-success mx-1"
          style={{ whiteSpace: "nowrap" }}
        >
          <i className="fa-solid fa-turn-up fa-bounce m-0"></i>
        </button>
      )}
    </>
  );
};

export default BackToTop;

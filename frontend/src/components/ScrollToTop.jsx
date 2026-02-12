import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 10);
      }
    } else {
      // when moving between different pages
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", 
      });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
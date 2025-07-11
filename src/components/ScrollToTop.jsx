import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const container = document.querySelector('[style*="overflow-y: auto"]'); // or give it a specific ID/class
    if (container) {
      container.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0); // fallback
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;

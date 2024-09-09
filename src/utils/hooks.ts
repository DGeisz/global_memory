import { useEffect, useState } from "react";

export const useRender = () => {
  const setState = useState(0)[1];

  return () => setState((prev) => prev + 1);
};

export const useRenderOnResize = () => {
  const render = useRender();

  useEffect(() => {
    function handleResize() {
      render();
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
};

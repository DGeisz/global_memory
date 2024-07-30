import { useState } from "react";

export const useRender = () => {
  const setState = useState(0)[1];

  return () => setState((prev) => prev + 1);
};

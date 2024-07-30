// import Globe, { GlobeMethods } from "react-globe.gl";
// import { useEffect, useRef, useState } from "react";
// // import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import clsx from "clsx";
// import { useRender } from "../../utils/hooks.ts";

import { LandingBackground } from "./landing_background.tsx";
import clsx from "clsx";

const COLORS = ["red", "lime", "deepskyblue", "yellow", "coral"];

const CrazyFont: React.FC<{ className?: string; children: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={clsx("mario-font", className)}>
      {children.split("").map((char, i) => {
        return (
          <span key={i} style={{ color: COLORS[i % COLORS.length] }}>
            {char}
          </span>
        );
      })}
    </div>
  );
};

export const Landing = () => {
  return (
    <div>
      <LandingBackground />
      <div className={clsx("flex justify-center items-center")}>
        <div className={clsx("max-w-4xl w-full mt-40")}>
          <div
            className={clsx(
              "text-white text-6xl",
              "font-bold text-center",
              "bg-gray-800/40",
              "py-6",
              "rounded-lg",
              "backdrop-blur",
              "mario-font",
            )}
          >
            <CrazyFont className={clsx("text-6xl text-center")}>
              Global Memory
            </CrazyFont>
          </div>
          {/*<div className={clsx("h-[10000px] bg-red-300")}>Helolo</div>*/}
          {/*<div className={clsx("text-white")}>Hello there</div>*/}
        </div>
      </div>
    </div>
  );
};

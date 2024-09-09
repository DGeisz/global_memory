import React from "react";
import clsx from "clsx";
import {
  GlobeBackground,
  GlobePage,
} from "../../components/globe_background.tsx";
import { BLUR_BG } from "../../style/colors.ts";

const COLORS = ["red", "lime", "deepskyblue", "yellow", "darkorange"];

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
  // return (
  //   <GlobePage>
  //     <div
  //       className={clsx(
  //         "text-6xl",
  //         "font-bold text-center",
  //         BLUR_BG,
  //         "py-6",
  //         "rounded-lg",
  //         "mario-font",
  //       )}
  //     >
  //       <CrazyFont className={clsx("text-6xl text-center")}>
  //         Global Memory
  //       </CrazyFont>
  //     </div>
  //     <div className={clsx("flex items-center justify-center", "mt-4")}>
  //       <a
  //         className={clsx(
  //           "bg-white",
  //           "p-1",
  //           "rounded-md",
  //           "text-black",
  //           "font-bold",
  //           "text-lg",
  //         )}
  //         href={"/user/danny/project/chip-war"}
  //       >
  //         Click here!
  //       </a>
  //     </div>
  //   </GlobePage>
  // );

  return (
    <div>
      <GlobeBackground />
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
          <div className={clsx("flex items-center justify-center", "mt-4")}>
            <a
              className={clsx(
                "bg-white",
                "p-1",
                "rounded-md",
                "text-black",
                "font-bold",
                "text-lg",
              )}
              href={"/user/danny/project/chip-war"}
            >
              Click here!
            </a>
          </div>
          {/*<div className={clsx("h-[10000px] bg-red-300")}>Helolo</div>*/}
          {/*<div className={clsx("text-white")}>Hello there</div>*/}
        </div>
      </div>
    </div>
  );
};

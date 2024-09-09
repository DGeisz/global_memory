import React, { ReactNode } from "react";
import Globe, { GlobeMethods, GlobeProps } from "react-globe.gl";
import { useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useRenderOnResize } from "../utils/hooks.ts";
import clsx from "clsx";

export const GlobeBackground: React.FC<GlobeProps> = (props) => {
  const globe = useRef<GlobeMethods>();

  useRenderOnResize();

  useEffect(() => {
    if (!globe.current) return;

    const controls = globe.current!.controls() as OrbitControls;

    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
  }, []);

  return (
    <div
      className={clsx(
        "fixed",
        "inset-0",
        "pointer-events-none",
        "-z-10",
        "bg-blue-300",
        "overflow-visible",
      )}
    >
      <Globe
        ref={globe}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        width={window.innerWidth}
        height={window.innerHeight}
        {...props}
      />
    </div>
  );
};

export const GlobePage: React.FC<{ children: ReactNode } | GlobeProps> = (
  props,
) => {
  const { children, ...globeProps } = props;

  return (
    <div className={clsx("text-neutral-200")}>
      <GlobeBackground {...globeProps} />
      <div className={clsx("flex justify-center items-center")}>
        <div className={clsx("max-w-4xl w-full mt-16", "px-4")}>{children}</div>
      </div>
    </div>
  );
};

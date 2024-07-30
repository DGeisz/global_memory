import Globe, { GlobeMethods } from "react-globe.gl";
import { useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import clsx from "clsx";
import { useRender } from "../../utils/hooks.ts";

export const LandingBackground = () => {
  const globe = useRef<GlobeMethods>();

  const render = useRender();

  useEffect(() => {
    function handleResize() {
      render();
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!globe.current) return;

    const controls = globe.current!.controls() as OrbitControls;

    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
  }, []);

  return (
    <div className={"fixed inset-0 pointer-events-none -z-10"}>
      <Globe
        ref={globe}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        enablePointerInteraction={false}
        pauseAnimation={true}
        width={window.innerWidth}
        height={window.innerHeight}
      />
      {/*<div className={clsx("absolute inset-0 backdrop-blur-xl")} />*/}
    </div>
  );
};

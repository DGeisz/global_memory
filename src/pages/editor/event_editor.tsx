import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import Globe, { GlobeMethods } from "react-globe.gl";
import { useRender } from "../../utils/hooks.ts";
import { BASIC_BLUR_CONTAINER } from "../../style/colors.ts";
import { TextAreaInput, UnderlinedInput } from "../../components/inputs.tsx";
import { AutoComplete, Input } from "antd";
import { geoItemMap } from "../../geojson/geojson_items.tsx";
import _ from "underscore";
import Fuse from "fuse.js";
import colors from "tailwindcss/colors";

interface EventGroupsProps {
  children: ReactNode;
  title: string;
}

const EventEditorGroup: React.FC<EventGroupsProps> = ({ children, title }) => {
  return (
    <div
      className={clsx(
        "border-b border-neutral-200/40 border-solid",
        "pb-3 pt-2",
      )}
    >
      <div
        className={clsx(
          "text-neutral-300",
          "font-semibold",
          "text-sm",
          "ml-2",
          "mb-4",
        )}
      >
        {title}
      </div>
      <div className={clsx("px-2")}>{children}</div>
    </div>
  );
};

const areaOptions = Object.keys(geoItemMap).map((item) => ({ value: item }));

export const EventEditor: React.FC = () => {
  const globeContainer = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<GlobeMethods>();

  const [activeOptions, setActiveOptions] =
    useState<{ value: string }[]>(areaOptions);
  const [areaText, setAreaText] = useState<string>("");

  const [activeArea, setActiveArea] = useState(null);

  const fuse = useMemo(() => new Fuse(areaOptions, { keys: ["value"] }), []);

  const render = useRender();

  useEffect(() => {
    render();

    console.log("countries", geoItemMap);

    // console.log(fuse.search("U"));

    function resize() {
      render();
    }

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className={clsx("flex", "text-neutral-100", "h-full")}>
      <div className={clsx("flex-[1] h-full", "p-4")}>
        <div className={clsx(BASIC_BLUR_CONTAINER, "px-4", "pt-2")}>
          <EventEditorGroup title="Basic Info">
            <UnderlinedInput
              placeholder="Event Title..."
              className={clsx("text-xl", "mb-4")}
            />
            <TextAreaInput placeholder="Event Description..." />
          </EventEditorGroup>
          <EventEditorGroup title={"Location"}>
            <div className={clsx("placeholder:text-neutral-400")}>
              <AutoComplete
                placeholder={"General Area..."}
                value={areaText}
                onChange={(value) => {
                  setAreaText(value);
                  setActiveOptions(fuse.search(value).map((item) => item.item));
                }}
                onSelect={(value) => {
                  console.log("Selected!", value);

                  const item = geoItemMap[value];

                  console.log("item", item);

                  // const avgLatLon = [
                  //   item.bbox[0] + item.bbox[2],
                  //   item.bbox[1] + item.bbox[3],
                  // ].map((item) => item / 2);

                  let allCoords;

                  if (item.geometry.type === "MultiPolygon") {
                    // console.log("coords", item.geometry.coordinates);
                    //
                    // allCoords = item.geometry.coordinates.reduce(
                    //   (acc, curr) => {
                    //     return [...acc, curr];
                    //   },
                    //   [],
                    // );
                    allCoords = _.flatten(item.geometry.coordinates, 2);
                  } else {
                    allCoords = item.geometry.coordinates[0];
                  }

                  // console.log("allCoords", allCoords);
                  console.log("allCoords", allCoords.length);

                  const avgLatLon = allCoords
                    .reduce(
                      (acc, curr) => {
                        acc[0] += curr[0];
                        acc[1] += curr[1];
                        return acc;
                      },
                      [0, 0],
                    )
                    .map((val) => val / allCoords.length);

                  setActiveArea(geoItemMap[value]);

                  if (!globeRef.current) return;

                  console.log("lat long", avgLatLon, item);

                  globeRef.current?.pointOfView(
                    {
                      lat: avgLatLon[1],
                      lng: avgLatLon[0],
                    },
                    500,
                  );
                }}
                // options={[{ value: "Hello" }, { value: "There" }]}
                options={activeOptions}
                // style={{ backgroundColor: colors.neutral[200] }}
                rootClassName={clsx(
                  "w-full",
                  "text-white",
                  // "!bg-neutral-400",
                  // "!text-neutral-200",
                  // "rounded-md",
                  // "placeholder:text-neutral-400",
                )}
              >
                <Input
                // className={clsx()}
                // rootClassName={clsx(
                //   "w-full",
                //   "!bg-neutral-200/10",
                //   "!text-neutral-200",
                //   "!placeholder:text-neutral-400",
                // )}
                />
              </AutoComplete>
            </div>
          </EventEditorGroup>

          {/*<div className={clsx("text-neutral-400", "text-xl", "ml-4")}>*/}
          {/*  Basic Info*/}
          {/*</div>*/}
        </div>
      </div>
      <div className={clsx("relative flex-[2]")}>
        <div ref={globeContainer} className={clsx("absolute inset-0")}>
          <div className={"fixed z-10"}>
            <Globe
              ref={globeRef}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              width={globeContainer.current?.clientWidth || window.innerWidth}
              height={
                globeContainer.current?.clientHeight || window.innerHeight
              }
              polygonsData={activeArea ? [activeArea] : []}
              polygonsTransitionDuration={0}
              polygonAltitude={0.005}
              // polygonCapColor={() => colors.cyan[400]}
              polygonCapColor={() => `rgba(6, 181, 212, 0.7)`}
              polygonSideColor={() => "blue"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

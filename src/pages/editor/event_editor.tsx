import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import Globe, { GlobeMethods } from "react-globe.gl";
import { useRenderOnResize } from "../../utils/hooks.ts";
import { BASIC_BLUR_CONTAINER } from "../../style/colors.ts";
import { TextAreaInput, UnderlinedInput } from "../../components/inputs.tsx";
import { AutoComplete, Button, DatePicker, Input, Radio } from "antd";
import { geoItemMap, geoCities } from "../../geojson/geojson_items.tsx";
import _ from "underscore";
import Fuse from "fuse.js";
import "./event_editor.css";
import ReactDOM from "react-dom/client";

enum DateType {
  Day = "Day",
  Month = "Month",
  Year = "Year",
}

function dateTypeToFormat(dateType: DateType) {
  switch (dateType) {
    case DateType.Day:
      return "MM/DD/YYYY";
    case DateType.Month:
      return "MM/YYYY";
    case DateType.Year:
      return "YYYY";
  }
}

function dateTypeToPicker(dateType: DateType) {
  switch (dateType) {
    case DateType.Day:
      return "date";
    case DateType.Month:
      return "month";
    case DateType.Year:
      return "year";
  }
}

const INPUT_BORDER = "border-gray-400";

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

interface CompProps {
  name: string;
}

const PopupComp: React.FC<CompProps> = ({ name }) => {
  return (
    <div className={clsx("flex flex-col")}>
      <div className={clsx("bg-slate-600", "p-2", "rounded-md")}>{name}</div>
      <div className={clsx("flex justify-center items-center")}>
        <div
          className={clsx(
            "w-0 h-0",
            "border-slate-600",
            "border-l-transparent border-r-transparent",
            "border-l-[10px] border-r-[10px] border-t-[12px]",
            "-translate-y-0.5",
          )}
        />
      </div>
    </div>
  );
};

const DualContainer: React.FC<CompProps> = (props) => {
  return (
    <div>
      <PopupComp {...props} />
      <div className={clsx("invisible", "pointer-events-none")}>
        <PopupComp {...props} />
      </div>
    </div>
  );
};

const areaOptions = Object.keys(geoItemMap).map((item) => ({ value: item }));
const cityOptions = geoCities.map((item) => ({
  ...item,
  value: `${item.city}, ${item.country}`,
}));

export const EventEditor: React.FC = () => {
  const globeContainer = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<GlobeMethods>();

  const [activeOptions, setActiveOptions] =
    useState<{ value: string }[]>(areaOptions);
  const [areaText, setAreaText] = useState<string>("");
  const [activeArea, setActiveArea] = useState(null);

  const areaFuse = useMemo(
    () => new Fuse(areaOptions, { keys: ["value"] }),
    [],
  );

  const [cityText, setCityText] = useState<string>("");
  const [activeCityOptions, setActiveCityOptions] = useState([]);
  const [activeCity, setActiveCity] = useState(null);

  const cityFuse = useMemo(
    () => new Fuse(cityOptions, { keys: ["city_ascii"] }),
    [],
  );

  const [dateType, setDateType] = useState<DateType>(DateType.Day);

  useRenderOnResize();

  useEffect(() => {
    const handlePointerDown = (event) => {
      console.log("Pointer Event Target:", event.target);
    };

    // Add the event listener to the document
    document.addEventListener("pointerdown", handlePointerDown);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  const htmlData = activeCity
    ? [
        {
          ...activeCity,
          lat: parseFloat(activeCity.lat),
          lng: parseFloat(activeCity.lng),
        },
      ]
    : [];

  return (
    <div className={clsx("flex", "text-neutral-100", "h-full")}>
      <div
        className={clsx(
          "flex-[1] h-full",
          "p-4",
          "z-10",
          "pointer-events-none",
        )}
      >
        <div
          className={clsx(
            BASIC_BLUR_CONTAINER,
            "px-4",
            "pt-2",
            "z-10",
            "pointer-events-auto",
          )}
        >
          <EventEditorGroup title="Basic Info">
            <UnderlinedInput
              placeholder="Event Title..."
              className={clsx("text-xl", "mb-4", "placeholder:text-gray-500")}
            />
            <TextAreaInput
              placeholder="Event Description..."
              className={clsx(INPUT_BORDER)}
            />
          </EventEditorGroup>
          <EventEditorGroup title={"Date"}>
            <div className={clsx("flex", "flex-col")}>
              <Radio.Group
                className={"!text-white"}
                value={dateType}
                onChange={(e) => setDateType(e.target.value)}
              >
                {Object.values(DateType).map((type) => (
                  <Radio
                    value={type}
                    key={type}
                    className={clsx("text-gray-200")}
                  >
                    {type}
                  </Radio>
                ))}
              </Radio.Group>
              <div className={"mt-2"}>
                <DatePicker
                  rootClassName={clsx(
                    "!bg-neutral-200/10",
                    "!text-neutral-400",
                    INPUT_BORDER,
                  )}
                  popupClassName={clsx(
                    "placeholder:text-neutral-400",
                    "!bg-neutral-200/10",
                  )}
                  format={dateTypeToFormat(dateType)}
                  picker={dateTypeToPicker(dateType)}
                />
              </div>
            </div>
            {/*{dateType === DateType.Day*/}
            {/*  ? */}
            {/*  <DatePicker format={dateTypeToFormat(dateType)}  />*/}
            {/*  : dateType === DateType.Month*/}
            {/*    ? */}
            {/*    <DatePicker format={dateTypeToFormat(dateType)}  />*/}
            {/*    : dateType === DateType.Year*/}
            {/*      ? */}
            {/*      <DatePicker format={dateTypeToFormat(dateType)} picker={"Month"}  />*/}
            {/*      : null}*/}
          </EventEditorGroup>
          <EventEditorGroup title={"Location"}>
            <div className={clsx("placeholder:text-neutral-400")}>
              <AutoComplete
                placeholder={"Country, State, or Area..."}
                value={areaText}
                onChange={(value) => {
                  setAreaText(value);
                  setActiveOptions(
                    areaFuse.search(value).map((item) => item.item),
                  );
                }}
                options={activeOptions}
                rootClassName={clsx(
                  "w-full",
                  "text-white",
                  "!text-neutral-200",
                  "placeholder:text-neutral-400",
                )}
                popupClassName={clsx(
                  "!bg-neutral-200/10",
                  "backdrop-blur-md",
                  "!text-neutral-200",
                  "border border-neutral-300",
                  "outline-none",
                  "border-0",
                )}
                onSelect={(value) => {
                  const item = geoItemMap[value];

                  let allCoords;

                  if (item.geometry.type === "MultiPolygon") {
                    allCoords = _.flatten(item.geometry.coordinates, 2);
                  } else {
                    allCoords = item.geometry.coordinates[0];
                  }

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

                  globeRef.current?.pointOfView(
                    {
                      lat: avgLatLon[1],
                      lng: avgLatLon[0],
                    },
                    500,
                  );
                }}
              >
                <Input
                  rootClassName={clsx(
                    "w-full",
                    "!bg-neutral-200/10",
                    "!text-neutral-200",
                    "!placeholder:text-neutral-400",
                    INPUT_BORDER,
                  )}
                />
              </AutoComplete>
              <div className={clsx("h-4")} />
              <AutoComplete
                placeholder={"City..."}
                value={cityText}
                onChange={(value: string) => {
                  setCityText(value);

                  setActiveCityOptions(
                    cityFuse
                      .search(value.slice(0, 10), { limit: 100 })
                      .map((item) => item.item),
                  );
                }}
                options={activeCityOptions}
                rootClassName={clsx(
                  "w-full",
                  "text-white",
                  "!text-neutral-200",
                  "placeholder:text-neutral-400",
                )}
                popupClassName={clsx(
                  "!bg-neutral-200/10",
                  "backdrop-blur-md",
                  "!text-neutral-200",
                  "border border-neutral-300",
                  "outline-none",
                  "border-0",
                )}
                onSelect={(value) => {
                  const city = cityOptions.find((city) => city.value === value);
                  if (!city) return;
                  setActiveCity(city);
                  console.log("City Selected:", city);

                  if (!globeRef.current) return;
                  globeRef.current?.pointOfView(
                    {
                      lat: parseFloat(city.lat),
                      lng: parseFloat(city.lng),
                    },
                    500,
                  );
                }}
              >
                <Input
                  rootClassName={clsx(
                    "w-full",
                    "!bg-neutral-200/10",
                    "!text-neutral-200",
                    "!placeholder:text-neutral-400",
                    INPUT_BORDER,
                  )}
                />
              </AutoComplete>
              <div
                className={clsx(
                  "text-xs",
                  "mt-1 ml-1",
                  "cursor-pointer",
                  "select-none",
                  "text-slate-500",
                )}
                onClick={() => {
                  setActiveCity(null);
                  setCityText("");
                  setActiveCityOptions([]);
                }}
              >
                Clear City
              </div>
            </div>
          </EventEditorGroup>
          <div
            className={clsx(
              "flex flex-row justify-center items-center",
              "mt-4",
            )}
          >
            <Button type={"primary"} className={clsx("mr-1")}>
              Save
            </Button>
            <Button type={"default"} className={clsx("!text-neutral-700")}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <div className={clsx("relative flex-[2]", "pointer-events-none")} />
      <div
        ref={globeContainer}
        className={clsx("absolute", "inset-0", "pointer-events-auto")}
      >
        <div className={clsx("fixed ", "pointer-events-auto")}>
          <Globe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            width={window.innerWidth * 1.3}
            height={window.innerHeight}
            // width={(globeContainer.current?.clientWidth || window.innerWidth)}
            // height={
            //   globeContainer.current?.clientHeight || window.innerHeight
            // }
            polygonsData={activeArea ? [activeArea] : []}
            polygonsTransitionDuration={0}
            polygonAltitude={0.005}
            htmlElementsData={htmlData}
            htmlElement={(d) => {
              const el = document.createElement("div");

              ReactDOM.createRoot(el).render(<DualContainer name={d.value} />);

              return el;
            }}
            // polygonCapColor={() => colors.cyan[400]}
            polygonCapColor={() => `rgba(6, 181, 212, 0.7)`}
            polygonSideColor={() => "blue"}
            pointsData={activeCity ? [activeCity] : []}
            pointAltitude={0.01}
            pointRadius={0.4}
          />
        </div>
      </div>
    </div>
  );
};

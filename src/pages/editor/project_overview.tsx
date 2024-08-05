import React from "react";
import { GlobePage } from "../../components/globe_background.tsx";
import clsx from "clsx";
import { BASIC_BLUR_CONTAINER } from "../../style/colors.ts";
import { Input, Button, Tooltip } from "antd";
import {
  displayDate,
  EXAMPLE_EVENTS,
  TimelineEvent,
} from "../../model/project.ts";
import { IoChevronUp, IoChevronDown } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { TextAreaInput, UnderlinedInput } from "../../components/inputs.tsx";
// import dayjs from "dayjs";

const { TextArea } = Input;

// export const FrameOverview: React.FC = () => {
//   return <div className={}></div>;
// };

// interface TimelineEvent {
//   name: string;
//   description: string;
//   date
// }

interface TimelineEventProps {
  event: TimelineEvent;
  hideMoveUp?: boolean;
  hideMoveDown?: boolean;
}

export const TimelineEventPreview: React.FC<TimelineEventProps> = (props) => {
  const { event, hideMoveUp, hideMoveDown } = props;

  const { title, description, date, dateType } = event;

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("event/rando")}
      className={clsx(
        "flex flex-row",
        "border border-neutral-200/20 border-solid",
        "rounded-md",
        "px-2 py-1",
        "my-1",
      )}
    >
      <div className={clsx("flex-1")}>
        <div className={clsx("text-neutral-400")}>
          {displayDate(date, dateType)}
        </div>
        <div className={clsx("text-2xl", "mt-2", "font-semibold")}>{title}</div>
        <div className={clsx("text-neutral-200")}>{description}</div>
      </div>
      <div className={clsx("flex flex-col")}>
        <div
          className={clsx(
            hideMoveUp ? ["opacity-40", "pointer-events-none"] : "visible",
          )}
        >
          <Tooltip title={"Move event up"} placement={"right"}>
            <Button size={"small"} ghost>
              <IoChevronUp />
            </Button>
          </Tooltip>
        </div>
        <div className={clsx("flex-1", "flex items-center justify-center")}>
          {/*<Tooltip title={"Edit Event"} placement={"right"}>*/}
          {/*  <Button size={"small"} ghost>*/}
          {/*    <MdOutlineEdit />*/}
          {/*  </Button>*/}
          {/*</Tooltip>*/}
        </div>
        <div
          className={clsx(
            hideMoveDown ? ["opacity-40", "pointer-events-none"] : "visible",
          )}
        >
          <Tooltip title={"Move event down"} placement={"right"}>
            <Button size={"small"} ghost>
              <IoChevronDown />
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export const ProjectOverview: React.FC = () => {
  return (
    <GlobePage animateIn={false}>
      <div className={clsx(BASIC_BLUR_CONTAINER)}>
        <UnderlinedInput
          placeholder={"Project Name"}
          className={clsx("text-3xl")}
        />
        {/*<Input*/}
        {/*  placeholder="Project Name"*/}
        {/*  rootClassName={clsx(*/}
        {/*    "text-3xl",*/}
        {/*    "text-white",*/}
        {/*    "placeholder:text-gray-700",*/}
        {/*    "rounded-none",*/}
        {/*    "border-0 border-b border-solid border-neutral-500",*/}
        {/*  )}*/}
        {/*  variant={"borderless"}*/}
        {/*/>*/}
        <div className={clsx("mt-8")} />
        {/*<div className={clsx("mt-8", "mb-1", "font-light", "text-sky-300")}>*/}
        {/*  <div className={clsx("ml-3", "text-lg")}>Project Description</div>*/}
        {/*</div>*/}
        <TextAreaInput placeholder={"Enter Description..."} />
        {/*<TextArea*/}
        {/*  rows={4}*/}
        {/*  placeholder="Enter Description..."*/}
        {/*  rootClassName={clsx(*/}
        {/*    "!bg-neutral-200/10",*/}
        {/*    "text-neutral-200",*/}
        {/*    "placeholder:text-neutral-400",*/}
        {/*  )}*/}
        {/*/>*/}
        <div className={clsx("flex items-center justify-center", "mt-4")}>
          <Button type={"primary"} className={clsx("mr-1")}>
            Save
          </Button>
          <Button style={{ color: "hover:red" }}>Cancel</Button>
        </div>
      </div>
      <div className={clsx("mt-40")} />
      <div className={clsx(BASIC_BLUR_CONTAINER, "mt-16")}>
        <div className={clsx("text-3xl")}>Timeline</div>
        <div className={clsx("flex items-center justify-center", "w-full")}>
          <Button type={"primary"}>+ Add Event</Button>
        </div>
        <div>
          {EXAMPLE_EVENTS.map((event, i) => (
            <div key={i}>
              <TimelineEventPreview
                event={event}
                key={i}
                hideMoveUp={i === 0}
                hideMoveDown={i === EXAMPLE_EVENTS.length - 1}
              />
              <div className={clsx("flex justify-center items-center", "h-0")}>
                <div
                  className={clsx(
                    "text-sm",
                    "cursor-pointer",
                    "text-center",
                    "p-1 rounded-full",
                    "border border-neutral-200/20 border-solid",
                    "bg-gray-800",
                    "opacity-0 hover:opacity-100",
                    "transition-opacity duration-75",
                  )}
                >
                  + Add Event
                </div>
              </div>
            </div>
          ))}
          {/*<Droppable droppableId="droppable">*/}
          {/*  {(provided) => (*/}
          {/*    <div*/}
          {/*      {...provided.droppableProps}*/}
          {/*      className={"mt-80"}*/}
          {/*      ref={provided.innerRef}*/}
          {/*      // style={getListStyle(snapshot.isDraggingOver)}*/}
          {/*    >*/}
          {/*      {ai.map((item, index) => (*/}
          {/*        <Draggable*/}
          {/*          key={item.id}*/}
          {/*          draggableId={item.id}*/}
          {/*          index={index}*/}
          {/*        >*/}
          {/*          {(provided) => (*/}
          {/*            <div*/}
          {/*              ref={provided.innerRef}*/}
          {/*              {...provided.draggableProps}*/}
          {/*              {...provided.dragHandleProps}*/}
          {/*              // style={getItemStyle(*/}
          {/*              //   snapshot.isDragging,*/}
          {/*              //   provided.draggableProps.style*/}
          {/*              // )}*/}
          {/*            >*/}
          {/*              {item.content}*/}
          {/*            </div>*/}
          {/*          )}*/}
          {/*        </Draggable>*/}
          {/*      ))}*/}
          {/*      {provided.placeholder}*/}
          {/*    </div>*/}
          {/*  )}*/}
          {/*</Droppable>*/}
          {/*</DragDropContext>*/}
          {/*<DragDropContext onDragEnd={() => {}}>*/}
          {/*  <Droppable droppableId={"events"}>*/}
          {/*    {(provided) => (*/}
          {/*      <div {...provided.droppableProps} ref={provided.innerRef}>*/}
          {/*        {EXAMPLE_EVENTS.map((event, i) => (*/}
          {/*          <Draggable*/}
          {/*            key={event.title}*/}
          {/*            draggableId={event.title}*/}
          {/*            index={i}*/}
          {/*          >*/}
          {/*            {(provided) => (*/}
          {/*              <div*/}
          {/*                ref={provided.innerRef}*/}
          {/*                {...provided.draggableProps}*/}
          {/*                {...provided.dragHandleProps}*/}
          {/*              >*/}
          {/*                <TimelineEventPreview event={event} />*/}
          {/*              </div>*/}
          {/*            )}*/}
          {/*          </Draggable>*/}
          {/*        ))}*/}
          {/*        {provided.placeholder}*/}
          {/*      </div>*/}
          {/*    )}*/}
          {/*  </Droppable>*/}
          {/*</DragDropContext>*/}
        </div>
      </div>
    </GlobePage>
  );
};

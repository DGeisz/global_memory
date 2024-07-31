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
import { MdOutlineEdit } from "react-icons/md";
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
}

export const TimelineEventPreview: React.FC<TimelineEventProps> = (props) => {
  const { event } = props;

  const { title, description, date, dateType } = event;

  return (
    <div
      className={clsx(
        "flex flex-row",
        "border border-neutral-200/20 border-solid",
        "rounded-md",
        "px-2 py-1",
        "mb-2",
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
        <div>
          <Tooltip title={"Move event up"} placement={"right"}>
            <Button size={"small"} ghost>
              <IoChevronUp />
            </Button>
          </Tooltip>
        </div>
        <div className={clsx("flex-1", "flex items-center justify-center")}>
          <Tooltip title={"Edit Event"} placement={"right"}>
            <Button size={"small"} ghost>
              <MdOutlineEdit />
            </Button>
          </Tooltip>
        </div>
        <div>
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
  // return (
  //   <div>
  //     <div>
  //       <DragDropContext
  //         onDragEnd={
  //           () => {}
  //           // this.onDragEnd
  //         }
  //       >
  //         <Droppable droppableId="droppable">
  //           {(provided) => (
  //             <div
  //               {...provided.droppableProps}
  //               ref={provided.innerRef}
  //               // style={getListStyle(snapshot.isDraggingOver)}
  //             >
  //               {items.map((item, index) => (
  //                 <Draggable key={item.id} draggableId={item.id} index={index}>
  //                   {(provided) => (
  //                     <div
  //                       ref={provided.innerRef}
  //                       {...provided.draggableProps}
  //                       {...provided.dragHandleProps}
  //                       // style={getItemStyle(
  //                       //   snapshot.isDragging,
  //                       //   provided.draggableProps.style
  //                       // )}
  //                     >
  //                       {item.content}
  //                     </div>
  //                   )}
  //                 </Draggable>
  //               ))}
  //               {provided.placeholder}
  //             </div>
  //           )}
  //         </Droppable>
  //       </DragDropContext>
  //     </div>
  //   </div>
  // );

  return (
    <GlobePage>
      <div className={clsx(BASIC_BLUR_CONTAINER)}>
        <Input
          placeholder="Project Name"
          rootClassName={clsx(
            "text-3xl",
            "text-white",
            "placeholder:text-gray-700",
            "rounded-none",
            "border-0 border-b border-solid border-neutral-500",
          )}
          variant={"borderless"}
        />
        <div className={clsx("mt-8")} />
        {/*<div className={clsx("mt-8", "mb-1", "font-light", "text-sky-300")}>*/}
        {/*  <div className={clsx("ml-3", "text-lg")}>Project Description</div>*/}
        {/*</div>*/}
        <TextArea
          rows={4}
          placeholder="Enter Description..."
          rootClassName={clsx(
            "!bg-neutral-200/10",
            "text-neutral-200",
            "placeholder:text-neutral-400",
          )}
        />
        <div className={clsx("flex items-center justify-center", "mt-4")}>
          <Button type={"primary"} className={clsx("mr-1")}>
            Save
          </Button>
          <Button style={{ color: "hover:red" }}>Cancel</Button>
        </div>
      </div>
      <div className={clsx("mt-40")} />
      <div className={clsx(BASIC_BLUR_CONTAINER, "mt-16")}>
        <div
          className={clsx(
            "text-3xl",
            // "border-b border-solid border-neutral-500",
          )}
        >
          Timeline
        </div>
        <div className={clsx("flex items-center justify-center", "w-full")}>
          <Button type={"primary"}>+ Add Event</Button>
          {/*<DatePicker*/}
          {/*  value={dayjs(date)}*/}
          {/*  picker={"week"}*/}
          {/*  onChange={(date, dateString) => {*/}
          {/*    // date.toISOString()*/}
          {/*    setDate(date.toISOString());*/}
          {/*    // setDate(date);*/}

          {/*    console.log(dateString, date.toISOString());*/}
          {/*  }}*/}
          {/*/>*/}
        </div>
        <div>
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
          {EXAMPLE_EVENTS.map((event, i) => (
            <TimelineEventPreview event={event} key={i} />
          ))}
        </div>
      </div>
    </GlobePage>
  );
};

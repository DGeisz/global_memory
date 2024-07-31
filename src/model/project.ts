import dayjs from "dayjs";

export interface Project {
  name: string;
  description: string;
  uid: string;
}

enum DateType {
  Day = "Day",
  Month = "Month",
  Year = "Year",
}

export function displayDate(date: string, dateType: DateType): string {
  switch (dateType) {
    case DateType.Day:
      return dayjs(date).format("MMMM D, YYYY");
    case DateType.Month:
      return dayjs(date).format("MMMM YYYY");
    case DateType.Year:
      return dayjs(date).format("YYYY");
  }
}

export interface TimelineEvent {
  title: string;
  description?: string;
  date: string;
  dateType: DateType;
}

export const EXAMPLE_EVENTS: TimelineEvent[] = [
  {
    title: "Stuff 1",
    description: "Stuff happened",
    date: "2024-07-30T18:07:05Z",
    dateType: DateType.Day,
  },
  {
    title: "Stuff 2",
    description: "Stuff happened",
    date: "2024-07-30T18:07:05Z",
    dateType: DateType.Month,
  },
  {
    title: "Stuff 3",
    description: "Stuff happened",
    date: "2024-07-30T18:07:05Z",
    dateType: DateType.Year,
  },
];

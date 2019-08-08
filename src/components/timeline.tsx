import * as React from "react";
import { TimePoint } from "../models/timePoint";
import { DateTime } from "luxon";

interface ITimelineProps {
  current: DateTime;
  dates: TimePoint[];
}

interface ITimelinePointProps {
  date: TimePoint;
  min: number;
  max: number;
}

export const TimelinePoint: React.FC<ITimelinePointProps> = ({min, max, date}) => {
  const xpos: number = (date.date.toMillis() - min) / (max - min);
  const style: React.CSSProperties = { left: xpos * 100 + "%" };
  if (xpos < 0.02 && xpos > 0) {
    style.transform = "rotate(-45deg)";
  }
  return (
    <div className="timelinepoint" style={style}>
      <div className="point" />
      <span className="timelinelabel">
        {date.name} {date.date.toFormat("D/M HH:mm")}
      </span>
    </div>
  );
};

export const Timeline: React.FC<ITimelineProps> = ({dates, current}) => {
  const min: number = current.toMillis();
  const max: number = DateTime.max(...dates.map(d => d.date))
    .plus({ days: 1 })
    .toMillis();

  return (
    <div>
      {dates
        .filter(d => d.date.toMillis() >= min)
        .map(d => (
          <TimelinePoint
            key={d.name + d.date.toString()}
            min={min}
            max={max}
            date={d}
          />
        ))}
      <TimelinePoint
        min={min}
        max={max}
        date={{ name: "Nu", date: current }}
      />
    </div>
  );
};

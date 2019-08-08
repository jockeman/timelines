import * as React from "react";
import { TimePoint } from "../models/timePoint";
import { DateTime, Duration } from "luxon";

export enum CountdownMode {
  Day = 1,
  Ms = 2
}

interface ICountdownProps {
  to: TimePoint;
  current: DateTime;
  mode?: CountdownMode;
}
export const Countdown: React.FC<ICountdownProps> = ({ mode, to, current }) => {
  let countdown: string = "";
  if (to.date < current) {
    const pastStyle: React.CSSProperties = {
      color: "grey",
      textDecoration: "line-through"
    };
    return <span style={pastStyle}>{to.name}</span>;
  }
  const diff: Duration = to.date.diff(current, "days");
  switch (mode) {
    case CountdownMode.Day:
      if (diff.days <= 1) {
        countdown = diff.toFormat("hh:mm:ss.SSS");
      } else {
        countdown = diff.days.toFixed() + " dagar";// .toFormat("d 'dagar'");
      }
      break;
    case CountdownMode.Ms:
    default:
      countdown = diff.toFormat("d 'dagar' hh 'timmar' mm 'minuter' ss 'sekunder och' SSS 'ms'");
      break;
  }
  return <>{to.name} om {countdown}</>;
};
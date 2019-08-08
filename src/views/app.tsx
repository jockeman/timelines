import * as React from "react";

import "./app.css";
import { Countdown, CountdownMode } from "../components/countdown";
import { TimePoint } from "../models/timePoint";
import { Timeline } from "../components/timeline";
import { DateTime } from "luxon";

interface IAppProps {}
interface IAppState {
  now: DateTime;
  dates: TimePoint[];
}

export class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      now: DateTime.local(),
      dates: [
        new TimePoint("Helg", "2019-07-05T17:00"),
        new TimePoint("Helg", "2019-07-12T17:00"),
        new TimePoint("Helg", "2019-07-19T17:00"),
        new TimePoint("Helg", "2019-07-26T17:00"),
        new TimePoint("Helg", "2019-08-02T17:00"),
        new TimePoint("Semester", "2019-08-09T16:00"),
        new TimePoint("BF", "2019-08-21")
      ]
    };
  }

  componentDidMount(): void {
    setInterval(() => {
      this.setState({ now: DateTime.local() });
    }, 17);
  }

  render(): JSX.Element {
    const { dates } = this.state;
    const dates2: TimePoint[] = dates
      .concat([
        new TimePoint(
          "Hemgång",
          DateTime.local()
            .set({ hour: 17, minute: 0, millisecond: 0 })
            .toISO()
        )
      ])
      .sort((a, b) => a.date.diff(b.date).valueOf());
    const main: TimePoint = dates.filter(d => d.name === "BF")[0];
    return (
      <div className="container">
        <div className="center">
          <h2>
            <Countdown current={this.state.now} to={main} />
          </h2>
        </div>
        <div className="right">
          {dates2.map(d => (
            <li key={d.name + d.date.toString()}>
              <Countdown
                mode={CountdownMode.Day}
                current={this.state.now}
                to={d}
              />
            </li>
          ))}
        </div>
        <div className="timeline">
          <Timeline current={this.state.now} dates={dates2} />
        </div>
      </div>
    );
  }
}

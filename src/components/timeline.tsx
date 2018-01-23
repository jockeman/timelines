import * as React from 'react';
import { TimePoint } from '../models/timePoint';
import moment from 'moment';

interface ITimelineProps {
    current: moment.Moment;
    dates: TimePoint[];
}
export const Timeline: React.SFC<ITimelineProps> = (props) => {
    const min = Math.min(props.dates[0].date.unix(), props.current.unix());
    const max = props.dates[props.dates.length-1].date.unix();

    return <div>
        {props.dates.map(d => <TimelinePoint key={d.name} min={min} max={max} date={d}/>)}
        <TimelinePoint min={min} max={max} date={{name: 'Nu', date: props.current}}/>
    </div>;
};

interface ITimelinePointProps {
    date: TimePoint;
    min: number;
    max: number;
}
export const TimelinePoint: React.SFC<ITimelinePointProps> = (props) => {
    const xpos = (props.date.date.unix()-props.min)/(props.max-props.min);
    return <div className="timelinepoint" style={{left: xpos*100 + '%'}}>
        <div className="point" />
        <span className="timelinelabel">{props.date.name} {props.date.date.format("D/M HH:mm")}</span>
        </div>;
};
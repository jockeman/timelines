import * as React from 'react';
import moment from 'moment';
import { TimePoint } from '../models/timePoint';

interface ICountdownProps {
    to: TimePoint;
    current: moment.Moment;
}
export const Countdown: React.SFC<ICountdownProps> = (props) => {
    return <>{props.to.name} om {props.to.date.clone().endOf('day').diff(props.current, 'days').toString()} dagar</>;
};
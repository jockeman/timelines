import * as React from 'react';
import moment from 'moment';
import { TimePoint } from '../models/timePoint';

enum CountdownMode {
    Day,
    Ms
}

interface ICountdownProps {
    to: TimePoint;
    current: moment.Moment;
    mode?: CountdownMode;
}
export const Countdown: React.SFC<ICountdownProps> = (props) => {
    let mode = props.mode || CountdownMode.Day;
    let countdown = ""
    switch (mode) {
        case CountdownMode.Day:
            const days = props.to.date.clone().endOf('day').diff(props.current, 'day');
            if(days <= 1){
                const hours = props.to.date.clone().diff(props.current, 'hour');
                countdown = `${hours}:${props.to.date.clone().diff(props.current, 'minutes') - hours * 60}`
            } else {
                countdown = days + ' dagar';
            }
            break;
        case CountdownMode.Ms:
            countdown = props.to.date.clone().diff(props.current, 'ms').toString() + ' ms'
          break;
    
        default:
            break;
    }
    return <>{props.to.name} om {countdown}</>;
};
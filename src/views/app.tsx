import * as React from 'react';
import moment from 'moment';
import 'moment/locale/sv';

import "./app.css"
import { Countdown } from '../components/countdown';
import { TimePoint } from '../models/timePoint';
import { Timeline } from '../components/timeline';

//const url = 'https://calendar.google.com/calendar/ical/q8qpukjudr7340vug9f6fce0nc%40group.calendar.google.com/private-1d3085236f05e376f7c7ec98211f41b7/basic.ics';
//const url = 'https://www.googleapis.com/calendar/v3/calendars/q8qpukjudr7340vug9f6fce0nc@group.calendar.google.com/events'
moment.locale('sv');

interface IAppProps {
}
interface IAppState {
    now: moment.Moment;
    dates: TimePoint[]
}

export class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            now: moment(), 
            dates: [
                new TimePoint('Inflytt', '2018-03-20'),
                new TimePoint('Utflyttning', '2018-04-03'),
                new TimePoint('Besiktning', '2018-03-07 08:00'),
                new TimePoint('Påsk', '2018-03-30'),
            ].sort((a,b) => a.date.diff(b.date))
        }
    }

    componentDidMount() {
        // fetch(url)
        //     .then(response => response.text()
        //         .then(responseString => console.log(responseString)),
        //     _errorObj => console.log("Fail", _errorObj));
        setInterval(() => {
            this.setState({now: moment()});
        }, 1000)
    }

    render() {
        const inflytt = this.state.dates.filter(d => d.name === 'Inflytt')[0];
        return <div className="container">
            <div className="center">
                <h2><Countdown current={this.state.now} to={inflytt}/></h2>
            </div>
            <div className="right">
                {this.state.dates.map(d => <li key={d.name}><Countdown current={this.state.now} to={d}/></li>)}
            </div>
            <div className="timeline">
                <Timeline current={this.state.now} dates={this.state.dates} />
            </div>
        </div>;
    }
}
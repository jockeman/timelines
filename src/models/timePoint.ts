import moment from 'moment';

export class TimePoint {
    date: moment.Moment;
    name: string
    constructor(name: string, date: string){
        this.date = moment(date);
        this.name = name;
    }
}
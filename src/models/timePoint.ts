import { DateTime } from "luxon";
export class TimePoint {
    date: DateTime;
    name: string;
    constructor(name: string, date: string) {
        this.date = DateTime.fromISO(date);
        this.name = name;
    }
}

import { Week } from './Week';
import { Day } from './Day';

export class Month {
    index: number;
    days: Day[] = [];
    weeks: Week[] = [];

    constructor(index: number, private startingDay: number, days?: Day[]) {
        this.index = index;
        this.days = days;
        for (let i = 0; i < 6; i++) {
            this.weeks.push(new Week(this.startingDay));
        }
        let weekIndex = 0;
        for (const d of days) {
            d.init = true;

          if (this.startingDay === d.day.getDay()) {

            if (++weekIndex > 5) {
                break;
              }
              this.weeks[weekIndex].add(d);
          } else {
            console.log(d);
            this.weeks[weekIndex].add(d);
            console.log({...this.weeks[weekIndex]})
          }
        }
    }
}

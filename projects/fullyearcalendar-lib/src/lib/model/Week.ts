import { Day } from './Day';

export class Week {
    daysOfWeek: Day[] = [];
    constructor(private startingDay: number) {
        for (let i = 0; i < 7; i++) {
            this.daysOfWeek.push(new Day());
        }
    }
    isFull(): boolean {
        return this.daysOfWeek[6].init;
    }

    add(day: Day): void {
        this.daysOfWeek[this.getIndice(day.day.getDay())] = day;
    }

    getIndice(day: number) {
      if (day >= this.startingDay) {
        return day - this.startingDay;
      } else {
        return 6 - this.startingDay + 1 + day;
      }
    }
}

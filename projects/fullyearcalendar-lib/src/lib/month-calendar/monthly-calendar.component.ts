import { Component, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { Month } from "../model/Month";
import { Day } from "../model/Day";

@Component({
    selector:'month-calendar',
    templateUrl:'monthly-calendar.html',
    styleUrls:['monthly-calendar.scss'],
})
export class MonthlyCalendarComponent implements OnDestroy  {
    
   
    @Input()
    locale:any;
    @Input()
    month:Month;
    
    @Output()
    onDayClicked:EventEmitter<Date> = new EventEmitter<Date>();

    ngOnDestroy(): void {
        this.onDayClicked.unsubscribe();
    }

    dayClick(day:Day):void {
        this.onDayClicked.emit(day.day);
        if(day.select) {
            day.select();
        }
    }
}
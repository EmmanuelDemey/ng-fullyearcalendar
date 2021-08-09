import {Component, Input, Output, EventEmitter, OnDestroy, DoCheck, OnInit} from '@angular/core';
import { Year } from './model/Year';
import {Range} from './model/Range';
import { IInputData } from './Interface/IInputData';
import { LocaleSettings } from './Interface/LocaleSettings';
import { IDisabledDate } from './Interface/IDisabledDate';

@Component({
  selector: 'ng-fullyearcalendar-lib',
  templateUrl: 'fullyearcalendar-lib.html',
  styleUrls: ['fullyearcalendar-lib.scss'],
})
export class FullyearcalendarLibComponent implements OnDestroy, DoCheck, OnInit {

  private initial_data: string;

  @Input()
  startingMonth = 0;

  @Input()
  startingDay = 0;

  @Input()
  underline = false;

  @Input()
  locale: LocaleSettings = {
    dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    monthNames: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
  };

  sortedLocale = this.locale;

  @Input()
  responsive = true;

  value: IInputData;

  @Output()
  onDaySelect: EventEmitter<Date> = new EventEmitter<Date>();

  public year: Year;

  constructor() { }

  ngOnDestroy(): void {
    this.onDaySelect.unsubscribe();
  }

  /**
   * from on push in values ,comparing if there is any difference
   */
  ngDoCheck(): void {
    const stringData = JSON.stringify(this.value);
    if (this.initial_data !== stringData) {
      this.initial_data = stringData;
      this.initValue(this.value, stringData);
    }
  }


  @Input('value')
  set _initValue(val: IInputData) {
    this.value = val;
    this.initValue(val);
  }

  private initValue(val: IInputData, oldValue: string = null): void {
    this.year = new Year(val.year, this.startingMonth, this.startingDay);
      this.initial_data = oldValue != null ? oldValue : JSON.stringify(val);
          for (const m of this.year.months) {
            for (const w of m.weeks) {
              for (const day of w.daysOfWeek) {
                if (this.value.dates && this.value.dates.length > 0) {
                  for (const d of this.value.dates) {
                    if (day.day >= d.start && day.day <= d.end) {
                      const range = new Range();
                      range.id = d.id;
                      range.start = d.start;
                      range.end = d.end;
                      range.tooltip = d.tooltip;
                      range.color = (d.color) ? d.color : 'gray';
                      range.day = day.day;
                      range.select  = (): void => {
                        if (typeof d.select === 'function') {
                          d.select(range);
                        }
                      };
                      if (!day.ranges) {day.ranges = []; }
                      day.ranges.push(range);
                    }
                  }
                }
                day.isDisabled = this.isDisabled(day.day, this.value.disabledDays);
              }
            }
          }
  }

  isDisabled(date: Date, disabledDays: IDisabledDate[]): boolean {
    return date && disabledDays && ((disabledDays.find(i => i.date.getFullYear() == date.getFullYear()
    && i.date.getMonth() == date.getMonth() && i.date.getDate() == date.getDate())) != null);
  }

  onDayClicked(day: Date): void {
    this.onDaySelect.emit(day);
  }

  ngOnInit(): void {
    const [first, rest] = this.locale.dayNamesMin.reduce((acc, day, index) => {
      if (index >= this.startingDay) {
        return [[ ...acc[0]], [...acc[1], day]];
      } else {
        return [[ ...acc[0], day], [...acc[1]]];
      }
    }, [[], []]);

    rest.push(...first);

    this.sortedLocale = {
      ...this.locale,
      dayNamesMin: rest
    };
  }

}

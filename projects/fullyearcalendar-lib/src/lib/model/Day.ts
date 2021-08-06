import {Range} from './Range';

export class Day {
    day: Date;
    dayOfWeek: string;
    init = false;
    color: string;
    tooltip: string;
    ranges: Range[];
    isDisabled = false;
}

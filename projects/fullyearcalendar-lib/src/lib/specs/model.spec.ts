import { Year } from '../model/Year';
import { Month } from '../model/Month';

describe('Year model Test', () => {

  it('months should have 12 months', () => {
    expect(new Year(2019, 0, 0).months.length).toBe(12);
  });

  it('year should by 2018', () => {
      expect(new Year(2018, 0, 0).year).toBe(2018);
  });

  it('days of a month', () => {
    expect(new Year(2019, 0, 0).getMonthDays(1, 2019).length).toBe(28);
    expect(new Year(2019, 0, 0).getMonthDays(2, 2019).length).toBe(31);
    expect(new Year(2019, 0, 0).getMonthDays(3, 2019)[0].day.getDay()).toBe(1);
  });

});

import {getWeekDate, WeekDayEnum, humanDuration} from './dateHelpers';

describe('dateTimeHelpers', () => {
  describe('#getWeekDay()', () => {
    test.each`
      date                                    | expected
      ${new Date('2020-09-06T14:42:34.279Z')} | ${WeekDayEnum.Sunday}
      ${new Date('2020-09-07T14:42:34.279Z')} | ${WeekDayEnum.Monday}
      ${new Date('2020-09-08T14:42:34.279Z')} | ${WeekDayEnum.Tuesday}
      ${new Date('2020-09-09T14:42:34.279Z')} | ${WeekDayEnum.Wednesday}
      ${new Date('2020-09-10T14:42:34.279Z')} | ${WeekDayEnum.Thursday}
      ${new Date('2020-09-11T14:42:34.279Z')} | ${WeekDayEnum.Friday}
      ${new Date('2020-09-12T14:42:34.279Z')} | ${WeekDayEnum.Saturday}
    `('should return $expected for the given date', ({date, expected}) => {
      expect(getWeekDate(date)).toBe(expected);
    });
  });
});

describe('humanDuraiton', () => {
  test('should return human readable duration ', () => {
    expect(humanDuration('03:13:00')).toBe('3hrs. 13min');
    expect(humanDuration('04:40:00')).toBe('4hrs. 40min');
    expect(humanDuration('10:13:00')).toBe('10hrs. 13min');
    expect(humanDuration('12:45:00')).toBe('12hrs. 45min');
  });
});

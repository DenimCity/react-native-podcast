import {getWeekDate, WeekDayEnum} from './dateHelpers';

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

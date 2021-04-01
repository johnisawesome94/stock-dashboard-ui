export enum Period {
  OneDay = "1d",
  OneWeek = "7d",
  OneMonth = "1mo",
  OneYear = "1y",
  YearToDate = "ytd",
  Max = "max"
}

export namespace Period {
  export function getDisplayValue(period: Period): string {
    switch (period) {
      case Period.OneDay:
        return "1 day";
      case Period.OneWeek:
        return "1 week";
      case Period.OneMonth:
        return "1 month";
      case Period.OneYear:
        return "1 year";
      case Period.YearToDate:
        return "Year to date";
      case Period.Max:
        return "Max";
    }
  }

  export function getPeriodOptions(): PeriodOption[] {
    return [
      {
        intervalType: "Days",
        interval: 1,
        value: Period.OneDay,
        displayValue: Period.getDisplayValue(Period.OneDay)
      },
      {
        intervalType: "Weeks",
        interval: 1,
        value: Period.OneWeek,
        displayValue: Period.getDisplayValue(Period.OneWeek)
      },
      {
        intervalType: "Months",
        interval: 1,
        value: Period.OneMonth,
        displayValue: Period.getDisplayValue(Period.OneMonth)
      },
      {
        intervalType: "Years",
        interval: 1,
        value: Period.OneYear,
        displayValue: Period.getDisplayValue(Period.OneYear)
      } //,
      // {
      //   intervalType: '',
      //   interval: 1,
      //   displayValue: Period.getDisplayValue(Period.YearToDate)
      // },
      // {
      //   intervalType: "Days",
      //   interval: 1,
      //   displayValue: Period.getDisplayValue(Period.Max)
      // }
    ];
  }
}

export interface PeriodOption {
  intervalType: "Years" | "Months" | "Weeks" | "Days" | "Auto";
  interval: number;
  value: Period;
  displayValue: string;
}

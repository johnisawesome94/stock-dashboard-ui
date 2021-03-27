// Linear,Exponential,Logarithmic,Polynomial,Power,Moving Average

export enum TrendlineType {
  None = "None",
  Linear = "Linear",
  Exponential = "Exponential",
  Logarithmic = "Logarithmic",
  Polynomial = "Polynomial",
  Power = "Power",
  MovingAverage = "MovingAverage"
}

export namespace TrendlineType {
  export function getDisplayValue(trendlineType: TrendlineType): string {
    switch (trendlineType) {
      case TrendlineType.None:
        return "None";
      case TrendlineType.Linear:
        return "Linear";
      case TrendlineType.Exponential:
        return "Exponential";
      case TrendlineType.Logarithmic:
        return "Logarithmic";
      case TrendlineType.Polynomial:
        return "Polynomial";
      case TrendlineType.Power:
        return "Power";
      case TrendlineType.MovingAverage:
        return "Moving average";
    }
  }

  export function getTrendlineTypeSelectOptions(): {
    value: TrendlineType;
    displayValue: string;
  }[] {
    return [
      {
        value: TrendlineType.None,
        displayValue: TrendlineType.getDisplayValue(TrendlineType.None)
      },
      {
        value: TrendlineType.Linear,
        displayValue: TrendlineType.getDisplayValue(TrendlineType.Linear)
      },
      {
        value: TrendlineType.Exponential,
        displayValue: TrendlineType.getDisplayValue(TrendlineType.Exponential)
      },
      {
        value: TrendlineType.Logarithmic,
        displayValue: TrendlineType.getDisplayValue(TrendlineType.Logarithmic)
      },
      {
        value: TrendlineType.Polynomial,
        displayValue: TrendlineType.getDisplayValue(TrendlineType.Polynomial)
      },
      {
        value: TrendlineType.Power,
        displayValue: TrendlineType.getDisplayValue(TrendlineType.Power)
      },
      {
        value: TrendlineType.MovingAverage,
        displayValue: TrendlineType.getDisplayValue(TrendlineType.MovingAverage)
      }
    ];
  }
}

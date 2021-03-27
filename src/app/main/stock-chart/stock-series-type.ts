export enum SeriesType {
  Line = "Line",
  Spline = "Spline",
  Hilo = "Hilo",
  HiloOpenClose = "HiloOpenClose",
  HollowCandle = "HollowCandle",
  Candle = "Candle"
}

export namespace SeriesType {
  export function getDisplayValue(seriesType: SeriesType): string {
    switch (seriesType) {
      case SeriesType.Line:
        return "Line";
      case SeriesType.Spline:
        return "Spline";
      case SeriesType.Hilo:
        return "Hilo";
      case SeriesType.HiloOpenClose:
        return "Hilo open close";
      case SeriesType.HollowCandle:
        return "Hollow candle";
      case SeriesType.Candle:
        return "Candle";
    }
  }

  export function getSeriesTypeSelectOptions(): {
    value: SeriesType;
    displayValue: string;
  }[] {
    return [
      {
        value: SeriesType.Line,
        displayValue: SeriesType.getDisplayValue(SeriesType.Line)
      },
      {
        value: SeriesType.Spline,
        displayValue: SeriesType.getDisplayValue(SeriesType.Spline)
      },
      {
        value: SeriesType.Hilo,
        displayValue: SeriesType.getDisplayValue(SeriesType.Hilo)
      },
      {
        value: SeriesType.HiloOpenClose,
        displayValue: SeriesType.getDisplayValue(SeriesType.HiloOpenClose)
      },
      {
        value: SeriesType.Candle,
        displayValue: SeriesType.getDisplayValue(SeriesType.HollowCandle)
      },
      {
        value: SeriesType.Candle,
        displayValue: SeriesType.getDisplayValue(SeriesType.Candle)
      }
    ];
  }
}

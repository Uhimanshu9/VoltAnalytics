export interface VoltageData {
  timestamps: string[];
  Voltages: number[];
  ma5: (number | null)[];
  peaks: Array<{
    Timestamp: string;
    Voltages: number;
  }>;
  lows: Array<{
    Timestamp: string;
    Voltages: number;
  }>;
  below20: Array<{
    Timestamp: string;
    Voltages: number;
  }>;
  downward_accel: Array<{
    Timestamp: string;
    Voltages: number;
    Slope: number;
    Acceleration: number;
  }>;
}

export interface ApiResponse {
  data: VoltageData | null;
  loading: boolean;
  error: string | null;
}
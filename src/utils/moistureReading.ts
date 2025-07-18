import { MoistureLevel } from "./moistureLevel";

export function mapMoistureReading(reading: number): MoistureLevel {
  if (reading >= 3900) return MoistureLevel.Dry;
  if (reading >= 3000 && reading < 3900) return MoistureLevel.Moist;
  return MoistureLevel.Wet;
}


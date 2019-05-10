import {Stop} from './stop';

export class StopTime {
  arrivalTime: Date;
  departureTime: Date;
  currentStop: Stop;
  nextStop: Stop;
  tripStart: Stop;
  tripEnd: Stop;

  constructor(data: Partial<StopTime>) {
    Object.assign(this, data);
  }
}

import {Stop} from './stop';
import {Route} from './route';

export class StopTime {
  route: Route;
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

import {TransportType} from './transport-type';
import {Stop} from './stop';

export class RouteSearch {
  longName: string;
  shortName: string;
  wheelchair: boolean;
  fromTime: Date;
  toTime: Date;
  types: TransportType[];
  stops: Stop[];
  occasional: boolean;

  constructor(data: Partial<RouteSearch>) {
    Object.assign(this, data);
  }
}

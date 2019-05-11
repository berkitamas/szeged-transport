import {TransportType} from './transport-type';
import {Agency} from './agency';
import {Stop} from './stop';

export class Route {
  id: number;
  shortName: string;
  longName: string;
  type: TransportType;
  description: string;
  occasional: boolean;
  agency: Agency;
  stopsFrom: Stop[];
  stopsTo: Stop[];

  constructor(data: Partial<Route>) {
    Object.assign(this, data);
  }
}

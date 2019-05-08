import {TransportType} from './transport-type';
import {Agency} from './agency';

export class Route {
  id: number;
  shortName: string;
  longName: string;
  type: TransportType;
  description: string;
  occasional: boolean;
  agency: Agency;

  constructor(data: Partial<Route>) {
    Object.assign(this, data);
  }
}

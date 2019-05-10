import {Route} from './route';

export class Stop {
  id: number;
  name: string;
  lat: string;
  lon: string;
  routes: Route[];

  constructor(data: Partial<Stop>) {
    Object.assign(this, data);
  }
}

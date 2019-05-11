import {Route} from './route';

export class StopSearch {
  name: string;
  routes: Route[];


  constructor(data: Partial<StopSearch>) {
    Object.assign(this, data);
  }
}

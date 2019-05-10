export class Stop {
  id: number;
  name: string;
  lat: string;
  lon: string;

  constructor(data: Partial<Stop>) {
    Object.assign(this, data);
  }
}

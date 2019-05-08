export class Agency {
  id: number;
  name: string;
  url: string;
  timezone: string;
  phone: string;
  lang: string;

  constructor(data: Partial<Agency>) {
    Object.assign(this, data);
  }
}

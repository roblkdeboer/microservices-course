// Check the type definiton file is included, look out for error
// Ctrl + click after definition file is installed to see documentation
import faker from 'faker';
import { Mappable } from './CustomMap';

// A user we create satisfies the conditions in the mappable interface
export class User implements Mappable {
  name: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }

  markerContent(): string {
    return `User Name: ${this.name}`;
  }
}

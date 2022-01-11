/// <reference types="@types/google.maps" />
import { User } from './User';
import { Company } from './Company';
import { CustomMap } from './CustomMap';

const user = new User();
const company = new Company();
// Input is the div ID where the map needs to go
const customMap = new CustomMap('map');

customMap.addMarker(user);
customMap.addMarker(company);

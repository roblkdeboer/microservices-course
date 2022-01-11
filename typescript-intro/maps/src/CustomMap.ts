// Instructions to every other class on how they can be an arguement to addMarker
// Both user and company both have this
export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
}

export class CustomMap {
  // Instance of class google maps map
  //   Private = cannot access map outside of the class
  private googleMap: google.maps.Map;

  //   When new instance of the custom map object is run, a map is generated
  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0,
      },
    });
  }

  //   Can take in any argument so long as it satisfies the interface (e.g. has position.lat and position.lng)
  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lat,
      },
    });

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent(),
      });

      // The map and marker to show this on
      infoWindow.open(this.googleMap, marker);
    });
  }
}

// Protected means the method can be accessed in child classes too
class Vehicle {
  // Defined within a class and is executed when a new instance of a class is created
  // Can use public/private/protected on properties/fields in the class too
  constructor(public color: string) {}

  protected honk(): void {
    console.log('Beep Beep');
  }
}
const vehicle = new Vehicle('red');
console.log(vehicle.color);

// Only  methods inside vehicle can call drive because of private
class Car extends Vehicle {
  constructor(public wheels: number, color: string) {
    // Must call the parent constructor
    super(color);
  }
  private drive(): void {
    console.log('Vroom');
  }

  startDrivingProcess(): void {
    this.drive();
    this.honk();
  }
}
// Takes in wheels and color
const car = new Car(4, 'red');

car.startDrivingProcess();

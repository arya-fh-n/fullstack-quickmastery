class Car {
  private brand?: string;
  private model: string;
  private year: number;

  constructor(model: string, year: number, brand?: string) {
    this.model = model;
    this.year = year;
    this.brand = brand;
  }

  public getBrand(): string {
    return this.brand ?? "";
  }

  public getModel(): string {
    return this.model;
  }

  public getYear(): number {
    return this.year;
  }

  public setBrand(brand: string): void {
    this.brand = brand;
  }

  public setModel(model: string): void {
    this.model = model;
  }

  public setYear(year: number): void {
    this.year = year;
  }

  public displayInfo(): void {
    console.log(`Brand: ${this.brand ?? ""}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
  }

  public getInfo(): CarModel {
    return {
      model: this.model,
      year: this.year,
      brand: this.brand ?? "",
    };
  }
}

type SystemMessage =
  | {
      role: string;
      content: string;
    }
  | {
      role: string;
      content: string;
      name: string;
    };

interface CarModel {
  model: string;
  year: number;
  brand?: string;
}

let car = new Car("Toyota", 2022);
let carInfo = car.getInfo();
console.log("Car Info: " + JSON.stringify(carInfo));
car.displayInfo();

function identity<Type>(arg: Type): Type {
    console.log(arg);
    return arg;
}

identity<string>("myString");
identity<number>(42);

interface MetaData {
    name: string;
    description: string;
    sex: 0 | 1;
}

let metadata : MetaData = {
    name: "John Doe",
    description: "A description",
    sex: 0
}
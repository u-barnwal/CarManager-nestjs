import { HttpException, Injectable } from '@nestjs/common';
import { Car } from './car.dto';
import { CARS } from './cars.mock';

@Injectable()
export class CarService {
  private cars = CARS;

  public getCars() {
    return this.cars;
  }

  public postCar(car: Car) {
    return this.cars.push(car);
  }

  public getCar(id: number): Promise<any> {
    const carId = Number(id);

    return new Promise((resolve) => {
      const car = this.cars.find((car) => car.id === carId);

      if (!car) throw new HttpException('Car Not Found', 404);

      return resolve(car);
    });
  }

  public deleteCar(id: number): Promise<any> {
    const carId = Number(id);

    return new Promise((resolve) => {
      const index = this.cars.findIndex((car) => car.id === carId);

      if (index === -1) throw new HttpException('Car Not Found', 404);

      this.cars.splice(index, 1);

      return resolve(this.cars);
    });
  }

  public putCar(id: number, key: string, value: string): Promise<any> {
    const carId = Number(id);

    return new Promise((resolve) => {
      const index = this.cars.findIndex((car) => car.id === carId);

      if (index === -1) throw new HttpException('Car Not Found', 404);

      this.cars[index][key] = value;

      return resolve(this.cars[index]);
    });
  }
}

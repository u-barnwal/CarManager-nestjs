import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car, CarDocument } from './schemas/car.schema';

@Injectable()
export class CarService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

  public async getCars(): Promise<Car[]> {
    const cars = await this.carModel.find().exec();

    if (!cars || !cars[0]) throw new HttpException('Not Found', 404);

    return cars;
  }

  public async postCar(car: Car) {
    const newCar = await new this.carModel(car);

    return newCar.save();
  }

  public async getCar(id: number): Promise<Car> {
    const car = await this.carModel.findOne({ id }).exec();

    if (!car) throw new HttpException('Not Found', 404);

    return car;
  }

  public async deleteCar(id: number): Promise<any> {
    const car = await this.carModel.deleteOne({ id }).exec();

    if (car.deletedCount === 0) throw new HttpException('Not Found', 404);

    return car;
  }

  public async putCar(id: number, key: string, value: string): Promise<Car> {
    const car = await this.carModel
      .findOneAndUpdate({ id }, { [key]: value })
      .exec();

    if (!car) throw new HttpException('Not Found', 404);

    return car;
  }
}

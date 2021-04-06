import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Car } from './car.dto';
import { CarService } from './car.service';

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Get()
  public getCars() {
    return this.carService.getCars();
  }

  @Post()
  public postCar(@Body() car: Car) {
    return this.carService.postCar(car);
  }

  @Get(':id')
  public async getCar(@Param('id') id: number) {
    return this.carService.getCar(id);
  }

  @Delete(':id')
  public async deleteCar(@Param('id') id: number) {
    return this.carService.deleteCar(id);
  }

  @Put(':id')
  public async putCar(@Param('id') id: number, @Query() query) {
    return this.carService.putCar(id, query.key, query.value);
  }
}

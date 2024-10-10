import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GpsService } from "./gps.service";
import { GpsController } from "./gps.controller";
import { GpsPosition } from "../database/gps-position.entity";

@Module({
  imports: [TypeOrmModule.forFeature([GpsPosition])],
  providers: [GpsService],
  controllers: [GpsController],
  exports: [GpsService],
})
export class GpsModule {}

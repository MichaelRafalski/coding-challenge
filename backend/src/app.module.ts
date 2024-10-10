import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { GpsModule } from "./gps/gps.module"; // Import GpsModule
import { GpsCronService } from "./cron/gps-cron.service";
import { GpsPosition } from "./database/gps-position.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "database.sqlite",
      entities: [GpsPosition], // Register entities
      synchronize: true,
    }),
    GpsModule,
  ],
  providers: [GpsCronService],
})
export class AppModule {}

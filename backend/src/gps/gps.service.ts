import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GpsPosition } from "../database/gps-position.entity";

@Injectable()
export class GpsService {
  constructor(
    @InjectRepository(GpsPosition)
    private readonly gpsPositionRepository: Repository<GpsPosition>,
  ) {}

  // Fetch all GPS positions
  async getAllGpsPositions(): Promise<GpsPosition[]> {
    return this.gpsPositionRepository.find();
  }

  // Fetch GPS positions by session ID
  async getGpsPositionsById(sessionId: string): Promise<GpsPosition[] | null> {
    return this.gpsPositionRepository.find({ where: { sessionId } });
  }

  // Save GPS position
  async saveGpsPosition(gpsPosition: GpsPosition): Promise<GpsPosition> {
    return this.gpsPositionRepository.save(gpsPosition);
  }
}

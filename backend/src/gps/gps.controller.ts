import { Controller, Get, Param, NotFoundException } from "@nestjs/common";
import { GpsService } from "./gps.service";
import { GpsPosition } from "../database/gps-position.entity";

@Controller("gps-position")
export class GpsController {
  constructor(private readonly gpsService: GpsService) {}

  // GET /api/gps-positions- Fetch all GPS positions
  @Get()
  async getAllGpsPositions(): Promise<GpsPosition[]> {
    return await this.gpsService.getAllGpsPositions();
  }

  // GET /api/gps-positions/:sessionId - Fetch specific GPS positions by session ID
  @Get(":sessionId")
  async getGpsPositionsById(
    @Param("sessionId") sessionId: string,
  ): Promise<GpsPosition[]> {
    const positions = await this.gpsService.getGpsPositionsById(sessionId);

    if (!positions) {
      throw new NotFoundException(
        `GPS positions with Session ID ${sessionId} not found`,
      );
    }

    return positions;
  }
}

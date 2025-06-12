import { Controller, Get, Param, NotFoundException } from "@nestjs/common";
import { GpsService } from "./gps.service";
import { GpsPosition } from "../database/gps-position.entity";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags('gps')
@Controller("gps-position")
export class GpsController {
  constructor(private readonly gpsService: GpsService) {}

  @ApiOperation({ summary: 'Get all GPS positions' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns all GPS positions',
    type: [GpsPosition]
  })
  @Get()
  async getAllGpsPositions(): Promise<GpsPosition[]> {
    return await this.gpsService.getAllGpsPositions();
  }

  @ApiOperation({ summary: 'Get GPS positions by session ID' })
  @ApiParam({ 
    name: 'sessionId', 
    description: 'The session ID to filter GPS positions',
    type: String 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns GPS positions for the specified session',
    type: [GpsPosition]
  })
  @ApiResponse({ 
    status: 404, 
    description: 'GPS positions not found for the specified session ID' 
  })
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

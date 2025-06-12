import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity("gps_positions")
export class GpsPosition {
  @ApiProperty({ description: 'The unique identifier of the GPS position' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ description: 'The latitude coordinate of the GPS position' })
  @Column("float")
  latitude!: number;

  @ApiProperty({ description: 'The longitude coordinate of the GPS position' })
  @Column("float")
  longitude!: number;

  @ApiProperty({ description: 'The timestamp when the GPS position was recorded' })
  @Column("datetime")
  timestamp!: Date;

  @ApiProperty({ description: 'The session identifier for grouping GPS positions' })
  @Column("text")
  sessionId!: string;
}

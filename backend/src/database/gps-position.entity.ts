import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("gps_positions")
export class GpsPosition {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("float")
  latitude!: number;

  @Column("float")
  longitude!: number;

  @Column("datetime")
  timestamp!: Date;

  @Column("text")
  sessionId!: string;
}

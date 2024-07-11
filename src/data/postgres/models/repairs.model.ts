import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Users } from "./user.model";

enum Status {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

@Entity()
export class Repairs extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: "date",
  })
  date: Date;

  @Column({
    type: "varchar",
    nullable: false,
    length: 50,
    unique: true,
  })
  motorsNumber: string;

  @Column({
    type: "varchar",
    nullable: false,
    length: 200,
  })
  description: string;

  @Column({
    type: "enum",
    nullable: false,
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  // @Column({
  //   nullable: false,
  //   type: "int",
  // })
  // user_id: number;
  @ManyToOne(() => Users, (user) => user.repairs)
  user: Users;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}

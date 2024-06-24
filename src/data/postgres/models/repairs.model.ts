import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

enum Status {
    
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
    
}

@Entity()
export class Repairs extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        
        nullable: false,
        type: 'date',
    })
    date: Date;

    @Column({
        type: 'enum',
        nullable: false,
        enum: Status,
        default: Status.PENDING
    })
    status: Status;

    @Column({
        nullable: false,
        type: "int"
    })
    user_id: number;
    
    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}
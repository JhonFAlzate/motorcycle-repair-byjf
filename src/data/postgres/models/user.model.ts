import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

enum Role {
   
    CLIENT = 'CLIENT',
    EMPLOYEE = 'EMPLOYEE'
}

enum Status {
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED'
}

@Entity()
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({  
        type: 'varchar',
        nullable: false,
        length: 120
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 120
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 120
    })
    password: string;

    @Column({
        type: "enum",
        nullable: false,
        enum: Role,
        default: Role.CLIENT
    })
    role: string | Role;

    @Column({
        type: "enum",
        nullable: false,
        enum: Status,
        default: Status.ACTIVE
    })
    status: Status;
    
    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}
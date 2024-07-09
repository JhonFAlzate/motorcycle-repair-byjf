import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { bcryptAdapter } from "../../../config";

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
        length: 120,
        unique: true
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
        type: 'boolean',
        default: false
    })
    emailValidated: boolean;

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

    // @BeforeInsert()  // +Esta es Otra forma de encriptar el password  
    // encryptPassword(){
    //  this.password = bcryptAdapter.hash(this.password)
    // }
    
}
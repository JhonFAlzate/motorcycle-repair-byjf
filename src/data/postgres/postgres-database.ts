//El objetivo de éste archivo es hacer la conexion con nuestra base de datos
// de Postgres.

import { DataSource } from "typeorm";
import { Users } from "./models/user.model";
import { Repairs } from "./models/repairs.model";


interface Options {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}


export class PostgresDatabase {

    private datasource: DataSource;

    constructor( options: Options){

        this.datasource = new DataSource({

            type: 'postgres',
            host: options.host,
            port: options.port,
            username: options.username,
            password: options.password,
            database: options.database,
            entities: [Users, Repairs],
            

            synchronize: true,  // aquí se recomienda utilizar mejor migraciones, cuando se lanza a producción.

            // ssl: {
            //     rejectUnauthorized: false,
            // }

        })

    }

    async connect() {
        try{
            await this.datasource.initialize()
            console.log('Connected to database 😊👌')

        }catch(error) {
            console.log(error)

        }
    }
}
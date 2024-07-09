import express, {Router} from 'express'
import cors from 'cors'
import helmet from 'helmet';
import hpp from 'hpp';

interface Options {
    port: number;
    routes: Router;
}

export class Server {

    // private serverListener: any;

    public readonly app = express()
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {
        this.port = options.port;
        this.routes = options.routes;
    }

    async start(){
        
        this.app.use( express.json())
        this.app.use( express.urlencoded({extended: true}));
        this.app.use(cors())  // Esto es para evitar los problemas de cors, y se debe instalar npm i cors y luego el typescrip de cors
        
        this.app.use(this.routes)
        
        this.app.use(helmet());
        this.app.use(hpp());

        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port} 😎 👌`)
        })
    }
    
}
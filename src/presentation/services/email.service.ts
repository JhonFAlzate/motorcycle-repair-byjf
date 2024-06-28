import nodemailer, {Transporter} from 'nodemailer'
// import { Attachment } from 'nodemailer/lib/mailer';

export interface SendEmailOptions{
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment;

}

interface Attachment {
    fileName: string;
    path: string;
}

export class EmailService {

    private transporter : Transporter

    constructor(
        mailerService: string, // Recibo como parametro el servicio para enviar el email( gmail o houtlook)
        mailerEmail: string,   // El correo que usaremos para enviar el correo
        senderEmailPassword: string ,  // contraseña que tiene ese correo, para poder enviar.
        private readonly postToProvider: boolean
    ){
        this.transporter = nodemailer.createTransport({
            service: mailerService,  // aquí estamos enviandole el servicio que vamos a utilizar.
            auth: {
                user: mailerEmail,
                pass: senderEmailPassword
            }
        })
    }

    async sendEmail(options: SendEmailOptions) {
        const { to, subject, htmlBody, attachments = []} = options;

        if(!this.postToProvider) return true; // esta liena es para control interno, en caso de que no querramos enviar correos electronicos.

        try{
            await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            })
            return true;

        } catch (error){
            console.log(error);
            return false;

        }


    }


}
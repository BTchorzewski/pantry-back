import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { config } from '../config/config';
import 'dotenv/config';

interface UserForEmail {
  id: string;
  email: string;
}
type Template = (id: string) => string;

@Injectable()
export class EmailService {
  private transporter() {
    return createTransport({
      port: config.email.port,
      host: config.email.host,
      auth: {
        user: config.email.auth.user,
        pass: config.email.auth.password,
      },
    });
  }

  async registrationEmail({ email, id }: UserForEmail, template: Template) {
    this.transporter().sendMail({
      from: 'mailing@pantry.com',
      to: email,
      subject: 'registration email',
      html: template(id),
    });
  }

  registrationTemplate(id: string) {
    return `
    <div>
        <h1>Welcome to Pantry.</h1>
        <p>You are almost registered. To finish registration process,</p>
        <a href="#">Click me</a>
    </div>
    `;
  }
}

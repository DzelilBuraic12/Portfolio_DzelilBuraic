import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  isSending = false;
  isSent = false;
  isError = false;

  name = '';
  email = '';
  message = '';

  constructor() {
    emailjs.init('LljJ-NWiw3cpyTByv');
  }

  async sendEmail(e: Event) {
    e.preventDefault();
    this.isSending = true;
    this.isError = false;

    try {
      await emailjs.send(
        'service_zztc843',
        'template_9gdaxe5',
        {
          user_name: this.name,
          user_email: this.email,
          message: this.message,
        }
      );
      this.isSent = true;
    } catch (err) {
      console.log(err);
      this.isError = true;
    } finally {
      this.isSending = false;
    }
  }
}
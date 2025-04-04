import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  isMessageSent: boolean = false;

  onSubmit() {
    // Your logic for form submission
    // For demonstration purposes, let's assume the form is submitted successfully
    this.isMessageSent = true;
  }
}

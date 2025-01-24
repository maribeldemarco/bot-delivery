import { Component } from '@angular/core';
import { ChatbotComponent } from './chatbot/chatbot.component';

@Component({
  selector: 'app-root',
  standalone: true, // AppComponent también debe ser standalone
  imports: [ChatbotComponent], // Importamos directamente el ChatbotComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Mi Chatbot';
}

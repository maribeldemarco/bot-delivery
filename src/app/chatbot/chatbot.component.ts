import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class ChatbotComponent implements OnInit {
  mensajes: { texto: string, remitente: string }[] = [];
  mensajeUsuario: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.enviarMensajeBienvenida();
  }

  enviarMensajeBienvenida(): void {
    this.http.post<{ respuesta: string }>('http://localhost:5000/api/chatbot', { mensaje: '' })
      .subscribe(response => {
        this.mensajes.push({ texto: response.respuesta || '', remitente: 'bot' });
      });
  }

  enviarMensaje(): void {
    if (!this.mensajeUsuario.trim()) return;

    this.mensajes.push({ texto: this.mensajeUsuario, remitente: 'usuario' });

    this.http.post<{ respuesta: string }>('http://localhost:5000/api/chatbot', { mensaje: this.mensajeUsuario })
      .subscribe(response => {
        this.mensajes.push({ texto: response.respuesta || '', remitente: 'bot' });
      });

    this.mensajeUsuario = '';
  }
}

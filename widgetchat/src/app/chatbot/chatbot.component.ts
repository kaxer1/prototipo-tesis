import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent } from '../presentacion/components';
import { Message } from '../interfaces';
import { OpenAiService } from 'app/presentacion/services/openai.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MyMessageComponent,
    ChatMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    ButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatbotComponent implements OnInit {

  public mostrarChat: boolean = false;

  changeButton() {
    this.mostrarChat = !this.mostrarChat;
  }

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  public threadId = signal<string|undefined>(undefined);

  ngOnInit(): void {
    this.openAiService.createThread()
      .subscribe( id => {
          this.threadId.set( id );
      });

  }


  handleMessage(question: string) {

    this.isLoading.set(true);
    this.messages.update( prev => [...prev, { text: question, isGpt: false }] );

    this.openAiService.postQuestion( this.threadId()!, question )
      .subscribe( replies => {

        this.isLoading.set(false);

        for (const reply of replies) {
          for (const message of reply.content ) {

            this.messages.update( prev => [
              ...prev,
              {
                text: message,
                isGpt: reply.role === 'assistant'
              }
            ]);

          }
        }



      })

  }
}

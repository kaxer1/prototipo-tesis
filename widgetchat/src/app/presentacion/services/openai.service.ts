import { Injectable } from '@angular/core';
import {
  createThreadUseCase,
  listMsgAnterioresUseCase,
  postQuestionUseCase,
} from '@use-cases/index';
import { Observable, from, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenAiService {

  createThread(): Observable<string> {
    if (localStorage.getItem('thread')) {
      return of(localStorage.getItem('thread')!);
    }

    return from(createThreadUseCase()).pipe(
      tap((thread) => {
        localStorage.setItem('thread', thread);
      })
    );
  }

  postQuestion(threadId: string, question: string) {
    return from(postQuestionUseCase(threadId, question));
  }

  getListaMsgAnteriores(threadId: string) {
    return from(listMsgAnterioresUseCase(threadId));
  }
}

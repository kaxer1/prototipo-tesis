import { QuestionResponse } from '@interfaces/question.response';
import { environment } from 'environments/environment';

export const listMsgAnterioresUseCase = async ( threadId: string ) => {


  try {
    const resp = await fetch(`${environment.base_url_api}/list-messages-before/${threadId}`, {
      method: 'GET',
      headers: {
        'Content-Type':'application/json'
      },
    });

    const replies = await resp.json() as QuestionResponse[];
    console.log({replies});

    return replies;


  } catch (error) {
    throw new Error('Error creating thread ID');
  }
};

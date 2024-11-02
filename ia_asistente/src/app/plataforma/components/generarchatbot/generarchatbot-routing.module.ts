import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GenerarChatbotComponent } from './generarchatbot.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: GenerarChatbotComponent },
    ])],
    exports: [RouterModule]
})
export class GenerarChatbotRoutingModule { }

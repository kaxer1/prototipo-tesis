import { NgModule } from '@angular/core';
import { GenerarChatbotRoutingModule } from './generarchatbot-routing.module';
import { GenerarChatbotComponent } from './generarchatbot.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        GenerarChatbotRoutingModule,
        SharedModule,
    ],
    declarations: [GenerarChatbotComponent]
})
export class GenerarChatbotModule { }

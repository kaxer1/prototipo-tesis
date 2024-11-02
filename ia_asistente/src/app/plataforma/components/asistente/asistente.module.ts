import { NgModule } from '@angular/core';
import { AsistenteRoutingModule } from './asistente-routing.module';
import { AsistenteComponent } from './asistente.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        AsistenteRoutingModule,
        SharedModule,
    ],
    declarations: [AsistenteComponent]
})
export class AsistenteModule { }

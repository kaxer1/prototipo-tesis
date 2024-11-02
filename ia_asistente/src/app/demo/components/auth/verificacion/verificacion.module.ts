import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificacionRoutingModule } from './verificacion-routing.module';
import { VerificacionComponent } from './verificacion.component';
import { SharedModule } from 'src/app/plataforma/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        VerificacionRoutingModule,
        SharedModule
    ],
    declarations: [VerificacionComponent]
})
export class VerificacionModule { }

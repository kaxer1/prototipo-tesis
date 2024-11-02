import { NgModule } from '@angular/core';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        PerfilRoutingModule,
        SharedModule,
    ],
    declarations: [PerfilComponent]
})
export class PerfilModule { }

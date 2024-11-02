import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CambioPasswordRoutingModule } from './cambiopassword-routing.module';
import { CambioPasswordComponent } from './cambiopassword.component';
import { SharedModule } from 'src/app/plataforma/shared/shared.module';
import { PasswordModule } from 'primeng/password';

@NgModule({
    imports: [
        CommonModule,
        CambioPasswordRoutingModule,
        SharedModule,
        PasswordModule
    ],
    declarations: [CambioPasswordComponent]
})
export class CambioPasswordModule { }

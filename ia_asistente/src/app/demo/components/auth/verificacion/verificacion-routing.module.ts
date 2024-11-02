import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VerificacionComponent } from './verificacion.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: VerificacionComponent }
    ])],
    exports: [RouterModule]
})
export class VerificacionRoutingModule { }

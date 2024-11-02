import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsistenteComponent } from './asistente.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AsistenteComponent },
    ])],
    exports: [RouterModule]
})
export class AsistenteRoutingModule { }

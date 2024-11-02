import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CambioPasswordComponent } from './cambiopassword.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CambioPasswordComponent }
    ])],
    exports: [RouterModule]
})
export class CambioPasswordRoutingModule { }

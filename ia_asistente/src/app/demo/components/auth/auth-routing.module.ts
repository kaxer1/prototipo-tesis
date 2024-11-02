import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'cambiopassword', loadChildren: () => import('./cambiopassword/cambiopassword.module').then(m => m.CambioPasswordModule) },
        { path: 'verificacion', loadChildren: () => import('./verificacion/verificacion.module').then(m => m.VerificacionModule) },
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: 'registrar', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }

import { NgModule } from '@angular/core';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';

// GUARDS
import { AuthGuard } from './plataforma/guards/auth.guard';

// Services plataforma
import { LoginService } from './plataforma/service/login/login.service';
import { DataCentralService } from './plataforma/service/data-central.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptorService } from './plataforma/service/http-error-interceptor.service';
import { TokenInterceptorService } from './plataforma/service/login/token-interceptor.service';
import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        MessageService,

        AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
        LoginService,
        DataCentralService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

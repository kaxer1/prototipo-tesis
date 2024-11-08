import { NgModule } from '@angular/core';
import { PathLocationStrategy, LocationStrategy, CommonModule } from '@angular/common';
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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptorService } from './plataforma/service/http-error-interceptor.service';
import { TokenInterceptorService } from './plataforma/service/login/token-interceptor.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EndpointsService } from './plataforma/service/api/endpoints.service';
import { PrimeBasicoModule } from './plataforma/shared/primengbasico.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AppConfigModule } from './layout/config/config.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AccordionModule } from 'primeng/accordion';
import { ChartModule } from 'primeng/chart';
import { TimelineModule } from 'primeng/timeline';
import { ProgressBarModule } from 'primeng/progressbar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { StyleClassModule } from 'primeng/styleclass';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppLayoutModule, PrimeBasicoModule,
        CommonModule,
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FullCalendarModule,
        AccordionModule,
        ChartModule,
        TimelineModule,
        ProgressBarModule,
        OverlayPanelModule,
        ConfirmDialogModule,
        StyleClassModule,
        AppConfigModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
        
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        ConfirmationService,
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        MessageService,

        AuthGuard,
        LoginService,
        DataCentralService,
        EndpointsService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

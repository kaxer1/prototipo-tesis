import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LoadingService } from './plataforma/service/loading.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    isLoading = this.loadingService.isLoading$;

    constructor(private primengConfig: PrimeNGConfig, private loadingService: LoadingService) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}

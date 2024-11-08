import { NgModule } from '@angular/core';
import { AccionesTablaComponent } from './accionestabla.component';
import { PrimeBasicoModule } from './primengbasico.module';

@NgModule({
	declarations: [AccionesTablaComponent],
	imports: [PrimeBasicoModule],
	exports: [
		PrimeBasicoModule,
		AccionesTablaComponent
	],
})
export class SharedModule { }

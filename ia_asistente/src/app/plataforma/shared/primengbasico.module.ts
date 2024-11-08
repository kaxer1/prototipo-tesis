import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MessagesModule } from 'primeng/messages';
import { FieldsetModule } from 'primeng/fieldset';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { StepsModule } from 'primeng/steps';
import { MenuModule } from 'primeng/menu';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { AutoFocusModule } from 'primeng/autofocus';
import { DividerModule } from 'primeng/divider';

@NgModule({
	imports: [CommonModule, FormsModule, ToastModule],
	exports: [BreadcrumbModule, CommonModule, FormsModule, InputTextModule, InputTextareaModule, ButtonModule, MessagesModule, InputMaskModule, TableModule, DialogModule,
        FieldsetModule, DropdownModule, CheckboxModule, RadioButtonModule, TabViewModule, CalendarModule, TooltipModule, StepsModule,
        SidebarModule, SelectButtonModule, InputSwitchModule, InputNumberModule, MultiSelectModule, MenuModule, ChipsModule,
        ToastModule, TriStateCheckboxModule, FileUploadModule, AutoFocusModule, DividerModule, CascadeSelectModule, AutoCompleteModule
    ]
})
export class PrimeBasicoModule { }

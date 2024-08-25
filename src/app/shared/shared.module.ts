import { Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppMsgService } from './services/app-msg.service';
import { DefaultService } from './services/default.service';
import { ToastrService } from 'ngx-toastr';

//Google Map
import { GoogleMapsModule } from '@angular/google-maps';

// Third party module-PrimeNG
//Potentially SSR-Incompatible Modules
import { TableModule } from "primeng/table";
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule} from 'primeng/carousel';
 
import { SliderModule } from 'primeng/slider';
import { ProgressSpinnerModule} from 'primeng/progressspinner';
//import { EditorModule } from 'primeng/editor';

//Possibly SSR-Compatible (With Caution)
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TreeModule } from 'primeng/tree';
import { FileUploadModule } from 'primeng/fileupload';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuModule } from 'primeng/menu';
import { ListboxModule } from 'primeng/listbox';
import { PasswordModule } from 'primeng/password';
import { TabViewModule } from 'primeng/tabview';
import { ColorPickerModule} from 'primeng/colorpicker';
import { AccordionModule } from 'primeng/accordion';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BreadcrumbModule as PrimeNGBreadcrumbModule } from 'primeng/breadcrumb';

//Directive
import { NiEditTextDirective } from './directives/ni-edit-text.directive';
import { NiLoadImageDirective } from './directives/ni-load-image.directive';
import { NiFileDownloadDirective } from './directives/ni-file-download.directive';
import { AddChangeDirective } from './directives/add-change.directive';
import { ValidatorDirective } from './directives/validator.directive';
import { DdPropertyBindingDirective } from './directives/dd-property-binding.directive';
import { ValidationMessageDirective } from './directives/validation-message.directive';
import { NiGridDirective } from './directives/ni-grid.directive';
import { NiDbclickPreventDirective } from './directives/ni-dbclick-prevent.directive';
import { NiIntegerDirective } from './directives/ni-integer.directive';
import { NiDecimalDirective } from './directives/ni-decimal.directive';
import { NiSelectDirective } from './directives/ni-select.directive';
import { NiSelectedTextDirective } from './directives/ni-selected-text.directive';
import { AddValidatorsDirective } from './directives/add-validators.directive';
import { NativeElementInjectorDirective } from './directives/native-element-injector.directive';
import { OskInputDirective } from './directives/osk-input.directive'; 
import { KeyboardKeyDirective } from './directives/keyboard-key.directive'; 
import { NumOskInputDirective } from './directives/num-osk-input.directive'; 
import { NumericKeyboardKeyDirective } from './directives/numeric-keyboard-key.directive'; 
import { SelectSingleItemDirective } from './directives/selected-single-item.directive';
import { NiHideCutCopyPasteToasterDirective } from './directives/ni-hideCutCopyPasteToaster.directive';

//Pipe
import { ArrayFilterPipe } from './pipes/array-filter.pipe';
import { NiBooleanPipe } from './pipes/ni-boolean.pipe';
import { NiSafeHtml } from './pipes/ni-safe-html.pipe';
import { NiSafeStyle } from './pipes/ni-safe-style.pipe';

//import { AgmCoreModule } from '@agm/core';

//Services
import { KeyboardService } from './services/keyboard.service'; 
import { NumericKeyboardService } from './services/numeric-keyboard.service';



//Components
import { NiTableModule } from './components/table/table';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { NiFileSingleViewComponent } from './components/ni-file-single-view.component';
import { NiFileSingleUploadComponent } from './components/ni-file-single-upload.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { NiMultipleFileViewComponent } from './components/ni-multiple-file-view/ni-multiple-file-view.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { BaseComponent } from './components/base/base.component';
import { NiTableComponent } from './components/ni-table/ni-table.component';
import { MultiSelectModule } from './components/multiselect/multiselect';
import { AutoCompleteModule } from './components/autocomplete/autocomplete';
import { AddressPickerComponent } from './components/address-picker/address-picker.component';
import { CustomRowToggler } from '../shared/components/ni-table/ni-table.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component'; 
import { NumericKeyboardComponent } from './components/numeric-keyboard/numeric-keyboard.component'; 
import { SpinnerComponent } from './components/spinner/spinner.component';
import { OfflineComponent } from './components/offline/offline.component';

import { ConfirmOTPComponent,NiWebcamComponent } from './index';
@NgModule({
  declarations: [

    //ALL Directive

    NiEditTextDirective,    
    ValidatorDirective,
    AddChangeDirective,
    NiLoadImageDirective,
    NiFileDownloadDirective,
    DdPropertyBindingDirective,
    ValidationMessageDirective,
    NativeElementInjectorDirective,
    NiGridDirective,  
    NiDbclickPreventDirective,
    NiIntegerDirective,
    NiDecimalDirective,
    NiSelectDirective,
    NiSelectedTextDirective,
    AddValidatorsDirective,  
    OskInputDirective, 
    KeyboardKeyDirective,
    NumOskInputDirective,
    NumericKeyboardKeyDirective,
    SelectSingleItemDirective,
    NiHideCutCopyPasteToasterDirective,

    //ALL Pipe
    ArrayFilterPipe,
    NiBooleanPipe,
    NiSafeHtml,
    NiSafeStyle, 

    //All Component
    SideNavComponent,
    FileUploadComponent,
    ImageGalleryComponent,
    NiFileSingleUploadComponent,
    NiFileSingleViewComponent,
    NiWebcamComponent,
    NiMultipleFileViewComponent,       
    ConfirmModalComponent,    
    BaseComponent,
    NiTableComponent,        
    AddressPickerComponent,
    ConfirmOTPComponent,
    CustomRowToggler,
    KeyboardComponent,    
    NumericKeyboardComponent,    
    SpinnerComponent,    
    OfflineComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,    
    PanelModule,
    DialogModule,
    DropdownModule,
    MultiSelectModule,
    SliderModule,
    TableModule,
    NiTableModule,
    PaginatorModule,
    CalendarModule,
    ButtonModule,
    DynamicDialogModule,
    InputTextModule,
    InputTextareaModule,
    FileUploadModule,
    SidebarModule,
    TreeModule,
    PanelMenuModule,
    GalleriaModule,
    InputSwitchModule,
    AutoCompleteModule,
    //EditorModule,
    PrimeNGBreadcrumbModule,
    MenuModule,
    ListboxModule,
    PasswordModule,
    TabViewModule,
    ColorPickerModule,
    CarouselModule,
    ProgressSpinnerModule,
    GoogleMapsModule,
    AccordionModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    MultiSelectModule,
    SliderModule,
    TableModule,
    NiTableModule,
    PaginatorModule,
    CalendarModule,
    AutoCompleteModule,
    ButtonModule,
    DynamicDialogModule,
    InputTextModule,
    InputTextareaModule,
    
    
    FileUploadModule,
    SidebarModule,
    PanelMenuModule,
    GalleriaModule,
    SideNavComponent,
    
    FileUploadComponent,
    ImageGalleryComponent,
    
    NiFileSingleUploadComponent,
    NiFileSingleViewComponent,
    NiWebcamComponent,
    NiMultipleFileViewComponent,
    
    
    TreeModule,
    
    BaseComponent,
    NiTableComponent,
    
    InputSwitchModule,
    PrimeNGBreadcrumbModule,
    MenuModule,
    AddressPickerComponent,
    ListboxModule,
    ConfirmOTPComponent,
    PasswordModule,
    TabViewModule,
    //EditorModule,
    ColorPickerModule,
    CustomRowToggler,
    CarouselModule,
    KeyboardComponent, 
    
    NumericKeyboardComponent,
    
    SpinnerComponent,
    
    OfflineComponent,
    GoogleMapsModule,
    AccordionModule,

    //All Pipe
    ArrayFilterPipe,
    NiBooleanPipe,
    NiSafeHtml,
    NiSafeStyle,

    //All Directive
    NiEditTextDirective,
    AddChangeDirective,
    ValidatorDirective,
    NiLoadImageDirective,
    NiFileDownloadDirective,
    DdPropertyBindingDirective,
    ValidationMessageDirective,
    NativeElementInjectorDirective,
    NiGridDirective,
    NiDbclickPreventDirective,
    NiIntegerDirective,
    NiDecimalDirective,
    NiSelectDirective,
    NiSelectedTextDirective,
    AddValidatorsDirective,
    OskInputDirective, 
    KeyboardKeyDirective,
    NumOskInputDirective,
    NumericKeyboardKeyDirective,
    SelectSingleItemDirective,
    NiHideCutCopyPasteToasterDirective,
  ],
  providers: [
    ToastrService, 
    DefaultService, 
    AppMsgService, 
    DialogService,
    KeyboardService,
    NumericKeyboardService,
    //Directive
    AddValidatorsDirective
  ],
})
export class SharedModule {
 }

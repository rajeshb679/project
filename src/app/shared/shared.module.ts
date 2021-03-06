import { NgModule } from '@angular/core';
import { DropDownDirectiveDirective } from './drop-down-directive.directive';
import { LoadingSpinnerComponent } from './LoadingSpinner/loading-spinner.component';
import { AlertComponent } from './alert.component';
import { PlaceHolderDirective } from './PlaceHolder/place-holder-directive.directive';
import { CommonModule } from '@angular/common';
import { LoggingService } from '../logging.service';

@NgModule({
    declarations: [DropDownDirectiveDirective, LoadingSpinnerComponent, AlertComponent, PlaceHolderDirective],
    imports: [CommonModule],
    exports: [DropDownDirectiveDirective, LoadingSpinnerComponent, AlertComponent, PlaceHolderDirective, CommonModule],
    entryComponents: [AlertComponent],
    providers: [LoggingService],
})
export class SharedModule {}

import { NgModule } from '@angular/core';

import { BfDateTimeValidator } from './directives/validator/bf-datetime.validator';

import  { UniquePipe } from './pipes/unique/unique.pipe';

@NgModule({
    declarations: [
        BfDateTimeValidator,
        UniquePipe
    ],
    exports: [
        BfDateTimeValidator,
        UniquePipe
    ]
})
export class BfSharedModule{}
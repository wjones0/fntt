import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Firemocksvc } from './firemock';
import { ActivatedRouteStub, RouterLinkStubDirective, RouterStub } from './routerstubs';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        RouterLinkStubDirective
    ],
    providers: [
        Firemocksvc,
        ActivatedRouteStub,
        RouterStub
    ],
    exports: [
    ]
})
export class TestingModule { }

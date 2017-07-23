import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokenizerGenericService } from './tokenizer-generic/tokenizer-generic.service';
import { TokenizerHdlService } from './tokenizer-hdl/tokenizer-hdl.service';
import { ParserHdlService } from './parser-hdl/parser-hdl.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    TokenizerGenericService,
    TokenizerHdlService,
    ParserHdlService,
  ]
})
export class CompilerModule { }
